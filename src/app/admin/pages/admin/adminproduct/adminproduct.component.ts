import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/core/services/product.services';
import { Product } from 'src/app/interface/product';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminproductComponent implements OnInit {
  formAddProduct!: FormGroup
  products: Product[] = [];
  cat: any[] = [];
  tableData: any[] = [];
  cols: any[] = [];
  uploadedFiles: any[] = [];
  visible: boolean = false;
  constructor(private pd: ProductService, private messageService: MessageService,
    private _fb: FormBuilder, private storage: AngularFireStorage, private confirmationService: ConfirmationService) {

  }
  ngOnInit(): void {
    this.getData();
    this.formAddProduct = this._fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required]],
      date: ['', Validators.required],
      feature: ['', Validators.required],
      idCategory: ['', Validators.required],
      kt: this._fb.group({
        M: ['', [Validators.required]],
        L: ['', [Validators.required]],
        XL: ['', [Validators.required]],
      })
    });
    this.pd.getAllCategory().subscribe((res: any[]) => {
      this.cat = res;
    });
  }

  getData() {
    this.pd.getProduct().subscribe((data) => {
      this.products = data;
    });

  }
  onUpload(event: { files: any }) {
    for (let file of event.files) {
      this.uploadedFiles?.push(file);
    }
    this.messageService.add({ severity: 'info', summary: 'Đã upload file', detail: '' });
  }

  handErr(result: string) {

  }

  onSubmit() {
    if (this.formAddProduct.invalid) {
      this.messageService.add({
        key: 'toast2',
        severity: 'warn',
        summary: 'Warning',
        detail: 'Có lỗi xảy ra'
      });
      return false;
    } else {
      if (this.uploadedFiles?.length === 0) {
        this.messageService.add({
          key: 'toast2',
          severity: 'warn',
          summary: 'Warning',
          detail: 'Chưa chọn ảnh cho sản phẩm'
        })
        return false;
      } else {
        this.pd.uploadImages(this.uploadedFiles)
          .then((urls) => {
            let img = urls;
            const { name, kt, ...r } = this.formAddProduct.value;
            const size = {
              M: { sold: 0, amount: +kt['M'] },
              L: { sold: 0, amount: +kt['L'] },
              XL: { sold: 0, amount: +kt['XL'] }
            }
            let slug = this.pd.slugify(name);
            const data = { ...r, name, slug, size, img };
            this.pd.addProduct(data).then(() => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thêm thành công' })
            })
            this.uploadedFiles = [];
            this.visible = false;
            this.formAddProduct = this._fb.group({
              name: ['', Validators.required],
              price: ['', [Validators.required]],
              date: ['', Validators.required],
              feature: ['', Validators.required],
              idCategory: ['', Validators.required],
              kt: this._fb.group({
                M: ['', [Validators.required]],
                L: ['', [Validators.required]],
                XL: ['', [Validators.required]],
              })
            });
          })
          .catch((error) => {
            console.error(error);
          })
      }
    }
    return true
  }
  handleDel(id: string) {
    this.confirmationService.confirm({
      message: `Xác nhận xóa sản phẩm ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pd.deleteProduct(id).then(() => {
          this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: 'Xóa thành công' });
          this.getData();
        })
      }
    });
  }



  count(id: string) {
    let availableQuantity = 0;
    const product: Product = this.products.find(item => item.id === id)!;

    for (const [sizeName, value] of Object.entries(product?.size)) {
      availableQuantity += value.amount;
    }
    return availableQuantity
  }
  showDialog() {
    this.visible = true;
  }
  getCatByName(id: string) {
    let data = this.cat.find(item => item.id === id);
    return data?.name
  }
  clear(table: Table) {
    table.clear();
  }


}

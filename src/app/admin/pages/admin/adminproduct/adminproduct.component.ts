import { Component, OnInit } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
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
  formAddProduct!: FormGroup;
  formUpdateProduct!: FormGroup;
  products: Product[] = [];
  cat: any[] = [];
  tableData: any[] = [];
  cols: any[] = [];
  uploadedFiles: any[] = [];
  visible: boolean = false;
  visibleSecond: boolean = false;
  constructor(
    private pd: ProductService,
    private messageService: MessageService,
    private _fb: FormBuilder,
    private storage: AngularFireStorage,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    // this.getData();
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
      }),
    });
    this.formUpdateProduct = this._fb.group({
      id: [''],
      nameUpdate: ['', Validators.required],
      priceUpdate: ['', [Validators.required]],
      dateUpdate: ['', Validators.required],
      featureUpdate: ['', Validators.required],
      idCategoryUpdate: ['', Validators.required],
      imgCurrent: ['', Validators.required],
      ktUpdate: this._fb.group({
        amountM: [''],
        soldM: [''],
        amountL: [''],
        soldL: [''],
        amountXL: [''],
        soldXL: [''],
      }),
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
    this.messageService.add({
      severity: 'info',
      summary: 'Đã upload file',
      detail: '',
    });
  }

  handErr(result: string) {}

  onSubmit() {
    if (this.formAddProduct.invalid) {
      this.messageService.add({
        key: 'toast2',
        severity: 'warn',
        summary: 'Warning',
        detail: 'Có lỗi xảy ra',
      });
      return false;
    } else {
      if (this.uploadedFiles?.length === 0) {
        this.messageService.add({
          key: 'toast2',
          severity: 'warn',
          summary: 'Warning',
          detail: 'Chưa chọn ảnh cho sản phẩm',
        });
        return false;
      } else {
        this.pd
          .uploadImages(this.uploadedFiles)
          .then((urls) => {
            let img = urls;
            const { name, kt, ...r } = this.formAddProduct.value;
            const size = {
              M: { sold: 0, amount: +kt['M'] },
              L: { sold: 0, amount: +kt['L'] },
              XL: { sold: 0, amount: +kt['XL'] },
            };
            let slug = this.pd.slugify(name);
            const data = { ...r, name, slug, size, img };
            this.pd.addProduct(data).then(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Thêm thành công',
              });
            });
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
              }),
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    return true;
  }
  onUpdate() {
    if (this.formUpdateProduct.invalid) {
      this.messageService.add({
        key: 'toast2',
        severity: 'warn',
        summary: 'Warning',
        detail: 'Có lỗi xảy ra',
      });
      return false;
    } else {
      this.pd
        .uploadImages(this.uploadedFiles)
        .then((urls) => {
          const {
            id,
            nameUpdate,
            dateUpdate,
            featureUpdate,
            idCategoryUpdate,
            imgCurrent,
            priceUpdate,
            ktUpdate,
            ...others
          } = this.formUpdateProduct.value;
          const size = {
            M: { sold: +ktUpdate['soldM'], amount: +ktUpdate['amountM'] },
            L: { sold: +ktUpdate['soldL'], amount: +ktUpdate['amountL'] },
            XL: { sold: +ktUpdate['soldXL'], amount: +ktUpdate['amountXL'] },
          };
          const data: Product = {
            id: id,
            date: dateUpdate,
            feature: featureUpdate,
            idCategory: idCategoryUpdate,
            img: [...imgCurrent, ...urls],
            price: priceUpdate,
            size: size,
            name: nameUpdate,
          };
          console.log(this.formUpdateProduct.value);
          console.log(data);

          this.pd.updateProductByID(data).then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Sửa thành công',
            });
          });
          this.uploadedFiles = [];
          this.visibleSecond = false;
          this.formUpdateProduct.reset();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return true;
  }
  handleDel(id: string) {
    this.confirmationService.confirm({
      message: `Xác nhận xóa sản phẩm ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pd.deleteProduct(id).then(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Thông báo',
            detail: 'Xóa thành công',
          });
          this.getData();
        });
      },
    });
  }

  count(id: string) {
    let availableQuantity = 0;
    const product: Product = this.products.find((item) => item.id === id)!;

    for (const [sizeName, value] of Object.entries(product?.size)) {
      availableQuantity += value.amount;
    }
    return availableQuantity;
  }
  showDialog() {
    this.visible = true;
  }
  showDiaLogUpdate(id: string) {
    this.visibleSecond = true;
    this.pd.getProductByID(id).subscribe((data) => {
      this.formUpdateProduct.patchValue({
        id: data.id,
        nameUpdate: data.name,
        priceUpdate: data.price,
        dateUpdate: data.date,
        featureUpdate: data.feature,
        idCategoryUpdate: data.idCategory,
        imgCurrent: data.img,
        ktUpdate: {
          amountM: data.size.M.amount,
          soldM: data.size.M.sold,
          amountL: data.size.L.amount,
          soldL: data.size.L.sold,
          amountXL: data.size.XL.amount,
          soldXL: data.size.XL.sold,
        },
      });
    });
  }
  getCatByName(id: string) {
    let data = this.cat.find((item) => item.id === id);
    return data?.name;
  }
  clear(table: Table) {
    table.clear();
  }
}

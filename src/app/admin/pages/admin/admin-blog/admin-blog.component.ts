import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as moment from 'moment'
import { ProductService } from 'src/app/core/services/product.services';
import { Blog } from 'src/app/interface/blog';
import { Timestamp } from '@angular/fire/firestore';
import { BlogService } from 'src/app/core/services/blog.service';
@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
  providers: [DialogService, MessageService]
})
export class AdminBlogComponent implements OnInit {
  formAddBlog!: FormGroup;
  formEditBlog!: FormGroup;
  blog: Blog[] = [];
  sidebarVisibleAdd: boolean = false;
  sidebarVisibleEdit: boolean = false;
  content: string = '';
  date!: Timestamp;
  title: string = '';
  isLoading: boolean = false;
  isShow: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private storage: AngularFireStorage,
    private confirmationService: ConfirmationService,
    public messageService: MessageService,
    private pd: ProductService,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.formAddBlog = this._fb.group({
      title: ['', Validators.required],
      date: ['', [Validators.required]],
      content: ['', Validators.required],
    });
    this.formEditBlog = this._fb.group({
      id: [''],
      title: ['', Validators.required],
      date: ['', [Validators.required]],
      content: ['', Validators.required],
      block: ['', Validators.required],
      thumbnail: ['', Validators.required],
    });
    this.fetchData();
  }
  async fetchData() {
    this.blog = await this.blogService.getAllBlog();
  }
  get f() { return this.formAddBlog.controls; }
  get fedit() { return this.formEditBlog.controls; }

  submitAddBlog(file: any) {
    if (file._files.length > 0 && this.formAddBlog.valid) {
      this.isLoading = true;
      const { title, date, content } = this.formAddBlog.value;
      this.pd.uploadImages(file._files).then((url) => {
        const data: Blog = {
          title: title,
          date: date,
          thumbnail: url[0],
          content: content,
          block: true
        }
        this.blogService.addBlog(data).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thêm blog thành công', });
          this.sidebarVisibleAdd = false;
          this.isLoading = false;
          this.formAddBlog.reset();
        });
      }).catch((error) => {
        console.error(error);
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', });
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Bạn chưa chọn ảnh !' });
    }
  }

  confirmDel(id: string) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa blog không ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blogService.deleteBlog(id).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted' });
          this.fetchData();
        })
      },
      reject: (type: ConfirmEventType) => {
        return false
      }
    });
  }
  modalEdit(id: string) {
    this.sidebarVisibleEdit = true;
    this.blogService.getId(id).subscribe(res => {
      this.formEditBlog.patchValue({
        id: id,
        title: res.title,
        date: res.date,
        content: res.content,
        block: res.block,
        thumbnail: res.thumbnail
      });
    });
  }
  submitEditBlog(file: any) {
    if (this.formEditBlog.valid) {
      if (file._files.lenght > 0) {
        console.log('có hình');
        this.pd.uploadImages(file._files).then((url) => {
          this.isLoading = true;
          const { title, date, content, block, id } = this.formEditBlog.value;
          const data: Blog = {
            title: title,
            date: date,
            thumbnail: url[0],
            content: content,
            block: block,
            id: id
          }
          this.blogService.updateBlog(data).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sửa blog thành công', });
            this.sidebarVisibleEdit = false;
            this.isLoading = false;
            this.formAddBlog.reset();
            this.fetchData()
          });
        }).catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', });
        });
      } else {
        console.log('không hình');
        this.isLoading = true;
        const { title, date, content, block, thumbnail, id } = this.formEditBlog.value;

        const data: Blog = {
          title: title,
          date: date,
          content: content,
          block: block,
          thumbnail: thumbnail,
          id: id
        }
        this.blogService.updateBlog(data).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sửa blog thành công', });
          this.sidebarVisibleEdit = false;
          this.isLoading = false;
          this.formAddBlog.reset();
          this.fetchData()
        });
      }
    }
  }
}


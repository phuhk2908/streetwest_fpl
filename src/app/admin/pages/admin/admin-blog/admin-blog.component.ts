import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  blog: Blog[] = [];
  sidebarVisibleAdd: boolean = false;
  content: string = '';
  date!: Timestamp;
  title: string = '';
  isLoading: boolean = false;
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
    this.fetchData();
  }
  async fetchData() {
    this.blog = await this.blogService.getAllBlog();
    console.log(this.blog);
  }
  get f() { return this.formAddBlog.controls; }
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
          block: 1
        }
        this.blogService.addBlog(data).then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Thêm blog thành công',
          });
          this.sidebarVisibleAdd = false;
          this.isLoading = false;
          this.formAddBlog.reset();
        });
      }).catch((error) => {
        console.error(error);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Xảy ra lỗi',
        });
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Bạn chưa chọn ảnh !',
      });
    }
  }

}

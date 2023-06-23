import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
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
  blog: any[] = [];
  sidebarVisible: boolean = true;
  content: string = '';
  date!: Timestamp;
  title: string = '';
  constructor(
    private _fb: FormBuilder,
    private storage: AngularFireStorage,
    private confirmationService: ConfirmationService,
     public messageService: MessageService,
     private pd: ProductService,
     private blogService: BlogService
  ) { }
  ngOnInit(): void {

  }

  submitAddBlog(file:any){
    if(file._files.length >0 && this.title.length>0 && this.date && this.content.length >0 ){
      console.log(file._files);
      this.pd.uploadImages(file._files).then((url) => {
         const data: Blog = {
         title:this.title,
         date: this.date,
         thumbnail: url[0],
         content: this.content,
         block: 1
        }
        this.blogService.addBlog(data).then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Thêm blog thành công',
          });
          this.title = '';
          this.date!;
          this.content='';
        });
      })
      .catch((error) => {
        console.error(error);
      });
      
    }
    
  }

}

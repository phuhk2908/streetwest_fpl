import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as moment from 'moment'
@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
  providers: [DialogService, MessageService]
})
export class AdminBlogComponent implements OnInit {
  blog: any[] = [];
  sidebarVisible: boolean = true;
  text: string = '';
  date!: Date;
  title: string = ''
  constructor(
    private _fb: FormBuilder,
    private storage: AngularFireStorage,
    private confirmationService: ConfirmationService, public messageService: MessageService
  ) { }
  ngOnInit(): void {

  }
  getValEdit(event: any) {
    console.log(event.htmlValue);
  }
  onUpload(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }



}

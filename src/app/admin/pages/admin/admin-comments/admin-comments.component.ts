import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog.service';
import { Blog } from 'src/app/interface/blog';
import { CommentI } from 'src/app/interface/comment';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  comments: CommentI[] = [];
  blogs: Blog[] = [];
  stateOptions: any[] = [{ label: 'Off', value: false }, { label: 'On', value: true }];
  clonedCm: { [s: string]: any } = {};
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService, private blogService: BlogService) { }
  ngOnInit() {
    this.getData();
  }
  async getData() {
    this.blogs = await this.blogService.getAllBlog();
    this.blogService.getCommentsAll().subscribe(res => {
      this.comments = res;
    });
  }
  onRowEditInit(cm: any) {
    console.log(cm);
    this.clonedCm[cm?.id as string] = { ...cm };
    console.log(this.clonedCm);
  }

  onRowEditSave(cm: any) {
    console.log('onRowEditSave', cm);
    this.blogService.updateComment(cm).then(() => {
      this.messageService.add({ severity: 'success', detail: 'Cập nhật thành công' });
      this.getData();
    }).catch((err) => {
      console.log(err);
    });
  }

  onRowEditCancel(cm: any, ri: number) {
    console.log(this.clonedCm[cm.id as string]);
    this.comments[ri] = this.clonedCm[cm?.id as string];
    delete this.clonedCm[cm.id as string];

  }

  getNameBlog(id: string) {
    let blog = this.blogs.find((item: Blog) => item.id === id);
    return blog?.title.slice(0, 20)
  }
  handleDel(id: string) {
    this.confirmationService.confirm({
      message: `Xác nhận xóa đơn hàng ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blogService.deleteComments(id).then(() => {
          this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: 'Xóa thành công' });
          this.getData();
        })
      }
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      console.log('unsubscribe');
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog.service';
import { Blog } from 'src/app/interface/blog';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentI } from 'src/app/interface/comment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss'],
})
export class BlogdetailsComponent implements OnInit {
  frmCmt!: FormGroup;
  date: string = '';
  blog: Blog = <Blog>{};
  allComment: CommentI[] = [];
  id: string = this.route.snapshot.params['id'];
  isLogin: boolean = false;
  private subscription = new Subscription();
  constructor(private blogService: BlogService, private route: ActivatedRoute) {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.fetchData();
    this.checkLogin();
    this.initFrmCmt();
  }
  initFrmCmt() {
    this.frmCmt = new FormGroup({
      name: new FormControl(),
      content: new FormControl('', Validators.required),
    });
  }
  handlePostCmt() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const data: CommentI = {
      name: this.frmCmt.value.name || user?.displayName,
      userID: user?.uid as string,
      blogID: this.id,
      content: this.frmCmt.value.content as string,
      date: moment().unix().toString(),
      like: 0,
      dislike: 0,
    };
    this.blogService.postComment(data);
    this.frmCmt.reset();
    this.fetchData();
  }
  fetchData() {
    this.blogService.getId(this.id).subscribe((res) => {
      this.blog = res;
      this.date = moment().format('DD/MM/YYYY');
    });
    this.blogService.getComments(this.id).then((data) => {
      this.allComment = data;
    });
  }
  checkLogin() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user?.uid == undefined) return;
    this.isLogin = true;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

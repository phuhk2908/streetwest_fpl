import { Component } from '@angular/core';
import { BlogService } from 'src/app/core/services/blog.service';
import { Blog } from 'src/app/interface/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  blogContain: any;
  blogNew: Blog[] = [];
  constructor(private blogService: BlogService) {}
  ngOnInit() {
    this.fetchData();
  }
  async fetchData() {
    this.blogContain = await this.blogService.getAllBlog();
    this.blogNew = this.blogContain.slice(0, 3);
  }
}

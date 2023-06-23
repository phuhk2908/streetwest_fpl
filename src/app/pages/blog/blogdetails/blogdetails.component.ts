import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog.service';
import { Blog } from 'src/app/interface/blog';
import * as moment from 'moment';
@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements OnInit{
  date:string=''
  blog: Blog = <Blog>{};
  id: string = this.route.snapshot.params['id'];
  constructor(private blogService: BlogService,private route: ActivatedRoute) {

    window.scrollTo(0, 0);

  }
  ngOnInit() {
    this.fetchData();
  }
   fetchData() {
    this.blogService.getId(this.id).subscribe(res=>{
      this.blog = res;
      this.date = moment().format('DD/MM/YYYY');
    })
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumb.services';
interface Breadcrumb {
  label: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;
  label: string = '';
  constructor(private readonly breadcrumbService: BreadcrumbsService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
    this.breadcrumbs$.subscribe((item: Breadcrumb[]) => {
      if (item.length > 0) {
        this.label = item[0]['label'];
      }
    })
  }
}

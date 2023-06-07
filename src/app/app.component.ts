import { Component } from '@angular/core';
import { AdminproductComponent } from './pages/admin/adminproduct/adminproduct.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StreetWest';
  showHeader:boolean = true
  handleAdmin(ComponentRef:Component){
   const name = ComponentRef.constructor.name
    if(name.startsWith('Admin')){
      this.showHeader = false
    }
  }
}

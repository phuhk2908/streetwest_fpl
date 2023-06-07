import { Component } from '@angular/core';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.scss']
})
export class AdminproductComponent {
  visible!: boolean;

  showDialog() {
    this.visible = true;
  }

}

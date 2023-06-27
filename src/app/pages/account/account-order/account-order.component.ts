import { Component } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-account-order',
  templateUrl: './account-order.component.html',
  styleUrls: ['./account-order.component.scss'],
})
export class AccountOrderComponent {
  orderItem: any;
  orderList: any[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.fetchOrderList();
  }
  async fetchOrderList() {
    const user = JSON.parse(localStorage.getItem('user') || '');
    if (user != undefined) {
      this.orderList = await this.orderService.getOrderByIDUser(user.uid);
    }
  }
  getDetailOrder(id: string) {
    this.orderService.getIdDetailOrder(id).subscribe((data) => {
      this.orderItem = data;
      this.orderItem = {
        ...this.orderItem,
        total: this.orderList.find((el) => el.idOrder === id).total,
      };
    });
  }
}

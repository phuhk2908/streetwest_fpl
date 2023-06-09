import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.services';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.scss']
})
export class AdminorderComponent implements OnInit {
  orders: any[] = [];
  ordersDetail: any;
  sidebar: boolean = false;
  constructor(private pd: ProductService, private messageService: MessageService,
    private _fb: FormBuilder, private storage: AngularFireStorage,
    private confirmationService: ConfirmationService, private od: OrderService) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.od.getOrders().subscribe(res => {
      this.orders = res;
    });
  }
  async showDetail(id: string) {
    this.sidebar = true;
    console.log(id);
    this.od.getIdDetailOrder(id).subscribe(res => {
      this.ordersDetail = res;
      console.log(this.ordersDetail.cart);
    })
  }
  clear(table: Table) {
    table.clear();
  }
  handleDel(id: string) {
    this.confirmationService.confirm({
      message: `Xác nhận xóa đơn hàng ?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.od.delOrder(id).then(() => {
          this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: 'Xóa thành công' });
          this.getData();
        })
      }
    });
  }
}

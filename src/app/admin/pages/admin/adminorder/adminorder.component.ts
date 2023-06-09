import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.services';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.scss']
})
export class AdminorderComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  ordersDetail: any;
  sidebar: boolean = false;
  sidebarEdit: boolean = false;
  statuses = [
    { label: 'Đơn hàng mới', value: 0 },
    { label: 'Đang giao hàng', value: 1 },
    { label: 'Xác nhận', value: 2 },
    { label: 'Hoàn tât', value: 3 }
  ];
  user: any;

  clonedProducts: { [s: string]: any } = {};
  constructor(private pd: ProductService, private messageService: MessageService,
    private _fb: FormBuilder, private storage: AngularFireStorage,
    private confirmationService: ConfirmationService,
    private od: OrderService, private AuthService: AuthService) { }

  private subscription: Subscription = new Subscription();
  ngOnInit() {
    this.getData();
  }

  onRowEditInit(order: any, ri: string) {
    this.clonedProducts[order?.id as string] = { ...order };
  }

  onRowEditSave(order: any) {
    console.log('onRowEditSave', order);
    this.od.updateDoc(order).then(() => {
      this.messageService.add({ severity: 'success', detail: 'Cập nhật thành công' });
      this.getData();
    }).catch((err) => {
      console.log(err);
    });
  }

  onRowEditCancel(order: any, index: number) {
    this.orders[index] = this.clonedProducts[order?.id as string];
    delete this.clonedProducts[order.id as string];
  }

  getData() {
    this.od.getOrders().subscribe(res => {
      this.orders = res;
    });
  }
  showDetail(order: any) {
    this.sidebar = true;
    this.od.getIdDetailOrder(order.idOrder).subscribe(res => {
      this.ordersDetail = { ...order, ...res };

      this.AuthService.getRole(order.userID).then(user => {
        this.user = user;
      })
    })
  }
  handelEdit(order: any) {
    this.sidebarEdit = true;
    this.od.getIdDetailOrder(order.idOrder).subscribe(res => {
      this.ordersDetail = { ...order, ...res };
      this.AuthService.getRole(order.userID).then(user => {
        this.user = user;
      })
    })
  }

  onHide() {
    this.ordersDetail = []
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
  ngOnDestroy() {
    if (this.subscription) {
      console.log('unsubscribe');
      this.subscription.unsubscribe();
    }
  }
}

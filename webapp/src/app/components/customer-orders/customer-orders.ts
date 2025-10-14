import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order';
import { Product } from '../../types/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  imports: [DatePipe],
  templateUrl: './customer-orders.html',
  styleUrl: './customer-orders.scss'
})
export class CustomerOrders {
  orders:Order[]=[];
  orderService=inject(OrderService);

  ngOnInit(){
    this.orderService.getCustomerOrders().subscribe((result) => {
      this.orders = result;
      console.log(this.orders);
    });
  }

  sellingPrice(product: Product) {
      return Math.round(product.price - (product.price * product.discount) / 100);
    }
}

import { Component, inject } from '@angular/core';
import { Customer } from '../../services/customer';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCard } from '../product-card/product-card';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { Wishlist } from '../../services/wishlist';
import { Cart } from '../../services/cart';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule,ProductCard,CarouselModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }
  customerService = inject(Customer);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages:Product[]=[];
  wishlistService=inject(Wishlist);
  cartService=inject(Cart);
  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
      console.log(this.featuredProducts);
      this.bannerImages.push(...result);
    });
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
      console.log(this.newProducts);
      this.bannerImages.push(...result);
    });
    
  }
}

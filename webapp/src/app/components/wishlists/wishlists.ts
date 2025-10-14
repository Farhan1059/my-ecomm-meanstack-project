import { Component, inject } from '@angular/core';
import { Wishlist } from '../../services/wishlist';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../types/product';

@Component({
  selector: 'app-wishlists',
  imports: [ProductCard],
  templateUrl: './wishlists.html',
  styleUrl: './wishlists.scss'
})
export class Wishlists {
  constructor(){};
  wishlists:Product[]=[]
  wishlistService=inject(Wishlist);
  ngOnInit(){
    this.wishlistService.init();
  }
}

import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Wishlist } from '../../services/wishlist';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() product!: Product;
  wishlistService = inject(Wishlist);
  get sellingPrice() {
    return Math.round(this.product.price - (this.product.price * this.product.discount) / 100)
  }

  addToWishList(product: Product) {
    console.log(product);
    if (this.isInWhishlist(product)) {
      this.wishlistService.removefromWishlists(product._id!).subscribe((result)=>{
        this.wishlistService.init();
      });
    }else{
      this.wishlistService.addInWishlists(product._id!).subscribe((result)=>{
        this.wishlistService.init();
      });
    }
  }

  isInWhishlist(product: Product) {
    let isExits = this.wishlistService.wishlists.find(
      (x) => x._id == product._id
    );
    if (isExits) return true;
    else return false;
  }

  cartService=inject(Cart);
  addToCart(product:Product){
     console.log(product);
     if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!,1).subscribe(()=>{
        this.cartService.init();
      })
     }else{
        this.cartService.removeFromCart(product._id!).subscribe(()=>{
          this.cartService.init();
        })  
     }
  }
  isProductInCart(productId:string){
   if (this.cartService.items.find((x) => x.product._id == productId)) {
    return true
   } else {
    return false;
   }
  }
}

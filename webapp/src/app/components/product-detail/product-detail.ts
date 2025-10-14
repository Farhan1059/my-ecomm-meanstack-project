import { Component, inject } from '@angular/core';
import { Customer } from '../../services/customer';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCard } from '../product-card/product-card';
import { Wishlist } from '../../services/wishlist';
import { MatIconModule } from '@angular/material/icon';
import { Cart } from '../../services/cart';
@Component({
  selector: 'app-product-detail',
  imports: [MatButtonModule, ProductCard, MatIconModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {
  customerService = inject(Customer);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  similarProducts: Product[] = [];
  ngOnInit() {
    this.route.params.subscribe((x: any) => {
      this.getProductDetail(x.id);
    })

  }

  getProductDetail(id: string) {
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;
      this.mainImage = this.product.images[0];
      console.log(this.product);

      this.customerService.getProducts('', this.product.categoryId, '', -1, '', 1, 4).subscribe(result => {
        this.similarProducts = result;
      })
    })
  }
  changeImage(url: string) {
    this.mainImage = url;
  }

  get sellingPrice() {
    return Math.round(this.product.price - (this.product.price * this.product.discount) / 100)
  }

  wishlistService=inject(Wishlist);
  addToWishList(product: Product) {
    console.log(product);
    if (this.isInWhishlist(product)) {
      this.wishlistService.removefromWishlists(product._id!).subscribe((result) => {
        this.wishlistService.init();
      });
    } else {
      this.wishlistService.addInWishlists(product._id!).subscribe((result) => {
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

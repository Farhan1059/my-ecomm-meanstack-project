import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Wishlist } from './services/wishlist';
import { Cart } from './services/cart';
import { Auth } from './services/auth';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('webapp');
  wishlistService = inject(Wishlist);
  cartService = inject(Cart);
  authService = inject(Auth);
  ngOnInit() {
    if(this.authService.isLoggedIn) {
    this.wishlistService.init();
    this.cartService.init();
    }
  }
}

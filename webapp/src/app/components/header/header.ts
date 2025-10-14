import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Customer } from '../../services/customer';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  imports: [RouterLink,FormsModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
   customerServise=inject(Customer);
   categoryList:Category[]=[];
   authService=inject(Auth);
   searchTerm!:string;
   ngOnInit(){
    this.customerServise.getCategories().subscribe((result)=>{
      this.categoryList=result;
    });
   }

   router=inject(Router);
   onSearch(e:any){
    if(e.target.value){
      this.router.navigateByUrl("/products?search="+e.target.value)
    }
   }

   searchCategory(id:string){
    this.searchTerm="";
      this.router.navigateByUrl("/products?categoryId="+id!)
   }

   logout(){
     this.authService.logout();
     this.router.navigateByUrl("/login")
   }
}

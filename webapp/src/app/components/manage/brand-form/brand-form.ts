import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brand-form',
  imports: [MatInputModule,MatButtonModule,FormsModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.scss'
})
export class BrandForm {
     name!:string;
     brandsService=inject(BrandService);
     router = inject(Router);
     route=inject(ActivatedRoute);
     id!:string;
     ngOnInit(){
      this.id =this.route.snapshot.params["id"];
      this.brandsService.getBrandById(this.id).subscribe((result:any)=>{
        this.name=result.name;
      });
     }
     add(){
      this.brandsService.addBrand(this.name).subscribe((result:any)=>{
        alert("Brand Added");
        this.router.navigateByUrl("/admin/brands")
      });
     }
    update(){
      this.brandsService.updateBrand(this.id,this.name).subscribe((result:any)=>{
        alert("Brand Updated");
        this.router.navigateByUrl("/admin/brands")
      });
    }
}

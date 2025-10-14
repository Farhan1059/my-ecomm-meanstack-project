import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [MatButtonModule,MatInputModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
formbuilder=inject(FormBuilder);
loginForm= this.formbuilder.group({
  email:["",[Validators.required]],
  password:["",[Validators.required]]
});
authService=inject(Auth);
router=inject(Router);
login(){
  console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe((result:any)=>{
    console.log(result);
    localStorage.setItem("token",result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    this.router.navigateByUrl("/");
  })
}
}

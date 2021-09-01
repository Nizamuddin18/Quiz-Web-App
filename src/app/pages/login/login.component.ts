import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    userName  : '',
    password  : ''
  }
  constructor(
    private snackbar : MatSnackBar,
    private login  : LoginService,
    private router : Router
  ) { }

  ngOnInit(): void { }
  hide = true;
  formSubmit(){
    console.log("Form Submit");
    if(this.loginData.userName.trim() == '' || 
    this.loginData.userName == null){
      this.snackbar.open('Username is Required' , '',{
        duration : 3000,
        // verticalPosition : 'top',
        horizontalPosition : 'center'
      });
      return;
    }
    if(this.loginData.password.trim() == '' || 
    this.loginData.password == null){
      this.snackbar.open('Password is Required' , '',{
        duration : 3000,
        // verticalPosition : 'top',
        horizontalPosition : 'center'
      });
      return;
    }

    // Request To Server To Generate Token
    this.login.generateToken(this.loginData).subscribe(
      (data : any)=>{
        console.log('success : ');
        console.log(data);
        //login..
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user : any)=>{
            this.login.setUser(user);
            console.log(user);
            
            if(this.login.getUserRole() == "ADMIN"){
              //redirect  if ADMIN - >  ADMIN Dashbaord
              window.location.href="/admin";
            }else if(this.login.getUserRole() == "NORMAL"){
              //redirect  if Normal - > NORMAL Dashbaord
              this.router.navigate(["user-dashboard/0"]);
            }else{
                // logout
                this.login.logOut();
                
            }
            
          }
        );
      },
      (error)=>{
        console.log('Error : ');
        console.log(error);
        this.snackbar.open('Invalid Details' , '',{
          duration : 3000,
          horizontalPosition : 'center'
        });
      }
    );
  }
}

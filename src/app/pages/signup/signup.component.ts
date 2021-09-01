import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private userService : UserServiceService,
    private snackbar : MatSnackBar
  ) { }

  public user = {
    userName :'' , 
    password : '' , 
    firstName : '' ,
    lastName : '' ,
    email : '' , 
    phone : ''
  };

  ngOnInit(): void { }
  hide = true;
  formSubmit(){
    if(this.user.userName == '' ||  this.user.userName == null){
      this.snackbar.open('Username is Required' , '',{
        duration : 3000,
        // verticalPosition : 'top',
        horizontalPosition : 'center'
      });
    }else{
      this.userService.addUser(this.user).subscribe(
        (data)=>{
          console.log(data);
          Swal.fire('Success' , 'User is registered!!' , 'success');
        },
        (error)=>{
          console.log(error);
          //alert("Something went Wrong");
        }
      );  
    }
  }
}

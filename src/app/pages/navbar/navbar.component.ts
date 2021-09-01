import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  constructor(public login : LoginService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
  }

  public logOut(){
    this.login.logOut();
    this.isLoggedIn = false;
    this.user = null;
    window.location.href="/";
    //window.location.reload();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  
  //get Current User
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }
  
  // genearte Token
  public generateToken(loginData : any){
    return this.http.post(`${baseUrl}/generate-token` , loginData)
  }

  //Login User  : Set Token in Local Storage 
  public loginUser(token: string){
    localStorage.setItem("token" , token);
    return true;
  }

  // check User is Logged In or Not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //logout - > remove token from Local Storage
  public logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //Get Token
  public getToken(){
    return localStorage.getItem("token");
  }

  //set User Details
  public setUser(user: any){
    localStorage.setItem('user' , JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}

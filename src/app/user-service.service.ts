import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './services/helper';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { 
    
  }

  // add user
  public addUser(user : any){
    return this.http.post(`${baseUrl}/user/` , user)
  }
}

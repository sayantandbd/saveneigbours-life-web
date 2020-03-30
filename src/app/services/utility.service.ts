import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  saveToken(token:string)
  {
    // save to local storage
    localStorage.setItem("token",token);
    
  }

  getToken()
  {
    return localStorage.getItem("token");
  }
}

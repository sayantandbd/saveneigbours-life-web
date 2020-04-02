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

  saveJsonData(key:string,data:any)
  {
    // save to local storage
    localStorage.setItem(key,JSON.stringify(data));
  }
  getJsonData(key)
  {
    return JSON.parse(localStorage.getItem(key));
  }
}

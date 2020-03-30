import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apilink = environment.apiurl;

  constructor(private _http:HttpClient) { }

  
  // login
  login(credentials:any) : Observable<any> 
  {
    return this._http.post(this.apilink+ 'user/login', credentials);
  }

  // register
  register(credentials:any) : Observable<any> 
  {
    return this._http.post(this.apilink+ 'user/register', credentials);
  }

  // profile update
  profile_update(data:any) : Observable<any> 
  {
    return this._http.post(this.apilink+ 'user/profile-update', data);
  }

  profile() : Observable<any>
  {
    return this._http.get(this.apilink + 'user/profile');
  }

  profile_details(id:any) : Observable<any>
  {
    return this._http.get(this.apilink + 'user/profile/' + id);
  }

  country_codes() : Observable<any>
  {
    return this._http.get(environment.countryJson);
  }

}

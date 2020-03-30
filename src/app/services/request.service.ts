import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public apilink = environment.apiurl;

  constructor(private _http:HttpClient) { }

  
  // create
  create(credentials:any) : Observable<any> 
  {
    return this._http.post(this.apilink+ 'requests/create', credentials);
  }

  list() : Observable<any> 
  {
    return this._http.get(this.apilink+ 'requests/list');
  }


}

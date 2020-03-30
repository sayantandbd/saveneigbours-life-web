import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserService,
    private _utilityService:UtilityService,
    private _router:Router,
    private ngxService:NgxUiLoaderService) { }

    public credentials:any = {
      'email':'',
      'password':''
    }
    faChevronDown = faChevronDown;

  ngOnInit() {
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  
  login()
  {
    console.log(this.credentials);
    this.ngxService.start();
    this._userService.login(this.credentials).subscribe(
      (data)=>
      {
          this.ngxService.stop();
          console.log(data);
          // login success
          this._utilityService.saveToken(data.token);
          // navigate to profile setup
          this._router.navigate(['feed']);
      },
      (error) =>
      {
          this.ngxService.stop();
          let errormsg : string = '';
          for(let i in error.error)
          {
            errormsg = errormsg + error.error[i] + '<br />';
          }
          alert(errormsg);
          console.log(errormsg);
      }
    );

  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _userService:UserService,
    private _utilityService:UtilityService,
    private _router:Router,
    private ngxService:NgxUiLoaderService) { }

  public countryJson:any = [];
  public credentials:any = {
    'name':'',
    'email':'',
    'password':'',
    'phone':'',
    'country_code':'+91',
    'user_type':'volunteer',
    'dob':''
  }
  faChevronDown = faChevronDown;

  ngOnInit() {
    this.load_country();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  load_country()
  {
    this._userService.country_codes().subscribe(
      (data)=>
      {
          this.countryJson = data;
          console.log(data);
      },
      (error) =>
      {
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

  register()
  {
    console.log(this.credentials);
    this.ngxService.start();
    this._userService.register(this.credentials).subscribe(
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

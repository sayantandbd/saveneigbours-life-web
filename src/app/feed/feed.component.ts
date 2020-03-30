import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { RequestService } from '../services/request.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  faChevronDown = faChevronDown;
  closeResult = '';
  
  public credentials:any = {
    'request_type':'Medical Emergency',
    'body':'',
    'address':'',
    lat:0,lng:0
  };

  public user_info:any = {'lat':0,'lng':0};
  public profile_info:any = {'name':''}

  public feeds:any = [];

  constructor(private modalService: NgbModal,
    private _userService:UserService,
    private _requestService:RequestService,
    private ngxService: NgxUiLoaderService) {}

  ngOnInit(){
    
    this.ngxService.start();
    this.load_profile();
    this.current_location();
    
  }

  // get current location
  current_location()
  {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      console.log(position.coords.longitude);
      this.user_info.lat = position.coords.latitude;
      this.user_info.lng = position.coords.longitude;
      this.credentials.lat = position.coords.latitude;
      this.credentials.lng = position.coords.longitude;
      this.update_user();
      this.load_feed();
    },
    (error)=>
    {
      alert("Unable to fetch your location, Please provide permissions and try again")
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  // load feeds
  load_feed()
  {
    this._requestService.list().subscribe(
      (data)=>
      {
          this.ngxService.stop();
          console.log(data);
          this.feeds = data;
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

  // load profile
  load_profile()
  {
    this._userService.profile().subscribe(
      (data)=>
      {
          this.profile_info = data;
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

  // update user details
  update_user()
  {
    this._userService.profile_update(this.user_info).subscribe(
      (data)=>
      {
          console.log(data);
          this.load_feed();
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
  
  // create requests
  create_request()
  {
    this.ngxService.start();
    this._requestService.create(this.credentials).subscribe(
      (data)=>
      {
          this.ngxService.stop();
          console.log(data);
          this.load_feed();
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // save
      this.create_request();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

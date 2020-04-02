import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewChildren, ContentChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { RequestService } from '../services/request.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { MapmodalComponent } from './mapmodal/mapmodal.component';
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { UtilityService } from '../services/utility.service';
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
  public profile_info:any = {'name':''};

  public feeds:any = [];

  private routerInfo: BehaviorSubject<boolean>;

  constructor(private modalService: NgbModal,
    private _userService:UserService,
    private _requestService:RequestService,
    private ngxService: NgxUiLoaderService,
    private _utilityService:UtilityService) {
      this.routerInfo = new BehaviorSubject<boolean>(false);
    }

  async ngOnInit(){
    
    this.load_profile();
    this.ngxService.start();
    this.routerInfo.asObservable().subscribe((success)=>
    {
        console.log(success);
        if(success)
        {
          this.load_feed();
          if(this.profile_info.lat=="0" || this.profile_info.lng==null)
          this.current_location();
          else this.ngxService.stop();
        }
    });
    
    
    
    
  }

  ngAfterViewInit()
  {
  }



  // get current location
  async current_location()
  {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      console.log(position.coords.longitude);
      this.user_info.lat = position.coords.latitude;
      this.user_info.lng = position.coords.longitude;
      this.credentials.lat = position.coords.latitude;
      this.credentials.lng = position.coords.longitude;
      this.update_user();
      
    },
    (error)=>
    {
      this.ngxService.stop();
      // console.log(this.profile_info);
      if(this.profile_info.lat=="0" || this.profile_info.lng==null)
      {
        this.openMap();
        console.log("Map opened");
      }
      //alert("Unable to fetch your location, Please provide permissions and try again");
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
  async load_profile()
  {
    this._userService.profile().subscribe(
      async (data)=>
      {
          this.profile_info = data;
          console.log(data);
          this.routerInfo.next(true);
      },
      async (error) =>
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
          this._utilityService.saveJsonData('user_info',this.user_info);
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

  openMap()
  {
    this.ngxService.stop();
    const modalRef = this.modalService.open(MapmodalComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      this.user_info.lat = receivedEntry.lat;
      this.user_info.lng = receivedEntry.lng;
      this.credentials.lat = receivedEntry.lat;
      this.credentials.lng = receivedEntry.lng;
      this.update_user();
      this.load_feed();
    })
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

import { Component, OnInit, NgZone, ViewChildren, ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MapsAPILoader, MouseEvent } from '@agm/core';
// import { EventEmitter } from 'protractor';
import { UtilityService } from '../../services/utility.service';
@Component({
  selector: 'app-mapmodal',
  templateUrl: './mapmodal.component.html',
  styleUrls: ['./mapmodal.component.scss']
})
export class MapmodalComponent implements OnInit {

  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _utilityService:UtilityService) { }

  public closeResult:string = '';

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  //gmap
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
 
  public changeAddress : any = {
    lat:0,
    lng:0
  };
  
  @ViewChild('search')
  public searchElementRef: ElementRef;

  ngOnInit(): void {
    this.loadMap();
  }

  ngViewAfterInit()
  {
    
  }

  passBack() {
    this.changeAddress.lat = this.latitude;
    this.changeAddress.lng = this.longitude;
    this.passEntry.emit(this.changeAddress);
    this.activeModal.close('Close');
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-map-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     console.log(this.closeResult);
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }



  loadMap()
  {
    // map
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      console.log("Load Map");
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      console.log(this.searchElementRef);
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    let user_info : any = this._utilityService.getJsonData('user_info');
    console.log(user_info);
    if((!!user_info && (user_info.lat==0 || user_info.lng==0)) || !user_info)
    {
      if ('geolocation' in navigator) {
        console.log('trying gps');
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          // this.getAddress(this.latitude, this.longitude);
        });
      }
    }

    else if ('geolocation' in navigator && !!user_info) {
        
        this.latitude = user_info.lat;
        this.longitude = user_info.lng;
        this.zoom = 12;
    }
    
  }
 
 
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

}

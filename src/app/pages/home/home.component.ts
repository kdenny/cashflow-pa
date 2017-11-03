import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import 'leaflet';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  map;
  baseMaps;
  layerGroup;
  showMap;
  options;
  address;
  autocomplete;
  public searchControl: FormControl;
  geolocationPosition;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(public api: ApiService, private router: Router, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

  }

  printData(data) {
    data.forEach(datum => {
      console.log(datum)
    })
  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
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
          let loc = {};
          //set latitude, longitude and zoom
          loc.latitude = place.geometry.location.lat();
          loc.longitude = place.geometry.location.lng();
          this.setMapView(loc);

          this.zoom = 12;
        });
      });
    });
    this.baseMaps = {
        CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        })
    };

    this.map = L.map("map");
    this.map.setView([39.952455, -75.163594], 14);
    this.baseMaps.CartoDB.addTo(this.map);

    //this.api.getData().then(data => {
    //
    //  this.layerGroup = L.geoJSON(data, {
    //    onEachFeature: function (feature, layer) {
    //      layer.bindPopup('' +
    //        '<h1>District '+feature.properties.LEG_DISTRI+'</h1>' +
    //        '<p>Name: '+feature.properties.H_LASTNAME+' '+feature.properties.H_FIRSTNAM+'</p>' +
    //        '<p>Party: '+feature.properties.PARTY+'</p>'
    //      );
    //    }
    //  }).addTo(this.map);
    //
    //  this.map.fitBounds(this.layerGroup.getBounds());
    //
    //})

    this.getLocation();

  }

  setMapView(loc) {
    let a = L.latLng(loc.latitude, loc.longitude);
    this.map.setView(a, 14);
  }

  getLocation() {
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.geolocationPosition = position;
                this.setMapView(this.geolocationPosition.coords)
                //let point = {
                //    'latitude': this.geolocationPosition.coords.latitude,
                //    'longitude': this.geolocationPosition.coords.longitude
                //}
                //this.api.getCandidates(point)
            },
            error => {
                switch (error.code) {
                    case 1:
                        console.log('Permission Denied');
                        break;
                    case 2:
                        console.log('Position Unavailable');
                        break;
                    case 3:
                        console.log('Timeout');
                        break;
                }
            }
        );
    };
  }

  redirect() {
    this.router.navigate(['/results']);
  }

}

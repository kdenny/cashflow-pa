import { Component, OnInit } from '@angular/core';

import 'leaflet';

import {ApiService} from '../../services/api.service';

import {Router} from '@angular/router';



@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  map;
  baseMaps;


  constructor(public api: ApiService, private router: Router) {

  }

  ngOnInit() {

    this.baseMaps = {
        CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        })
    };
    this.map = L.map("map");
    this.baseMaps.CartoDB.addTo(this.map);
    this.map.setView([40.28, -76.89], 8);

    this.api.getData().then(data => {
      L.geoJSON(data).addTo(this.map);
    })

  }

  goBack() {
    this.router.navigate(['/results']);
  }

}

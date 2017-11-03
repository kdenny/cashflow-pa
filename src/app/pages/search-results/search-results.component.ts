import { Component, OnInit } from '@angular/core';

import 'leaflet';

import {ApiService} from '../../services/api.service';

import {Router} from '@angular/router';


@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent implements OnInit {

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

    this.api.getData().then(data => {

      this.layerGroup = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup('' +
            '<h1>District '+feature.properties.LEG_DISTRI+'</h1>' +
            '<p>Name: '+feature.properties.H_LASTNAME+' '+feature.properties.H_FIRSTNAM+'</p>' +
            '<p>Party: '+feature.properties.PARTY+'</p>'
          );
        }
      }).addTo(this.map);

      this.map.fitBounds(this.layerGroup.getBounds());

    })

  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}

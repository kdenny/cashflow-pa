import { Component, OnInit } from '@angular/core';

import 'leaflet';

import {ApiService} from '../../services/api.service';

import {Router} from '@angular/router';

//import {Accordion, AccordionGroup} from './accordion';


@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent implements OnInit {

  map;
  baseMaps;
  isGroupOpen = false;
  lightBlueIcon;

  groups: Array<any> = [
      {
          heading: 'Candidates',
          content: ''
      },
      {
          heading: 'Committees',
          content: ''
      },
      {
          heading: 'Lobbyists',
          content: ''
      },
      {
          heading: 'Transactions Nearby',
          content: ''
      }
  ];

  candidate_types = [
    {
      'name': 'King',
      'candidates': [
        {
          'name': 'George'
        },
        {
          'name': 'Deezy'
        }
      ]
    },
    {
      'name': 'President',
      'candidates': [
        {
          'name': 'Obama'
        }
      ]
    }
  ]


  constructor(public api: ApiService, private router: Router) {

  }

  ngOnInit() {

      this.api.getCandidates(this.api.location).then(data => {
          console.log(this.api.currentCandidates)
      });

      function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.bindPopup(feature.properties.name);
                }
        }

      this.lightBlueIcon = L.icon({
        iconUrl: 'assets/leaflet/icon-lightblue-plus.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',

        iconSize:     [25, 41], // size of the icon
        shadowSize:   [41, 41], // size of the shadow
        iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41],  // the same for the shadow
        popupAnchor:  [0, -34] // point from which the popup should open relative to the iconAnchor
    });

    this.baseMaps = {
        CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        })
    };

    this.api.getTransactions(a).then(res => {
      this.map = L.map("map");
      this.map.setView([39.952455, -75.163594], 14);
      this.baseMaps.CartoDB.addTo(this.map);
      this.api.transactions.forEach(tr => {
        if (tr.point) {
          if (tr.point.latitude && tr.point.longitude) {
              let a = tr.name;
            L.marker([tr.point.latitude, tr.point.longitude], {icon: this.lightBlueIcon}).addTo(this.map).bindPopup(a);
          }

        }

      })
    });


    let a = {
      'd': 'd'
    };

  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToProfile(entity) {
    this.router.navigate(['/profile']);
  }

  redirect() {
    this.router.navigate(['/results']);
  }

}

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
            L.circle([tr.point.latitude, tr.point.longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 50
            }).addTo(this.map);
          }

        }

        console.log(tr)
      })
    });

    this.api.get

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

    let a = {
      'd': 'd'
    };



  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToProfile(entity) {
    console.log(entity)
    this.router.navigate(['/profile']);
  }

  redirect() {
    this.router.navigate(['/results']);
  }

}

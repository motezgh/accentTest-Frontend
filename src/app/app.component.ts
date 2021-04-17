import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ArchiveService } from './services/archive.service';

import "leaflet.animatedmarker/src/AnimatedMarker";


// const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
// const shadowUrl = 'assets/marker-shadow.png';
// const iconDefault = L.icon({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41]
// });
// L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  private map;
  private polyPoints =[]
  private dataLength;

  constructor(private archiveService: ArchiveService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.makeMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 35.62224166666667, 10.737660000000002 ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private makeMarkers(){
    this.archiveService.getData().subscribe(
      resp=>{console.log(resp[0].latitude);
        this.dataLength=resp.length;
        for(let i=0;i<this.dataLength;i++ ){
          const lon =resp[i].longitude;
          const lat =resp[i].latitude;
          // const marker=L.marker([lat,lon]);
          // marker.addTo(this.map);

          this.polyPoints.push([lat,lon]);
          
        }
        
        const firstMarker=L.marker([resp[0].latitude,resp[0].longitude]);
        firstMarker.addTo(this.map);
        const lastMarker=L.marker([resp[this.dataLength-1].latitude,resp[this.dataLength-1].longitude]);
        lastMarker.addTo(this.map);

        
        const line=L.polyline(this.polyPoints, {
          color: "red"
        });
        line.addTo(this.map);

        const animatedMarker=L.animatedMarker(line.getLatLngs(),
        {
          distance: 100,  // meters
          interval: 500, // milliseconds
        });
        animatedMarker.addTo(this.map)

        const group = new L.featureGroup([animatedMarker]);

        this.map.fitBounds(group.getBounds());

      },
      err=>{console.log(err)}
    );
  }

  }



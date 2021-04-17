import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ArchiveService } from './services/archive.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  private map;

  constructor(private archiveService: ArchiveService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.makeMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
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
      resp=>{console.log(resp)},
      err=>{console.log(err)}
    );
  }

  }



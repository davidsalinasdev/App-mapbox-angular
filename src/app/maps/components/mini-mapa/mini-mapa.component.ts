import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrl: './mini-mapa.component.css'
})
export class MiniMapaComponent {

  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  //Se tiene que esperar que todos los elementos html esten creados
  ngAfterViewInit(): void {

    // Si this.divMap no existe
    if (!this.divMap) throw 'El elemento HTML n fue encontado';
    if (!this.lngLat) throw 'lngLat no puede ser nullo';

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map);
  }
}

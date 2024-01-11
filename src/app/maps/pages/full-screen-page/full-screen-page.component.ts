import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

// Desestructuramos el Map
import { Map } from 'mapbox-gl';


@Component({
  selector: 'app-full-screen', // Cambia este selector
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;


  //Se tiene que esperar que todos los elementos html esten creados
  ngAfterViewInit(): void {

    // Si this.divMap no existe
    if (!this.divMap) throw 'El elemento HTML n fue encontado';

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

  }

}

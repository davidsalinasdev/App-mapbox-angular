import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

// Desestructuramos el Map
import { LngLat, Map } from 'mapbox-gl';


@Component({
  selector: 'app-zoom-range', // Cambia este selector
  templateUrl: './zoom-range.component.html',
  styleUrl: './zoom-range.component.css'
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  // Inicializamos el elemento de referencia
  @ViewChild('map') divMap?: ElementRef;

  // Declaramos una propiedad para el valor de zoom
  public zoom: number = 10;

  // Este mapa estara nullo en un determinado tiempo (?) 
  public map?: Map;

  // Propiedad para latitud y longitud 
  public currentLngLat: LngLat = new LngLat(-66.1674533722794, -17.386179275220456);

  //Se tiene que esperar que todos los elementos html esten creados
  ngAfterViewInit(): void {

    // Si this.divMap no existe
    if (!this.divMap) throw 'El elemento HTML n fue encontado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();

  }

  // Metodo para eliminar los listeners osea todo em Mapa con esto se eliminan todos los listeners
  ngOnDestroy(): void {
    this.map?.remove();
  }


  /**
   * mapListeners (Los listener deben ser eliminados al cambiar de componentes con OnDestroy)
   */
  public mapListeners() {
    // Si this.map no existe
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
    })

    // Aqui es cuando se termina el zoom en 18
    this.map.on('zoomend', (event) => {

      // this.map! significa que siempre se va a tener un valor
      if (this.map!.getZoom() < 18) return;
      // Cuando se detecte que esto es mayor 18 , volvera a ser 18
      this.map!.zoomTo(18);

    })

    // Cuando el mapa se mueva
    this.map.on('move', () => {
      // Se obtendra siempre el centro del mapa
      this.currentLngLat = this.map!.getCenter();

      // Extraer de manera independiente la lng y lat
      const { lng, lat } = this.currentLngLat;
    })

  }

  /**
   * zoomIn
   */
  public zoomIn() {
    this.map?.zoomIn();
  }

  /**
   * zomOut
   */
  public zoomOut() {
    this.map?.zoomOut();
  }


  /**
   * zoomChanged referencia para mover la barra de range
   */
  public zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }


}

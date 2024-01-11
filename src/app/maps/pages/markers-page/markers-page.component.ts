import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

// Interface para saber colores
interface MarkerAndColor {
  color: string;
  marker: Marker;
}

// Interface para grabar en el local storage
interface PlainMarker {
  color: string;
  lngLat: number[];
}


@Component({
  selector: 'app-markers-page', // Cambia este selector
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  // Inicializamos el elemento de referencia
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  // Declaramos una propiedad para el valor de zoom
  public zoom: number = 13;

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

    // Despues de inicializar el MAPA reconstruimos los marcadores
    this.readFromLocalStorage();

    // Crea una instancia de marcador
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'David salinas Poma';

    // const marker = new Marker({
    //   color: 'red',
    //   element: markerHtml
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map)

  }

  /**
   * name
   */
  public createMarker() {

    // Validamos  el mapa
    if (!this.map) return;

    // Color
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    // Para la Latitud y Longitud
    const lngLat = this.map.getCenter();


    this.addMarker(lngLat, color);
  }


  //  Metodo para crear cualquier marcador sin importar como se genere
  public addMarker(lngLat: LngLat, color: string) {

    // Si no existe el this.map no se va a poder añadir ningun marcador
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    // Cada vez que se crea un marcador se va agregar al arreglo de datos
    this.markers.push({ color, marker });

    // Guardando en el localStorage
    this.saveToLocalStorage();


    // Graba los nuevos markadores si se mueven
    marker.on('dragend', () => this.saveToLocalStorage());

    // dragend


  }

  /**
   * deleteMarker
   */
  public deleteMarker(index: number) {

    this.markers[index].marker.remove(); // Esto remueve el marcador
    this.markers.splice(index, 1); // Esto remueve el li

  }


  // Moverse con el marcador
  public flyTo(marker: Marker) {

    // Es una propiedad de mapbox
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })

  }

  // Para la persistencia de datos con localstorage
  /**
   * saveToLocalStorage
   */
  public saveToLocalStorage() {


    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));


  }

  public readFromLocalStorage() {

    //  si esto es nulo o no existe ?? va a regresar un string vacio serializable
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';

    // reconstruimos
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {

      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);

    })


  }


}

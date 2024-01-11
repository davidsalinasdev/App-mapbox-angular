import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';

// Mapbox
import mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGF2aWRzcDE5ODIiLCJhIjoiY2tyZTB1cDF6M3hreDJvcnpkeWl6ejAyeSJ9._GpRLBaRAIekHuKpiFKoqw';

// Componentes con selector
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';


// Componentes sin selector
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';




@NgModule({
  declarations: [
    MiniMapaComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangeComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }

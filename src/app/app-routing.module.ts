import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  /* La primera ruta especifica que cuando la URL es /maps, se debe cargar el módulo MapsModule. 
     Esto se hace mediante la carga perezosa (lazy loading), lo que significa que el módulo se cargará solo cuando sea necesario.
  */
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
  },

  /*
    La segunda ruta { path: '**', redirectTo: 'maps' } se utiliza como una ruta de comodín (**), 
    que captura cualquier ruta no definida y redirige al componente asociado a la ruta /maps. 
    Esto significa que si un usuario ingresa una URL que no coincide con ninguna otra ruta definida,
    será redirigido a la ruta /maps.
  */
  {
    path: '**',
    redirectTo: 'maps'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

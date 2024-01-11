import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Componentes de este Modulo
import { AppComponent } from './app.component';
import { NopagesdefaultcomponentComponent } from './nopagesdefaultcomponent/nopagesdefaultcomponent.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagesdefaultcomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

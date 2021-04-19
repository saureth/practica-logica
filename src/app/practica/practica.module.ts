import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { PracticaRoutingModule } from './practica-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { ModoUnoComponent } from './modo-uno/modo-uno.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    ModoUnoComponent
  ],
  imports: [
    CommonModule,
    PracticaRoutingModule,
    MatButtonModule
  ]
})
export class PracticaModule { }

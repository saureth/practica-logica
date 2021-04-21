import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { PracticaRoutingModule } from './practica-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { ModoUnoComponent } from './modo-uno/modo-uno.component';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    PrincipalComponent,
    ModoUnoComponent
  ],
  imports: [
    CommonModule,
    PracticaRoutingModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class PracticaModule { }

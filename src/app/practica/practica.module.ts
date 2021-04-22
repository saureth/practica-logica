import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { PracticaRoutingModule } from './practica-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { ModoUnoComponent } from './modo-uno/modo-uno.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModoDosComponent } from './modo-dos/modo-dos.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    PrincipalComponent,
    ModoUnoComponent,
    ModoDosComponent
  ],
  imports: [
    CommonModule,
    PracticaRoutingModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PracticaModule { }

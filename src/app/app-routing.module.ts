import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'practica', pathMatch: 'full'},
  { path: 'practica', loadChildren: () => import('./practica/practica.module').then(m => m.PracticaModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

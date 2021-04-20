import { Component, OnInit } from '@angular/core';
import { ListaSimple } from '../lista-simple/lista-simple';

@Component({
  selector: 'app-modo-uno',
  templateUrl: './modo-uno.component.html',
  styleUrls: ['./modo-uno.component.css']
})
export class ModoUnoComponent implements OnInit {

  listaNumeros: ListaSimple | undefined;

  constructor() { }

  ngOnInit(): void {
    this.listaNumeros = new ListaSimple();
    console.log(this.listaNumeros);
  }

}

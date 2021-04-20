import { Component, OnInit } from '@angular/core';
import { ListaSimple } from '../lista-simple/lista-simple';

@Component({
  selector: 'app-modo-uno',
  templateUrl: './modo-uno.component.html',
  styleUrls: ['./modo-uno.component.css']
})
export class ModoUnoComponent implements OnInit {

  listaNumeros: ListaSimple | undefined;
  numero: number = -1;

  constructor() { }

  ngOnInit(): void {
    this.numero = Math.floor (Math.random() * 10);
    this.listaNumeros = new ListaSimple();
    this.listaNumeros.crearLista(this.numero);
    console.log(this.listaNumeros);
  }

}

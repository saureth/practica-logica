import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaSimple } from '../lista-simple/lista-simple';

@Component({
  selector: 'app-modo-uno',
  templateUrl: './modo-uno.component.html',
  styleUrls: ['./modo-uno.component.css']
})
export class ModoUnoComponent implements OnInit {

  listaNumeros: ListaSimple | undefined;
  numero: number = -1;
  contributionsFormGroup: any;

  constructor( private readonly formBuilder: FormBuilder) { 
    this.createContributionsFormGroup();

  }
  createContributionsFormGroup() {
    this.contributionsFormGroup = this.formBuilder.group({
      numeroUsuario: [
        null,
        [Validators.required],
      ]
    });
  }

  ngOnInit(): void {
    this.listaNumeros = new ListaSimple();
    for (let index = 0; index < 4; index++) {
      this.numero = Math.floor (Math.random() * 10);
      while(this.listaNumeros.buscarNumero(this.numero)) {
        this.numero = Math.floor (Math.random() * 10);
      }
      this.listaNumeros.añadirAlFinal(this.numero);
    }
    this.listaNumeros.mostrarLista();
    console.log(this.listaNumeros);
  }

}

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
  modoUnoFormGroup: any;

  constructor( private readonly formBuilder: FormBuilder) { 
    this.createModoUnoFormGroup();

  }
  createModoUnoFormGroup() {
    this.modoUnoFormGroup = this.formBuilder.group({
      numeroUsuario: [
        null,
        [Validators.required],
      ]
    });
  }

  comparar(){
    let _sUsuario: string = this.modoUnoFormGroup.get("numeroUsuario").value.toString(); // obtengo los 4 dígitos del usuario como string
    let _picas: number = 0;
    let _fijas: number = 0;
    for (let index = 0; index < _sUsuario.length; index++) { // itero sobre cada uno de esos 4 dígitos
      let _nUsuario: number = Number.parseInt(_sUsuario[index]); //tomo el dígito en esa posición y lo vuelvo un número
      let posicionEncontrado = this.listaNumeros?.buscarPosicionNumero(_nUsuario); // busco si en la lista está ese # y retorno la posición
      if(posicionEncontrado == -1){ // Esto es si el dígito no está en ninguna posición de la lista
        //console.log("No hay ni pica ni fija");
      }
      else if (index == posicionEncontrado) { // Esto es si el dígito está en la lista y en la misma posición
        //console.log("Obtiene fija");
        _fijas ++;
      }else { // Esto es si el dígito sí está en la lista pero en una posición diferente
        //console.log("Obtiene pica");
        _picas ++;
      }
    }
    console.log("obtuvo " +_picas + " picas y " + _fijas + " fijas");
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

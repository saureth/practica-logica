import { NgIf } from '@angular/common';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaSimple } from '../lista-simple/lista-simple';
import { validarNumero } from '../otros/validadores';

@Component({
  selector: 'app-modo-uno',
  templateUrl: './modo-uno.component.html',
  styleUrls: ['./modo-uno.component.css']
})
export class ModoUnoComponent implements OnInit {

  listaNumeros: any;
  listaUsuario: ListaSimple | undefined;
  numero: number = -1;
  modoUnoFormGroup: any;
  turnos: number = 10;
  cuentaTurnos: number = 0;
  columnasTabla: string[] = ['numeroUsuario', 'picas', 'fijas'];
  datosTabla: any[] = [];
  datos: any[] = [];
  resultadoUltimoIntento: string="";
  termino: boolean = false;
  adivino: boolean = false;
  cantidadDigitos: number = 4;

  constructor(private readonly formBuilder: FormBuilder) {
    this.createModoUnoFormGroup();
  }

  createModoUnoFormGroup() {
    this.modoUnoFormGroup = this.formBuilder.group({
      numeroUsuario: [
        null,
        [Validators.required,
        Validators.min(0),
        Validators.max(9999)]
      ]
    });
  }

  comparar() {
    let _sUsuario: string = this.modoUnoFormGroup.get("numeroUsuario").value.toString(); // obtengo los 4 dígitos del usuario como string
    if(!!validarNumero(_sUsuario)){
      this.listaUsuario = ListaSimple.crearListaConNumero(_sUsuario);
      if(!this.listaUsuario){
        this.resultadoUltimoIntento = "El número es inválido, por favor revise";
      }
      else if (this.cuentaTurnos < this.turnos) {
        let _picas: number = 0;
        let _fijas: number = 0;
        for (let index = 0; index < this.cantidadDigitos; index++) { // itero sobre cada uno de esos 4 dígitos
          let _nUsuario = this.listaUsuario?.retornaNumeroEnPosicion(index); //tomo el dígito en esa posición y lo vuelvo un número
          let posicionEncontrado = this.listaNumeros?.buscarPosicionNumero(_nUsuario); // busco si en la lista está ese # y retorno la posición
          if (posicionEncontrado == -1) { // Esto es si el dígito no está en ninguna posición de la lista
            //console.log("No hay ni pica ni fija");
          }
          else if (index == posicionEncontrado) { // Esto es si el dígito está en la lista y en la misma posición
            //console.log("Obtiene fija");
            _fijas++;
          } else { // Esto es si el dígito sí está en la lista pero en una posición diferente
            //console.log("Obtiene pica");
            _picas++;
          }
        }
        this.resultadoUltimoIntento = "Intento # "+  (this.cuentaTurnos + 1) 
          + ", obtuvo " + _picas + " picas y " + _fijas + " fijas"; 
  
        this.datos.push({
          numeroUsuario: _sUsuario,
          picas: _picas,
          fijas: _fijas
        });
  
        if (_fijas == 4) {
          console.log("adivino");
          this.cuentaTurnos = this.turnos;
          this.termino = true;
          this.adivino = true;
          this.resultadoUltimoIntento += " ¡¡ Adivinó !! "
        } else {
          this.cuentaTurnos++;
        }
        this.actualizarDatos();
      }
      else {
        console.log("No hay más intentos");
        this.termino = true;
        this.adivino = false;
      }
    }
    else{ 
      this.resultadoUltimoIntento = "El número es inválido, por favor revise";
    }
  }

  actualizarDatos(){
    this.datosTabla= [];
    this.datos.forEach(dato => {
      this.datosTabla.push(dato);
    });
  }

  ngOnInit(): void {
    this.listaNumeros = ListaSimple.crearListaConAleatorios();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListaSimple } from '../lista-simple/lista-simple';

@Component({
  selector: 'app-modo-dos',
  templateUrl: './modo-dos.component.html',
  styleUrls: ['./modo-dos.component.css']
})
export class ModoDosComponent implements OnInit {

  modoDosFormGroup: any;
  numeroUsuario: any;
  numeroMaquina: any;
  listaUsuario: any;
  resultadoUltimoIntento: string="";
  cantidadDigitos: number = 4;
  datos: any[] = [];
  adivinoUsuario = false;
  adivinoMaquina = false;
  datosTabla: any[] = [];
  
  constructor(private readonly formBuilder: FormBuilder) {
    this.createModoDosFormGroup();
  }

  ngOnInit(): void {
    this.numeroMaquina = new ListaSimple();
    let _numero = -1;
    for (let index = 0; index < 4; index++) {
      _numero = Math.floor(Math.random() * 10);
      while (this.numeroMaquina.buscarNumero(_numero)) {
        _numero = Math.floor(Math.random() * 10);
      }
      this.numeroMaquina.añadirAlFinal(_numero);
    }
  }

  createModoDosFormGroup() {
    this.modoDosFormGroup = this.formBuilder.group({
      numeroUsuario: [
        null,
        [Validators.required,
        Validators.min(0),
        Validators.max(9999)]
      ]
    });
  }

  crearListaConNumero(numero: string): boolean{
    let _invalido = false;
    let _cantidad = 0;
    this.listaUsuario = new ListaSimple();
    this.listaUsuario.añadirAlFinal(Number.parseInt(numero[0]));
    _cantidad ++;
    for (let index = 1; index < numero.length; index++) {
      const digito = Number.parseInt(numero[index]);
      if(this.listaUsuario.buscarNumero(digito)){ 
        index = numero.length;
        _invalido = true;
      }
      else{
        this.listaUsuario.añadirAlFinal(digito);
        _cantidad ++;
      }
    }
    if (_cantidad != 4 ) {
      _invalido = true;
    }
    return _invalido;
  }

  comparar() {
    let _sUsuario: string = this.modoDosFormGroup.get("numeroAdivinarUsuario").value.toString(); // obtengo los 4 dígitos del usuario como string
    let _invalido = this.crearListaConNumero(_sUsuario);
    if(_invalido){
      this.resultadoUltimoIntento = "El número es inválido, por favor revise";
    }
    else {
      let _picas: number = 0;
      let _fijas: number = 0;
      for (let index = 0; index < this.cantidadDigitos; index++) { // itero sobre cada uno de esos 4 dígitos
        let _nUsuario = this.listaUsuario?.retornaNumeroEnPosicion(index); //tomo el dígito en esa posición y lo vuelvo un número
        let posicionEncontrado = this.numeroMaquina?.buscarPosicionNumero(_nUsuario); // busco si en la lista está ese # y retorno la posición
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
      this.resultadoUltimoIntento = //"Intento # "+  (this.cuentaTurnos + 1) 
         "Obtuvo " + _picas + " picas y " + _fijas + " fijas"; 

      this.datos.push({
        numeroUsuario: Number.parseInt(_sUsuario),
        picas: _picas,
        fijas: _fijas
      });

      if (_fijas == 4) {
        console.log("adivino");
      //this.cuentaTurnos = this.turnos;
        //this.termino = true;
        this.adivinoUsuario = true;
        this.resultadoUltimoIntento += " ¡¡ Adivinó !! "
      } else {
        //this.cuentaTurnos++;
      }
      this.actualizarDatos();
    }
  }

  actualizarDatos(){
    this.datosTabla= [];
    this.datos.forEach(dato => {
      this.datosTabla.push(dato);
    });
  }

  guardarNumeroUsuario(){
    this.numeroUsuario = this.modoDosFormGroup.get("numeroUsuario").value;
  }

}

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
  listaMaquina: any;
  resultadoUltimoIntento: string="";
  cantidadDigitos: number = 4;
  datosUsuario: any[] = [];
  columnasTablaUsuario: string[] = ['numeroUsuario', 'picas', 'fijas'];
  datosTablaUsuario: any[] = [];

  datosMaquina: any[] = [];
  columnasTablaMaquina: string[] = ['numeroMaquina', 'picas', 'fijas'];
  datosTablaMaquina: any[] = [];

  adivinoUsuario = false;
  adivinoMaquina = false;
  empezoJuego = false;
  
  constructor(private readonly formBuilder: FormBuilder) {
    this.createModoDosFormGroup();
  }

  ngOnInit(): void {
    this.numeroMaquina = ListaSimple.crearListaConAleatorios();
  }

  createModoDosFormGroup() {
    this.modoDosFormGroup = this.formBuilder.group({
      numeroUsuario: [
        null,
        [Validators.required,
        Validators.min(0),
        Validators.max(9999)]
      ],
      numeroAdivinarUsuario: [
        null,
        [Validators.required,
        Validators.min(0),
        Validators.max(9999)]
      ],
    });
  }

  comparar() {
    let _sUsuario: string = this.modoDosFormGroup.get("numeroAdivinarUsuario").value.toString(); // obtengo los 4 dígitos del usuario como string
    this.listaUsuario = ListaSimple.crearListaConNumero(_sUsuario);
    if(!this.listaUsuario){
      this.mostrarResultado("El número es inválido, por favor revise");
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
      this.mostrarResultado("Obtuvo " + _picas + " picas y " + _fijas + " fijas");
      this.datosUsuario.push({
        numeroUsuario: Number.parseInt(_sUsuario),
        picas: _picas,
        fijas: _fijas
      });

      if (_fijas == 4) {
        console.log("adivino");
      //this.cuentaTurnos = this.turnos;
        //this.termino = true;
        this.adivinoUsuario = true;
        this.mostrarResultado(" ¡¡ Adivinó !! ");
      } else {
        //this.cuentaTurnos++;
      }
      this.actualizarDatosUsuario();
    }
    this.adivinarMaquina();
  }

  adivinarMaquina(){
    this.listaMaquina = ListaSimple.crearListaConAleatorios();
  }

  actualizarDatosUsuario(){
    this.datosTablaUsuario= [];
    this.datosUsuario.forEach(dato => {
      this.datosTablaUsuario.push(dato);
    });
  }

  mostrarResultado(res: string){
    this.resultadoUltimoIntento = res;
  }

  guardarNumeroUsuario(){
    if(this.modoDosFormGroup.get("numeroUsuario").valid){
      this.numeroUsuario = ListaSimple.crearListaConNumero(this.modoDosFormGroup.get("numeroUsuario").value + "");
      if(!this.numeroUsuario){
        this.empezoJuego = false;
        this.mostrarResultado("El número es inválido, por favor revise");
      }
      else {
        this.empezoJuego = true;
        this.resultadoUltimoIntento = "";
      }
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListaSimple } from '../lista-simple/lista-simple';
import { validarNumero } from '../otros/validadores';

@Component({
  selector: 'app-modo-dos',
  templateUrl: './modo-dos.component.html',
  styleUrls: ['./modo-dos.component.css']
})
export class ModoDosComponent implements OnInit {
  @Input() modo: any;
  modoDosFormGroup: any;
  numeroUsuario: any;
  numeroUsuarioDos: any;
  numeroMaquina: any;
  listaUsuario: any;
  listaMaquina: any;
  listaUsuarioDos: any;
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
  adivinoUsuarioDos = false;
  empezoJuego = false;

  
  constructor(private readonly formBuilder: FormBuilder) {
    this.createModoDosFormGroup();
  }

  ngOnInit(): void {
    if(this.modo === 3){
      this.modoDosFormGroup.controls['numeroUsuarioDos'].setValidators(
        [Validators.required,
          Validators.min(0),
          Validators.max(9999)]
      );
      this.modoDosFormGroup.controls['numeroAdivinarUsuarioDos'].setValidators(
        [Validators.required,
          Validators.min(0),
          Validators.max(9999)]
      );
    }
    else{
      this.numeroMaquina = ListaSimple.crearListaConAleatorios();
      this.numeroMaquina.mostrarLista();
    }
    this.modoDosFormGroup.updateValueAndValidity();
  }

  createModoDosFormGroup() {
    this.modoDosFormGroup = this.formBuilder.group({
      numeroUsuario: [
        null,
        [Validators.required,
        Validators.min(0),
        Validators.max(9999)]
      ],
      numeroUsuarioDos: [
        null,
        []
      ],
      numeroAdivinarUsuario: [
        null,
        [Validators.required,
        Validators.min(0),
        Validators.max(9999)]
      ],
      numeroAdivinarUsuarioDos: [
        null,
        []
      ],
    });
  }

  comparar(lista: ListaSimple, esUsuarioUno: boolean){
    if (this.adivinoUsuario || this.adivinoMaquina || this.adivinoUsuarioDos) {
      return;
    }
    let _picas: number = 0;
    let _fijas: number = 0;
    let _lista: ListaSimple;
    if (!!esUsuarioUno && this.modo === 2) { 
      // Si el que está jugando es el usuario y además el contrincante es la máquina
      _lista = this.numeroMaquina; // la lista que tiene que adivinar es la de la máquina
    }else if(!!esUsuarioUno && this.modo === 3){
      // Si el que está jugando es el usuario PERO el contrincante es el otro usuario
      _lista = this.numeroUsuarioDos; // la lista que tiene que adivinar es la del segundo usuario
    }
    else _lista = this.numeroUsuario; // Si el que está jugando es la máquina, ella tiene que adivinar el # del usuario

    for (let index = 0; index < this.cantidadDigitos; index++) { // itero sobre cada uno de esos 4 dígitos
      let _nUsuario = lista.retornaNumeroEnPosicion(index); //tomo el dígito en esa posición y lo vuelvo un número
      let posicionEncontrado = _lista.buscarPosicionNumero(_nUsuario); // busco si en la lista está ese # y retorno la posición
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

    if (_fijas == 4) {
      // Si hay 4 fijas, es que el que está jugando ganó
      let s = " ¡¡ Adivinó " ;
      if(!!esUsuarioUno){
        this.adivinoUsuario = true;
        s += "usuario uno !!"
      }
      else if (!!(this.modo === 3)){
        this.adivinoUsuarioDos = true;
        s += "usuario dos !!"
      }
      else{
        this.adivinoMaquina = true;
        s += "máquina !!"
      }
      this.mostrarResultado(s);
    }
    else {
      // Si no hay 4 fijas, se muestra el resultado
      this.calcularTextoResultado(esUsuarioUno,_picas,_fijas,lista);
    }
      
  }

  calcularTextoResultado(esUsuario: boolean, _picas:number, _fijas: number, lista: ListaSimple) {
    if(!!esUsuario){
      // Si el que está jugando es el jugador uno, se muestra el resultado 
      // y se actualiza la primera tabla
      this.mostrarResultado("Jugador 1: Obtuvo " + _picas + " picas y " + _fijas+ " fijas");
      this.actualizarDatos(_fijas, _picas, true);
    }
    else if (this.modo === 3){
      // Si no es el jugador uno y el modo es tres, se agrega texto de jugador dos y se actualiza la segunda tabla
      this.mostrarResultado( this.resultadoUltimoIntento+ " Jugador 2: Obtuvo " + _picas + " picas y " + _fijas+ " fijas " );
      this.actualizarDatos(_fijas, _picas, false, ListaSimple.obtenerNumeroComoString(lista));
    }
    else {
      // Si está jugando contra la máquina y el que está jugando es la máquina, actualiza la tabla
      this.actualizarDatos(_fijas, _picas, false, ListaSimple.obtenerNumeroComoString(this.listaMaquina));
    }
  }

  adivinarUsuario() {
    let _sUsuario: string = this.modoDosFormGroup.get("numeroAdivinarUsuario").value; // obtengo los 4 dígitos del usuario como string
    if(this.modoDosFormGroup.get("numeroAdivinarUsuario").valid && validarNumero(_sUsuario)  == true) {
      this.listaUsuario = ListaSimple.crearListaConNumero(_sUsuario);
      if(!this.listaUsuario){
        this.mostrarResultado("El número es inválido, por favor revise");
      }
      else if(this.modo === 3){
        this.adivinarUsuarioDos();
      }
      else{
        this.comparar(this.listaUsuario, true);
        this.adivinarMaquina();
      }
    }
    else{
      this.mostrarResultado("El número es inválido, por favor revise");
    }
  }

  adivinarUsuarioDos() {
    let _sUsuario: string = this.modoDosFormGroup.get("numeroAdivinarUsuarioDos").value; // obtengo los 4 dígitos del usuario como string
    if(this.modoDosFormGroup.get("numeroAdivinarUsuarioDos").valid && validarNumero(_sUsuario)  == true) {
      this.listaUsuarioDos = ListaSimple.crearListaConNumero(_sUsuario);
      if(!this.listaUsuarioDos){
        this.mostrarResultado("El número del usuario dos es inválido, por favor revise");
      }
      else {
        this.comparar(this.listaUsuario, true);
        this.comparar(this.listaUsuarioDos, false);
      }
    }
    else{
      this.mostrarResultado("El número del usuario dos es inválido, por favor revise");
    }
  }

  adivinarMaquina(){
    this.listaMaquina = ListaSimple.crearListaConAleatorios();
    this.comparar(this.listaMaquina, false);
  }

  actualizarDatos(f: number, p: number, esUsuario: boolean, numero?: string){
    if(!!esUsuario){
      this.datosUsuario.push({
        numeroUsuario: this.modoDosFormGroup.get("numeroAdivinarUsuario").value,
        picas: p,
        fijas: f
      });
      this.datosTablaUsuario= [];
      this.datosUsuario.forEach(dato => {
        this.datosTablaUsuario.push(dato);
      });
    }
    else {
      this.datosMaquina.push({
        numeroMaquina: numero?.toString(),
        picas: p,
        fijas: f
      });
      this.datosTablaMaquina= [];
      this.datosMaquina.forEach(dato => {
        this.datosTablaMaquina.push(dato);
      });
    }
  }

  mostrarResultado(res: string){
    this.resultadoUltimoIntento = res;
  }

  guardarNumeroUsuario(){
    if(this.modoDosFormGroup.get("numeroUsuario").valid && validarNumero(this.modoDosFormGroup.get("numeroUsuario").value)  == true){
      this.numeroUsuario = ListaSimple.crearListaConNumero(this.modoDosFormGroup.get("numeroUsuario").value + "");
      if(!this.numeroUsuario){
        this.empezoJuego = false;
        this.mostrarResultado("El número es inválido, por favor revise");
      }
      else {
        if(this.modo === 3){
          this.guardarNumeroUsuarioDos();
        }
        else{
          this.empezoJuego = true;
          this.mostrarResultado("");
        }
      }
    }
    else {
      this.empezoJuego = false;
      this.mostrarResultado("El número es inválido, por favor revise");
    }
  }

  guardarNumeroUsuarioDos(){
    this.modoDosFormGroup.updateValueAndValidity();
    if(this.modoDosFormGroup.get("numeroUsuarioDos").valid && validarNumero(this.modoDosFormGroup.get("numeroUsuarioDos").value)  == true){
      this.numeroUsuarioDos = ListaSimple.crearListaConNumero(this.modoDosFormGroup.get("numeroUsuarioDos").value + "");
      if(!this.numeroUsuarioDos){
        this.empezoJuego = false;
        this.mostrarResultado("El número del usuario dos es inválido, por favor revise");
      }
      else {
        this.empezoJuego = true;
        this.mostrarResultado("");
      }
    }
    else {
      this.empezoJuego = false;
      this.mostrarResultado("El número del usuario dos es inválido, por favor revise");
    }
  }

}

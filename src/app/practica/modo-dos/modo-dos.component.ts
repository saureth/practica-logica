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
    this.numeroMaquina.mostrarLista();
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

  comparar(lista: ListaSimple, esUsuario: boolean){
    if (this.adivinoUsuario || this.adivinoMaquina) {
      return;
    }
    let _picas: number = 0;
    let _fijas: number = 0;
    let _lista: ListaSimple;
    if (!!esUsuario) {
      _lista = this.numeroMaquina;
    }
    else _lista = this.numeroUsuario;

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
      !!esUsuario ? this.adivinoUsuario = true: this.adivinoMaquina = true;
      let s = " ¡¡ Adivinó ";
      !!esUsuario ? s += "usuario !!": s += "máquina !!";
      this.mostrarResultado(s);
    } else if(!this.adivinoUsuario && !this.adivinoMaquina && !!esUsuario){
      this.mostrarResultado("Obtuvo " + _picas + " picas y " + _fijas+ " fijas");
    }
    !!esUsuario ? this.actualizarDatos(_fijas, _picas, true): this.actualizarDatos(_fijas, _picas, false, ListaSimple.obtenerNumeroComoString(this.listaMaquina));
  }

  adivinarUsuario() {
    let _sUsuario: string = this.modoDosFormGroup.get("numeroAdivinarUsuario").value.toString(); // obtengo los 4 dígitos del usuario como string
    if(this.modoDosFormGroup.get("numeroAdivinarUsuario").valid && validarNumero(_sUsuario)  == true) {
      this.listaUsuario = ListaSimple.crearListaConNumero(_sUsuario);
      if(!this.listaUsuario){
        this.mostrarResultado("El número es inválido, por favor revise");
      }
      else {
        this.comparar(this.listaUsuario, true);
        !!(this.modo === 3)? this.adivinarUsuarioDos(): this.adivinarMaquina();
      }
    }
    else{
      this.mostrarResultado("El número es inválido, por favor revise");
    }
  }

  adivinarUsuarioDos() {
    let _sUsuario: string = this.modoDosFormGroup.get("numeroAdivinarUsuarioDos").value.toString(); // obtengo los 4 dígitos del usuario como string
    if(this.modoDosFormGroup.get("numeroAdivinarUsuarioDos").valid && validarNumero(_sUsuario)  == true) {
      this.listaUsuario = ListaSimple.crearListaConNumero(_sUsuario);
      if(!this.listaUsuario){
        this.mostrarResultado("El número del usuario dos es inválido, por favor revise");
      }
      else {
        this.comparar(this.listaUsuario, true);
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
        this.empezoJuego = true;
        this.mostrarResultado("");
      }
    }
    else {
      this.empezoJuego = false;
      this.mostrarResultado("El número es inválido, por favor revise");
    }
  }

}

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
  
  constructor(private readonly formBuilder: FormBuilder) { }

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

  guardarNumeroUsuario(){
    this.numeroUsuario = this.modoDosFormGroup.get("numeroUsuario").value;
  }

}

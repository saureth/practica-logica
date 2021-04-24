import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modo-dos',
  templateUrl: './modo-dos.component.html',
  styleUrls: ['./modo-dos.component.css']
})
export class ModoDosComponent implements OnInit {

  modoDosFormGroup: any;
  numeroUsuario: any;
  
  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  gameIsSelected = false;
  selectedGame = -1;

  constructor() { }

  ngOnInit(): void {
  }

  startGame(type: number){
    this.gameIsSelected = true;
    this.selectedGame = type;
  }

  volverMenu(){
    this.gameIsSelected = false;
    this.selectedGame = -1;
  }

}

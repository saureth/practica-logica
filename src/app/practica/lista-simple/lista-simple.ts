import { NodoSimple } from "./nodo-simple";

export class ListaSimple {

    primerNodo;
    ultimoNodo;
    esVacia = true;

    constructor(){
        this.primerNodo = this.ultimoNodo = new NodoSimple();
    }

    crearLista(primerDato: number){
        this.primerNodo.setDato(primerDato);
        this.ultimoNodo = new NodoSimple();
        this.primerNodo.setLiga(this.ultimoNodo);
        this.esVacia = false;
    }

}
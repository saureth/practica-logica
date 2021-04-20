import { NodoSimple } from "./nodo-simple";

export class ListaSimple {

    primerNodo;
    ultimoNodo;

    constructor(){
        this.primerNodo = new NodoSimple();
        this.ultimoNodo = new NodoSimple();
        this.primerNodo.setLiga(this.ultimoNodo);
    }

}
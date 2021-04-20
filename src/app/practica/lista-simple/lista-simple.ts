import { NodoSimple } from "./nodo-simple";

export class ListaSimple {

    primerNodo;
    ultimoNodo;
    esVacia = true;

    constructor(){
        this.primerNodo = this.ultimoNodo = new NodoSimple();
    }

    crearLista(primerDato: number){
        this.primerNodo = new NodoSimple();
        this.primerNodo.setDato(primerDato);
        this.ultimoNodo = this.primerNodo;
        this.esVacia = false;
    }

    añadirAlFinal(dato: number){
        if (this.esVacia) {
            this.crearLista(dato);
        } else {
            let nuevoNodo = new NodoSimple();
            nuevoNodo.setDato(dato);
            let aux = this.primerNodo;
            while(aux.liga != null){
                aux = aux.liga;
            }
            aux.setLiga(nuevoNodo);
            this.ultimoNodo = nuevoNodo;
        }
    }

    mostrarLista(){
        let i: number = 0;
        let aux: NodoSimple = this.primerNodo;
        while(aux.liga != undefined){
            console.log("Dato: " + aux.dato);
            aux = aux.liga;
        }
        if(aux.liga == undefined && aux.dato != undefined){
            console.log("Dato: " + aux.dato);
        }
    }

}
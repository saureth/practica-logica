import { NodoSimple } from "./nodo-simple";

export class ListaSimple {

    primerNodo;
    ultimoNodo;
    esVacia = true;

    constructor() {
        this.primerNodo = this.ultimoNodo = new NodoSimple();
    }

    crearLista(primerDato: number) {
        this.primerNodo = new NodoSimple();
        this.primerNodo.setDato(primerDato);
        this.ultimoNodo = this.primerNodo;
        this.esVacia = false;
    }

    static crearListaConNumero(numero: string): any {
        let _invalido = false;
        let _cantidad = 0;
        let listaVacia = new ListaSimple();
        listaVacia.añadirAlFinal(Number.parseInt(numero[0]));
        _cantidad++;
        for (let index = 1; index < numero.length; index++) {
            const digito = Number.parseInt(numero[index]);
            if (listaVacia.buscarNumero(digito)) {
                index = numero.length;
                _invalido = true;
                return null;
            }
            else {
                listaVacia.añadirAlFinal(digito);
                _cantidad++;
            }
        }
        if (_cantidad != 4) {
            _invalido = true;
            return null;
        }
        return listaVacia;
    }

    static crearListaConAleatorios() {
        let listaAleatoria = new ListaSimple();
        let _numero = -1;
        for (let index = 0; index < 4; index++) {
            _numero = Math.floor(Math.random() * 10);
            while (listaAleatoria.buscarNumero(_numero)) {
                _numero = Math.floor(Math.random() * 10);
            }
            listaAleatoria.añadirAlFinal(_numero);
        }
    }

    añadirAlFinal(dato: number) {
        if (this.esVacia) {
            this.crearLista(dato);
        } else {
            let nuevoNodo = new NodoSimple();
            nuevoNodo.setDato(dato);
            let aux = this.primerNodo;
            while (aux.liga != null) {
                aux = aux.liga;
            }
            aux.setLiga(nuevoNodo);
            this.ultimoNodo = nuevoNodo;
        }
    }

    mostrarLista() {
        let aux: NodoSimple = this.primerNodo;
        while (aux.liga != undefined) {
            console.log("Dato: " + aux.dato);
            aux = aux.liga;
        }
        if (aux.liga == undefined && aux.dato != undefined) {
            console.log("Dato: " + aux.dato);
        }
    }

    buscarNumero(numero: number): boolean {
        let aux = this.primerNodo;
        while (aux.liga != undefined) {
            if (aux.dato == numero) {
                return true;
            }
            else aux = aux.liga;
        }
        if (aux.liga == undefined && aux.dato != undefined && aux.dato == numero) {
            return true;
        }
        else return false;
    }

    retornaNumeroEnPosicion(posicion: number): number {
        let aux = this.primerNodo;
        let _contador = 0;
        while (aux.liga != undefined) {
            if (_contador == posicion) {
                return aux.getDato();
            }
            else {
                aux = aux.liga;
                _contador++;
            }
        }
        if (aux.liga == undefined && aux.dato != undefined && _contador == posicion) {
            return aux.getDato();
        }
        else return -1;
    }

    buscarPosicionNumero(numero?: number): number {
        let aux = this.primerNodo;
        let posicion = 0;
        while (aux.liga != undefined) {
            if (aux.dato == numero) {
                return posicion;
            }
            else {
                aux = aux.liga;
                posicion++;
            }
        }
        if (aux.liga == undefined && aux.dato != undefined && aux.dato == numero) {
            return posicion;
        }
        else return -1;
    }

}
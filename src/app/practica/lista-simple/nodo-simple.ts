export class NodoSimple {

    dato: number = -1;
    liga: NodoSimple | undefined;

    constructor(){
        this.dato = -1;
        this.liga = undefined;
    }

    setDato(d: number){
        this.dato = d;
    }

    getDato(){
        return this.dato;
    }

    setLiga(l: NodoSimple){
        this.liga = l;
    }

}
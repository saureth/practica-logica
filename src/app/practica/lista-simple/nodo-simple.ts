export class NodoSimple {

    dato: number;
    liga: NodoSimple | undefined;

    constructor(){
        this.dato = -1;
        this.liga = undefined;
    }

    setDato(d: number){
        this.dato = d;
    }

    setLiga(l: NodoSimple){
        this.liga = l;
    }

}
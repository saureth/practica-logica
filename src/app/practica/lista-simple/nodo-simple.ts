export class NodoSimple {

    dato: number | undefined;
    liga: NodoSimple | undefined;

    constructor(){
        this.dato = undefined;
        this.liga = undefined;
    }

    setDato(d: number){
        this.dato = d;
    }

    setLiga(l: NodoSimple){
        this.liga = l;
    }

}
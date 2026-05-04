import { Estudiante } from '../models/estudiante.model';

class Nodo {
    public estudiante: Estudiante;
    public siguiente: Nodo | null = null;

    constructor(estudiante: Estudiante) {
        this.estudiante = estudiante;
    }
}

export class EstudiantesLinkedList {
    private cabeza: Nodo | null = null;
    private tamano: number = 0;

    insertarAlFinal(estudiante: Estudiante): void {
        const nuevoNodo = new Nodo(estudiante);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
        this.tamano++;
    }

    insertarEnPosicion(estudiante: Estudiante, indice: number): boolean {
        if (indice < 0 || indice > this.tamano) return false;
        const nuevoNodo = new Nodo(estudiante);
        if (indice === 0) {
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            let anterior: Nodo | null = null;
            for (let i = 0; i < indice; i++) {
                anterior = actual;
                actual = actual!.siguiente;
            }
            nuevoNodo.siguiente = actual;
            anterior!.siguiente = nuevoNodo;
        }
        this.tamano++;
        return true;
    }

    buscarPorCarnet(carnet: string): Estudiante | null {
        let actual = this.cabeza;
        while (actual) {
            if (actual.estudiante.carnet === carnet) return actual.estudiante;
            actual = actual.siguiente;
        }
        return null;
    }

    eliminarPorCarnet(carnet: string): boolean {
        if (!this.cabeza) return false;
        if (this.cabeza.estudiante.carnet === carnet) {
            this.cabeza = this.cabeza.siguiente;
            this.tamano--;
            return true;
        }
        let actual: Nodo | null = this.cabeza;
        let anterior: Nodo | null = null;
        while (actual && actual.estudiante.carnet !== carnet) {
            anterior = actual;
            actual = actual.siguiente;
        }
        if (actual) {
            anterior!.siguiente = actual.siguiente;
            this.tamano--;
            return true;
        }
        return false;
    }

    listarTodos(): Estudiante[] {
        const lista: Estudiante[] = [];
        let actual = this.cabeza;
        while (actual) {
            lista.push(actual.estudiante);
            actual = actual.siguiente;
        }
        return lista;
    }

    // LÓGICA PARA EL BOTÓN AMARILLO
    invertir(): void {
        let anterior: Nodo | null = null;
        let actual = this.cabeza;
        let siguiente: Nodo | null = null;
        while (actual) {
            siguiente = actual.siguiente;
            actual.siguiente = anterior;
            anterior = actual;
            actual = siguiente;
        }
        this.cabeza = anterior;
    }
}
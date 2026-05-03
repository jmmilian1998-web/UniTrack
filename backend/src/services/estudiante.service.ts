import { NodoEstudiante } from '../models/estudiante.model';
import type { Estudiante } from '../models/estudiante.model';
export class EstudianteService {
    private cabeza: NodoEstudiante | null = null;

    public insertarEstudiante(nuevoEstudiante: Estudiante): void {
        const nuevoNodo = new NodoEstudiante(nuevoEstudiante);
        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

    public obtenerEstudiantes(): Estudiante[] {
        const lista: Estudiante[] = [];
        let actual = this.cabeza;
        while (actual !== null) {
            lista.push(actual.estudiante);
            actual = actual.siguiente;
        }
        return lista;
    }

    public invertirLista(): void {
        let anterior: NodoEstudiante | null = null;
        let actual: NodoEstudiante | null = this.cabeza;
        let siguiente: NodoEstudiante | null = null;
        while (actual !== null) {
            siguiente = actual.siguiente;
            actual.siguiente = anterior;
            anterior = actual;
            actual = siguiente;
        }
        this.cabeza = anterior;
    }

    public buscarPorCarnet(carnet: string): Estudiante | null {
        let actual = this.cabeza;
        while (actual !== null) {
            if (actual.estudiante.carnet === carnet) return actual.estudiante;
            actual = actual.siguiente;
        }
        return null;
    }
}
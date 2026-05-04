import { Estudiante } from '../models/estudiante.model';

// Definición del Nodo para la Lista Simple de Estudiantes
class NodoEstudiante {
    estudiante: Estudiante;
    siguiente: NodoEstudiante | null = null;

    constructor(estudiante: Estudiante) {
        this.estudiante = estudiante;
    }
}

export class EstudianteService {
    private cabeza: NodoEstudiante | null = null;

    // 1. Insertar al Final (Requisito obligatorio)
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

    // 2. Invertir la Lista In-Place (Requisito obligatorio para 20 pts)
    public invertir(): void {
        let anterior: NodoEstudiante | null = null;
        let actual = this.cabeza;
        let siguiente: NodoEstudiante | null = null;

        while (actual !== null) {
            siguiente = actual.siguiente;
            actual.siguiente = anterior;
            anterior = actual;
            actual = siguiente;
        }
        this.cabeza = anterior;
    }

    // 3. Obtener todos los estudiantes para la tabla/visualización
    public obtenerEstudiantes(): Estudiante[] {
        const lista: Estudiante[] = [];
        let actual = this.cabeza;
        while (actual !== null) {
            lista.push(actual.estudiante);
            actual = actual.siguiente;
        }
        return lista;
    }

    // 4. Buscar por Carnet (Búsqueda lineal obligatoria)
    public buscarPorCarnet(carnet: string): Estudiante | null {
        let actual = this.cabeza;
        while (actual !== null) {
            if (actual.estudiante.carnet === carnet) {
                return actual.estudiante;
            }
            actual = actual.siguiente;
        }
        return null;
    }
}
import { NodoEstudiante, Estudiante } from '../models/estudiante.model';

export class EstudiantesService {
    // La 'cabeza' es el punto de entrada a nuestra lista enlazada
    private cabeza: NodoEstudiante | null = null;
    private longitud: number = 0;

    /**
     * 1. INSERTAR (Requerimiento 4.1)
     * Agrega un estudiante al final de la lista de forma manual.
     */
    public insertarEstudiante(nuevoEstudiante: Estudiante): void {
        const nuevoNodo = new NodoEstudiante(nuevoEstudiante);

        if (this.cabeza === null) {
            // Si no hay nadie, el nuevo es el primero
            this.cabeza = nuevoNodo;
        } else {
            // Recorrido lineal manual hasta el último nodo
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            // El último ahora apunta al nuevo
            actual.siguiente = nuevoNodo;
        }
        this.longitud++;
    }

    /**
     * 2. OBTENER TODOS
     * Recorre la lista para devolver un arreglo (usado para mostrar en el frontend).
     */
    public obtenerEstudiantes(): Estudiante[] {
        const lista: Estudiante[] = [];
        let actual = this.cabeza;

        while (actual !== null) {
            lista.push(actual.estudiante);
            actual = actual.siguiente;
        }
        return lista;
    }

    /**
     * 3. INVERTIR LISTA (Requerimiento 4.1)
     * Reordena los punteros físicamente para dar vuelta a la lista.
     */
    public invertirLista(): void {
        let anterior: NodoEstudiante | null = null;
        let actual: NodoEstudiante | null = this.cabeza;
        let siguiente: NodoEstudiante | null = null;

        while (actual !== null) {
            // Guardamos la referencia del que sigue
            siguiente = actual.siguiente;

            // Invertimos el puntero del nodo actual hacia atrás
            actual.siguiente = anterior;

            // Desplazamos los punteros una posición
            anterior = actual;
            actual = siguiente;
        }

        // Al final, el último nodo procesado se convierte en la nueva cabeza
        this.cabeza = anterior;
    }

    /**
     * 4. BUSCAR POR CARNET (Requerimiento 4.1)
     * Búsqueda lineal manual según el carnet del estudiante.
     */
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
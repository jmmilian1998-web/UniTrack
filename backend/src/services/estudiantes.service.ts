import { NodoEstudiante, Estudiante } from '../models/estudiante.model';

export class EstudiantesService {
    // El 'cabeza' es el primer nodo de nuestra lista
    private cabeza: NodoEstudiante | null = null;
    private longitud: number = 0;

    // Método para insertar un estudiante al final (Requerimiento 4.1)
    public insertarEstudiante(nuevoEstudiante: Estudiante): void {
        const nuevoNodo = new NodoEstudiante(nuevoEstudiante);

        if (this.cabeza === null) {
            // Si la lista está vacía, el nuevo nodo es la cabeza
            this.cabeza = nuevoNodo;
        } else {
            // Si no, recorremos hasta llegar al último nodo
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            // Conectamos el último nodo con el nuevo[cite: 1]
            actual.siguiente = nuevoNodo;
        }
        this.longitud++;
    }

    // Método para obtener todos los estudiantes (para la tabla del frontend)
    public obtenerEstudiantes(): Estudiante[] {
        const lista: Estudiante[] = [];
        let actual = this.cabeza;

        while (actual !== null) {
            lista.push(actual.estudiante);
            actual = actual.siguiente;
        }
        return lista;
    }
}
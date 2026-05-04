// Definición del Nodo para la Lista Doblemente Enlazada
class NodoDoble {
    public inscripcion: any;
    public next: NodoDoble | null = null;
    public prev: NodoDoble | null = null;

    constructor(inscripcion: any) {
        this.inscripcion = inscripcion;
    }
}

// Clase de la Estructura de Datos (Lista Doblemente Enlazada)
export class HistorialInscripcionesDLL {
    private cabeza: NodoDoble | null = null;
    private cola: NodoDoble | null = null;
    private tamano: number = 0;

    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamano = 0;
    }

    // 1. INSERTAR AL FINAL (Requerido para el historial)
    insertarAlFinal(inscripcion: any): void {
        const nuevoNodo = new NodoDoble(inscripcion);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            if (this.cola) {
                this.cola.next = nuevoNodo;
                nuevoNodo.prev = this.cola;
                this.cola = nuevoNodo;
            }
        }
        this.tamano++;
    }

    // 2. ELIMINAR POR CÓDIGO DE CURSO (Requerido)
    eliminarPorCodigo(codigoCurso: string): boolean {
        let actual = this.cabeza;

        while (actual) {
            if (actual.inscripcion.codigoCurso === codigoCurso) {
                if (actual.prev) {
                    actual.prev.next = actual.next;
                } else {
                    this.cabeza = actual.next;
                }

                if (actual.next) {
                    actual.next.prev = actual.prev;
                } else {
                    this.cola = actual.prev;
                }

                this.tamano--;
                return true;
            }
            actual = actual.next;
        }
        return false;
    }

    // 3. OBTENER LISTA ORDENADA POR SEMESTRE
    obtenerOrdenadoPorSemestre(): any[] {
        const lista = this.listarTodo();
        // Ordenamiento simple por semestre (ascendente)
        return lista.sort((a, b) => a.semestre - b.semestre);
    }

    // 4. LISTAR TODO EL HISTORIAL
    listarTodo(): any[] {
        const resultado: any[] = [];
        let actual = this.cabeza;
        while (actual) {
            resultado.push(actual.inscripcion);
            actual = actual.next;
        }
        return resultado;
    }

    getTamano(): number {
        return this.tamano;
    }
}
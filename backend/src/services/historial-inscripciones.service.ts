import { NodoInscripcion } from '../models/inscripcion.model';

export class HistorialInscripcionesDLL {
    cabeza: NodoInscripcion | null = null;
    cola: NodoInscripcion | null = null;

    // Insertar al final (el estándar para un historial)
    insertarAlFinal(codigo: string, nombre: string, semestre: number, nota: number) {
        const nuevo = new NodoInscripcion(codigo, nombre, semestre, nota);
        if (!this.cabeza) {
            this.cabeza = nuevo;
            this.cola = nuevo;
        } else {
            if (this.cola) {
                this.cola.siguiente = nuevo;
                nuevo.anterior = this.cola;
                this.cola = nuevo;
            }
        }
    }

    // Recorrer hacia atrás (Requisito obligatorio)
    recorrerAtras() {
        let actual = this.cola;
        const resultado = [];
        while (actual) {
            resultado.push(actual);
            actual = actual.anterior;
        }
        return resultado;
    }

    // Eliminar por código (Requisito obligatorio)
    eliminarPorCodigo(codigo: string) {
        let actual = this.cabeza;
        while (actual) {
            if (actual.codigoCurso === codigo) {
                if (actual.anterior) actual.anterior.siguiente = actual.siguiente;
                if (actual.siguiente) actual.siguiente.anterior = actual.anterior;
                if (actual === this.cabeza) this.cabeza = actual.siguiente;
                if (actual === this.cola) this.cola = actual.anterior;
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    // Ordenamiento Bubble Sort (Requisito para puntos extra)
    ordenarPorNota() {
        if (!this.cabeza) return;
        let intercambiado;
        do {
            intercambiado = false;
            let actual = this.cabeza;
            while (actual && actual.siguiente) {
                if (actual.nota < actual.siguiente.nota) {
                    // Intercambiamos solo los datos, no los punteros para simplificar
                    let tempNota = actual.nota;
                    let tempCod = actual.codigoCurso;
                    actual.nota = actual.siguiente.nota;
                    actual.codigoCurso = actual.siguiente.codigoCurso;
                    actual.siguiente.nota = tempNota;
                    actual.siguiente.codigoCurso = tempCod;
                    intercambiado = true;
                }
                actual = actual.siguiente;
            }
        } while (intercambiado);
    }
}
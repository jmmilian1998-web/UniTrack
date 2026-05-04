/**
 * Nodo para la Lista Enlazada Simple de Estudiantes
 */
class NodoEstudiante {
    constructor(estudiante) {
        this.estudiante = estudiante; // Objeto con carnet, nombres, apellidos, correo
        this.siguiente = null;
    }
}

/**
 * Clase EstudiantesLinkedList para la Fase 1
 */
class EstudiantesLinkedList {
    constructor() {
        this.cabeza = null;
        this.size = 0;
    }

    /**
     * Inserta al final de la lista
     */
    insertarAlFinal(estudiante) {
        const nuevoNodo = new NodoEstudiante(estudiante);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
        this.size++;
    }

    /**
     * Retorna todos los estudiantes en un array para el API
     */
    listarTodos() {
        const estudiantes = [];
        let actual = this.cabeza;
        while (actual) {
            estudiantes.push(actual.estudiante);
            actual = actual.siguiente;
        }
        return estudiantes;
    }

    /**
     * Elimina un estudiante buscando por su carnet
     */
    eliminarPorCarnet(carnet) {
        if (!this.cabeza) return false;

        if (this.cabeza.estudiante.carnet === carnet) {
            this.cabeza = this.cabeza.siguiente;
            this.size--;
            return true;
        }

        let actual = this.cabeza;
        while (actual.siguiente) {
            if (actual.siguiente.estudiante.carnet === carnet) {
                actual.siguiente = actual.siguiente.siguiente;
                this.size--;
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    /**
     * Invierte la lista in-place (Requisito Fase 1)
     */
    invertir() {
        let anterior = null;
        let actual = this.cabeza;
        let siguiente = null;
        while (actual) {
            siguiente = actual.siguiente;
            actual.siguiente = anterior;
            anterior = actual;
            actual = siguiente;
        }
        this.cabeza = anterior;
    }
}

// IMPORTANTE: Exportación para que el controlador lo reconozca[cite: 1]
module.exports = EstudiantesLinkedList;
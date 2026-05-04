class NodoHistorial {
    constructor(inscripcion) {
        this.inscripcion = inscripcion;
        this.siguiente = null;
        this.anterior = null;
    }
}

class HistorialInscripcionesDLL {
    constructor() {
        this.cabeza = null;
        this.cola = null;
    }

    insertarAlFinal(inscripcion) {
        const nuevo = new NodoHistorial(inscripcion);
        if (!this.cabeza) {
            this.cabeza = nuevo;
            this.cola = nuevo;
        } else {
            this.cola.siguiente = nuevo;
            nuevo.anterior = this.cola;
            this.cola = nuevo;
        }
    }

    ordenarPorSemestre() {
        if (!this.cabeza || !this.cabeza.siguiente) return;
        let cambiado;
        do {
            cambiado = false;
            let actual = this.cabeza;
            while (actual.siguiente) {
                // Ordenar de menor a mayor semestre
                if (actual.inscripcion.semestre > actual.siguiente.inscripcion.semestre) {
                    let temp = actual.inscripcion;
                    actual.inscripcion = actual.siguiente.inscripcion;
                    actual.siguiente.inscripcion = temp;
                    cambiado = true;
                }
                actual = actual.siguiente;
            }
        } while (cambiado);
    }

    listar() {
        const res = [];
        let act = this.cabeza;
        while (act) {
            res.push(act.inscripcion);
            act = act.siguiente;
        }
        return res;
    }
}

module.exports = HistorialInscripcionesDLL;
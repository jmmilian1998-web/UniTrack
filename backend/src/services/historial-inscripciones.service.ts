import { HistorialInscripcionesDLL } from './HistorialInscripcionesDLL';

export class HistorialInscripcionesService {
    // Mapa para gestionar un historial independiente por cada carnet de estudiante
    private historiales: Map<string, HistorialInscripcionesDLL>;

    constructor() {
        this.historiales = new Map<string, HistorialInscripcionesDLL>();
    }

    /**
     * Obtiene la lista doble del estudiante o crea una nueva si no existe.
     */
    private obtenerHistorial(carnet: string): HistorialInscripcionesDLL {
        if (!this.historiales.has(carnet)) {
            this.historiales.set(carnet, new HistorialInscripcionesDLL());
        }
        return this.historiales.get(carnet)!;
    }

    // 1. Agregar una nueva inscripción (Nodo) al final de la lista doble
    agregarInscripcion(carnet: string, datosInscripcion: any) {
        const historial = this.obtenerHistorial(carnet);
        historial.insertarAlFinal(datosInscripcion);
        return { success: true, mensaje: "Inscripción agregada al historial correctamente." };
    }

    // 2. Eliminar una inscripción específica buscando por el código del curso
    eliminarInscripcion(carnet: string, codigoCurso: string): boolean {
        const historial = this.historiales.get(carnet);
        if (!historial) return false;
        return historial.eliminarPorCodigo(codigoCurso);
    }

    // 3. Retornar el historial ordenado (por semestre, por ejemplo)
    ordenarHistorialPorSemestre(carnet: string) {
        const historial = this.historiales.get(carnet);
        if (!historial) return null;
        return historial.obtenerOrdenadoPorSemestre();
    }

    // 4. Listar todas las inscripciones del estudiante
    obtenerHistorialCompleto(carnet: string) {
        const historial = this.historiales.get(carnet);
        if (!historial) return [];
        return historial.listarTodo();
    }
}

// IMPORTANTE: Exportamos la instancia para que el controlador la reconozca
export const historialService = new HistorialInscripcionesService();
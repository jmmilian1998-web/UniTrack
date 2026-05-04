import { HistorialInscripcionesDLL } from '../services/HistorialInscripcionesDLL';

/**
 * Modelo Estudiante - Fase 1
 * Representa a un estudiante dentro del sistema UniTrack.
 * Incluye la integración con la Lista Doblemente Enlazada para el historial.
 */
export class Estudiante {
    carnet: string;
    nombres: string;
    apellidos: string;
    correo: string;

    /**
     * Historial de Inscripciones:
     * Se implementa como una Lista Doblemente Enlazada (DLL).
     */
    historial: HistorialInscripcionesDLL;

    constructor(carnet: string, nombres: string, apellidos: string, correo: string) {
        this.carnet = carnet;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;

        // Inicializamos una nueva lista vacía para cada estudiante
        this.historial = new HistorialInscripcionesDLL();
    }
}
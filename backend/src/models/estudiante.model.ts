import { HistorialInscripcionesDLL } from '../services/historial-inscripciones.service';

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
     * Se implementa como una Lista Doblemente Enlazada (DLL) 
     * cumpliendo con los requisitos de la Fase 1 del proyecto.
     */
    historial: HistorialInscripcionesDLL;

    constructor(carnet: string, nombres: string, apellidos: string, correo: string) {
        this.carnet = carnet;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;

        // Inicializa un historial vacío para cada estudiante al ser creado
        this.historial = new HistorialInscripcionesDLL();
    }
}
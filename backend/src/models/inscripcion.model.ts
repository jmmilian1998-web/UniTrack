export class NodoInscripcion {
    codigoCurso: string;
    nombreCurso: string;
    semestre: number;
    nota: number;
    siguiente: NodoInscripcion | null = null;
    anterior: NodoInscripcion | null = null;

    constructor(codigo: string, nombre: string, semestre: number, nota: number) {
        this.codigoCurso = codigo;
        this.nombreCurso = nombre;
        this.semestre = semestre;
        this.nota = nota;
    }
}
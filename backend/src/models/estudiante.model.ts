// Usamos clases para que Node.js v24 las reconozca como objetos reales
export class Estudiante {
    carnet: string = '';
    nombre: string = '';
    apellido: string = '';
    fechaNacimiento: string = '';
    correo: string = '';
}

export class NodoEstudiante {
    public estudiante: Estudiante;
    public siguiente: NodoEstudiante | null;

    constructor(estudiante: Estudiante) {
        this.estudiante = estudiante;
        this.siguiente = null;
    }
}
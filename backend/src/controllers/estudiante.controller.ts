import { Request, Response } from 'express';
import { EstudiantesService } from '../services/estudiantes.service';

// Instanciamos el servicio para usar la misma lista en todo el servidor
const estudiantesService = new EstudiantesService();

export const crearEstudiante = (req: Request, res: Response) => {
    try {
        const nuevoEstudiante = req.body;
        estudiantesService.insertarEstudiante(nuevoEstudiante);
        res.status(201).json({ message: 'Estudiante guardado en la lista enlazada', data: nuevoEstudiante });
    } catch (error) {
        res.status(500).json({ message: 'Error al insertar en la lista' });
    }
};

export const listarEstudiantes = (req: Request, res: Response) => {
    const lista = estudiantesService.obtenerEstudiantes();
    res.status(200).json(lista);
};

export const invertirListaEstudiantes = (req: Request, res: Response) => {
    estudiantesService.invertirLista();
    res.status(200).json({ message: 'La lista ha sido invertida exitosamente' });
};

export const buscarEstudiante = (req: Request, res: Response) => {
    const { carnet } = req.params;
    const estudiante = estudiantesService.buscarPorCarnet(carnet);

    if (estudiante) {
        res.status(200).json(estudiante);
    } else {
        res.status(404).json({ message: 'Estudiante no encontrado en la lista' });
    }
};
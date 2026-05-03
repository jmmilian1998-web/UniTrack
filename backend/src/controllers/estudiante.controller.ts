import { Request, Response } from 'express';
import { EstudianteService } from '../services/estudiante.service';
import { Estudiante } from '../models/estudiante.model';

const estudianteService = new EstudianteService();

export const crearEstudiante = (req: Request, res: Response) => {
    try {
        const { carnet, nombre, apellido, fechaNacimiento, correo } = req.body;
        if (!carnet || !nombre) return res.status(400).json({ message: 'Campos faltantes' });

        const nuevo: Estudiante = { carnet, nombre, apellido, fechaNacimiento, correo };
        estudianteService.insertarEstudiante(nuevo);
        res.status(201).json({ message: 'Guardado', data: nuevo });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

export const listarEstudiantes = (req: Request, res: Response) => {
    res.json(estudianteService.obtenerEstudiantes());
};

export const invertirListaEstudiantes = (req: Request, res: Response) => {
    estudianteService.invertirLista();
    res.json({ message: 'Invertida' });
};

export const buscarEstudiante = (req: Request, res: Response) => {
    // Solución al error de tu imagen: forzar String
    const carnetStr = String(req.params.carnet);
    const est = estudianteService.buscarPorCarnet(carnetStr);
    est ? res.json(est) : res.status(404).json({ message: 'No encontrado' });
};
import { Request, Response } from 'express';
import { EstudiantesLinkedList } from '../services/EstudiantesLinkedList';
import { historialService } from '../services/historial-inscripciones.service';

const listaEstudiantes = new EstudiantesLinkedList();

export const estudianteController = {
    listarTodos: (req: Request, res: Response) => {
        res.status(200).json(listaEstudiantes.listarTodos());
    },

    crear: (req: Request, res: Response) => {
        const nuevoEstudiante = req.body;
        listaEstudiantes.insertarAlFinal(nuevoEstudiante);
        res.status(201).json({ mensaje: "Estudiante creado" });
    },

    invertirLista: (req: Request, res: Response) => {
        listaEstudiantes.invertir();
        res.status(200).json({
            mensaje: "Lista invertida",
            data: listaEstudiantes.listarTodos()
        });
    },

    eliminar: (req: Request, res: Response) => {
        const { carnet } = req.params;
        const exito = listaEstudiantes.eliminarPorCarnet(carnet);
        if (exito) res.status(200).json({ mensaje: "Eliminado" });
        else res.status(404).json({ mensaje: "No encontrado" });
    }
    // ... otros métodos (actualizar, historial, etc.)
};
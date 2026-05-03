import { Router } from 'express';
import {
    crearEstudiante,
    listarEstudiantes,
    invertirListaEstudiantes,
    buscarEstudiante
} from '../controllers/estudiante.controller';

const router = Router();

/**
 * DEFINICIÓN DE ENDPOINTS (Requerimiento 4.1)
 * Aquí asociamos cada URL con su respectiva lógica en el controlador.
 */

// POST: http://localhost:3000/api/estudiantes (Para guardar uno nuevo)
router.post('/', crearEstudiante);

// GET: http://localhost:3000/api/estudiantes (Para ver toda la lista)
router.get('/', listarEstudiantes);

// POST: http://localhost:3000/api/estudiantes/invertir (Para dar vuelta a la lista)
router.post('/invertir', invertirListaEstudiantes);

// GET: http://localhost:3000/api/estudiantes/:carnet (Para buscar uno específico)
router.get('/:carnet', buscarEstudiante);

export default router;
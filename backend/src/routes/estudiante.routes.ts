import { Router } from 'express';
import { estudianteController } from '../controllers/estudiante.controller';

const router = Router();

router.get('/', estudianteController.listarTodos);
router.post('/', estudianteController.crear);
router.delete('/:carnet', estudianteController.eliminar);

// RUTA CRUCIAL PARA EL BOTÓN
router.post('/invertir', estudianteController.invertirLista);

export default router;
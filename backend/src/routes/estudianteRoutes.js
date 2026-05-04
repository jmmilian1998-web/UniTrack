const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// --- Rutas para Estudiantes (Lista Enlazada Simple) ---

// Obtener todos los estudiantes
router.get('/', estudianteController.obtenerEstudiantes);

// Registrar un nuevo estudiante
router.post('/', estudianteController.registrarEstudiante);

// Eliminar un estudiante por carnet
router.delete('/:carnet', estudianteController.eliminarEstudiante);

// Invertir la lista de estudiantes in-place
router.post('/invertir', estudianteController.invertirEstudiantes);


// --- Rutas para Historial (Lista Doblemente Enlazada) ---

// Obtener el historial de un estudiante específico
router.get('/:carnet/historial', estudianteController.obtenerHistorial);

// Agregar un nuevo curso al historial
router.post('/:carnet/historial', estudianteController.agregarHistorial);

// ORDENAR el historial por semestre (Nueva Ruta para la Fase 1)
router.post('/:carnet/historial/ordenar', estudianteController.ordenarHistorial);

module.exports = router;
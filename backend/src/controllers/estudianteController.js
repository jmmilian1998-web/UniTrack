const EstudiantesLinkedList = require('../services/EstudiantesLinkedList');
const HistorialInscripcionesDLL = require('../services/HistorialInscripcionesDLL');

// Instancias globales para el manejo de datos en memoria
const listaEstudiantes = new EstudiantesLinkedList();
const historiales = {};

/**
 * Registra un estudiante en la Lista Simple
 */
exports.registrarEstudiante = (req, res) => {
    const { carnet, nombres, apellidos, correo } = req.body;

    if (!carnet || !nombres) {
        return res.status(400).json({ message: "Carnet y nombres son obligatorios" });
    }

    const nuevoEstudiante = { carnet, nombres, apellidos, correo };
    listaEstudiantes.insertarAlFinal(nuevoEstudiante);

    // Inicializa la Lista Doblemente Enlazada para el historial de este estudiante
    historiales[carnet] = new HistorialInscripcionesDLL();
    res.status(201).json({ message: "Estudiante registrado con éxito" });
};

/**
 * Obtiene todos los estudiantes de la Lista Simple
 */
exports.obtenerEstudiantes = (req, res) => {
    res.json(listaEstudiantes.listarTodos());
};

/**
 * Agrega un curso a la DLL del estudiante
 */
exports.agregarHistorial = (req, res) => {
    const { carnet } = req.params;
    const { codigoCurso, nombreCurso, semestre, nota } = req.body;

    if (!historiales[carnet]) {
        return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    const nuevaInscripcion = { codigoCurso, nombreCurso, semestre, nota };
    historiales[carnet].insertarAlFinal(nuevaInscripcion);
    res.status(201).json({ message: "Inscripción agregada al historial" });
};

/**
 * Retorna el historial (DLL) de un estudiante específico
 */
exports.obtenerHistorial = (req, res) => {
    const { carnet } = req.params;
    if (!historiales[carnet]) {
        return res.status(404).json({ message: "No se encontró historial" });
    }
    res.json(historiales[carnet].listar());
};

/**
 * Ejecuta el algoritmo de ordenamiento en la DLL
 */
exports.ordenarHistorial = (req, res) => {
    const { carnet } = req.params;
    if (historiales[carnet]) {
        historiales[carnet].ordenarPorSemestre();
        res.json({ message: "Historial ordenado por semestre exitosamente" });
    } else {
        res.status(404).json({ message: "Estudiante no encontrado" });
    }
};

/**
 * Invierte la Lista Simple de estudiantes (In-place)
 */
exports.invertirEstudiantes = (req, res) => {
    listaEstudiantes.invertir();
    res.json({ message: "Lista de estudiantes invertida correctamente" });
};

/**
 * Elimina un estudiante y su historial asociado
 */
exports.eliminarEstudiante = (req, res) => {
    const { carnet } = req.params;
    const eliminado = listaEstudiantes.eliminarPorCarnet(carnet);
    if (eliminado) {
        delete historiales[carnet];
        res.json({ message: "Estudiante y su historial han sido eliminados" });
    } else {
        res.status(404).json({ message: "Estudiante no encontrado" });
    }
};
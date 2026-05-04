const API_URL = 'http://localhost:3000/api/estudiantes';

/**
 * --- GESTIÓN DE ESTUDIANTES (LISTA SIMPLE) ---
 */

// Registrar un nuevo estudiante
async function registrarEstudiante(event) {
    event.preventDefault();
    const carnet = document.getElementById('carnet').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carnet, nombres, apellidos, correo })
        });

        if (response.ok) {
            alert("Estudiante registrado con éxito");
            event.target.reset();
            obtenerEstudiantes();
        }
    } catch (error) {
        console.error("Error al registrar estudiante:", error);
    }
}

// Obtener y mostrar la lista de estudiantes con flechas simples →
async function obtenerEstudiantes() {
    const container = document.getElementById('listaEstudiantes');
    try {
        const response = await fetch(API_URL);
        const estudiantes = await response.json();

        if (estudiantes.length === 0) {
            container.innerHTML = "<p style='color: #888; text-align: center;'>No hay estudiantes en la lista.</p>";
            return;
        }

        let html = '<div class="nodos-display">';
        estudiantes.forEach((est, index) => {
            html += `
                <div class="nodo-wrapper">
                    <div class="nodo" onclick="verHistorial('${est.carnet}')">
                        <strong>${est.carnet}</strong><br>
                        <small>${est.nombres} ${est.apellidos}</small>
                    </div>
                    <button class="btn-delete-small" onclick="eliminarEstudiante('${est.carnet}')" title="Eliminar estudiante">×</button>
                </div>
            `;
            // Representación visual de Lista Simple
            if (index < estudiantes.length - 1) {
                html += '<span class="flecha"> → </span>';
            }
        });
        html += '</div>';
        container.innerHTML = html;
    } catch (error) {
        console.error("Error al obtener estudiantes:", error);
    }
}

// Eliminar estudiante y su historial asociado
async function eliminarEstudiante(carnet) {
    if (!confirm(`¿Deseas eliminar al estudiante ${carnet}? Esto borrará también su historial.`)) return;

    try {
        const response = await fetch(`${API_URL}/${carnet}`, { method: 'DELETE' });
        if (response.ok) {
            obtenerEstudiantes();
            // Cerrar el modal por si el estudiante eliminado era el que estaba en vista
            document.getElementById('modalHistorial').style.display = 'none';
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}

// Invertir la lista de estudiantes (operación in-place)
async function invertirLista() {
    try {
        const response = await fetch(`${API_URL}/invertir`, { method: 'POST' });
        if (response.ok) {
            obtenerEstudiantes();
        }
    } catch (error) {
        console.error("Error al invertir la lista:", error);
    }
}


/**
 * --- GESTIÓN DE HISTORIAL (LISTA DOBLEMENTE ENLAZADA) ---
 */

// Abrir modal y preparar carga de historial
async function verHistorial(carnet) {
    const modal = document.getElementById('modalHistorial');
    modal.style.display = 'block';
    document.getElementById('carnetHistorial').value = carnet;
    cargarDatosHistorial(carnet);
}

// Cargar y mostrar los cursos con flechas dobles ↔
async function cargarDatosHistorial(carnet) {
    const contenido = document.getElementById('contenidoHistorial');
    try {
        const response = await fetch(`${API_URL}/${carnet}/historial`);
        const historial = await response.json();

        if (historial.length === 0) {
            contenido.innerHTML = "<p style='text-align: center;'>El estudiante aún no tiene cursos inscritos.</p>";
            return;
        }

        let html = '<div class="dll-container">';
        historial.forEach((curso, index) => {
            html += `
                <div class="dll-node">
                    <strong>${curso.nombreCurso}</strong><br>
                    <small>Semestre: ${curso.semestre}</small><br>
                    <small>Nota: ${curso.nota}</small>
                </div>
            `;
            // Representación visual de Lista Doblemente Enlazada
            if (index < historial.length - 1) {
                html += '<span class="double-arrow"> ↔ </span>';
            }
        });
        html += '</div>';
        contenido.innerHTML = html;
    } catch (error) {
        console.error("Error al cargar historial:", error);
    }
}

// Registrar un curso en la DLL
async function agregarInscripcion(event) {
    event.preventDefault();
    const carnet = document.getElementById('carnetHistorial').value;
    const datos = {
        codigoCurso: document.getElementById('codigoCurso').value,
        nombreCurso: document.getElementById('nombreCurso').value,
        semestre: parseInt(document.getElementById('semestre').value),
        nota: parseInt(document.getElementById('nota').value)
    };

    try {
        const response = await fetch(`${API_URL}/${carnet}/historial`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            // Limpiar solo los campos del formulario de inscripción
            document.getElementById('codigoCurso').value = '';
            document.getElementById('nombreCurso').value = '';
            document.getElementById('semestre').value = '';
            document.getElementById('nota').value = '';

            cargarDatosHistorial(carnet);
        }
    } catch (error) {
        console.error("Error al agregar curso:", error);
    }
}

// Ordenar el historial por semestre
async function ordenarHistorial() {
    const carnet = document.getElementById('carnetHistorial').value;
    if (!carnet) return;

    try {
        const response = await fetch(`${API_URL}/${carnet}/historial/ordenar`, {
            method: 'POST'
        });
        if (response.ok) {
            cargarDatosHistorial(carnet);
        }
    } catch (error) {
        console.error("Error al ordenar historial:", error);
    }
}

// Carga inicial al abrir la página
document.addEventListener('DOMContentLoaded', obtenerEstudiantes);
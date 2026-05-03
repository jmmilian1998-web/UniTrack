const API_URL = 'http://localhost:3000/api/estudiantes';

async function obtenerEstudiantes() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error en servidor');
    return await response.json();
}

async function guardarEstudiante(estudiante) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estudiante)
    });
    return await response.json();
}

async function invertirLista() {
    const response = await fetch(`${API_URL}/invertir`, { method: 'POST' });
    return await response.json();
}
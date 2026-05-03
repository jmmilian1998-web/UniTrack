import express from 'express';
import cors from 'cors';
import estudianteRoutes from './routes/estudiante.routes';

const app = express();
const PORT = 3000;

// Middleware para permitir que el frontend se comunique con el backend
app.use(cors());
// Middleware para entender el formato JSON que enviamos desde el navegador
app.use(express.json());

// CONFIGURACIÓN DE RUTAS
// Todas las rutas de estudiantes empezarán con /api/estudiantes
app.use('/api/estudiantes', estudianteRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('Servidor de UniTrack funcionando con Lista Enlazada Simple');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
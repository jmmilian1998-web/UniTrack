import express from 'express';
import cors from 'cors';

// Importamos las rutas. 
// Nota: Si el archivo es .js, asegúrate de que la ruta sea exacta.
const estudianteRoutes = require('./routes/estudianteRoutes');

const app = express();

// --- Middlewares ---
// Permite la comunicación con el frontend (Angular/HTML)
app.use(cors());

// Permite recibir datos en formato JSON en los formularios
app.use(express.json());

// --- Rutas ---
// Definimos el prefijo /api/estudiantes para todas las operaciones
app.use('/api/estudiantes', estudianteRoutes);

// --- Configuración del Servidor ---
const PORT = 3000;

app.listen(PORT, () => {
    console.log('==============================================');
    console.log(`  Servidor UniTrack corriendo con éxito`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log('==============================================');
});
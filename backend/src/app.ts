import express from 'express';
import cors from 'cors';
import estudianteRoutes from './routes/estudiante.routes';

const app = express();

// 1. Esto permite que el HTML se conecte al servidor
app.use(cors());

// 2. Esto permite que el servidor entienda el JSON que envías
app.use(express.json());

// 3. Tus rutas
app.use('/api/estudiantes', estudianteRoutes);

export default app;
import express, { Application } from 'express';
import cors from 'cors';
import estudianteRoutes from './routes/estudiante.routes';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        // Habilita CORS para que el frontend (puerto 5500 u otro) pueda comunicarse con el backend
        this.app.use(cors());

        // Permite que el servidor entienda archivos JSON en el cuerpo de las peticiones
        this.app.use(express.json());

        // Permite procesar datos de formularios si fuera necesario
        this.app.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
        // Prefijo para todas las rutas de estudiantes
        // Esto significa que tus endpoints serán: http://localhost:3000/api/estudiantes
        this.app.use('/api/estudiantes', estudianteRoutes);
    }
}

export default new App().app;
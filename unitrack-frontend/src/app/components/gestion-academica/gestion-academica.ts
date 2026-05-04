import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-gestion-academica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-academica.html',
  styleUrl: './gestion-academica.css'
})
export class GestionAcademicaComponent implements OnInit {
  // Variables principales
  estudiantes: any[] = [];
  historial: any[] = [];
  carnetSeleccionado: string = '';

  // Modelo para el formulario de registro
  nuevoEstudiante = {
    carnet: '',
    nombres: '',
    apellidos: '',
    correo: ''
  };

  constructor(private api: EstudianteService) { }

  ngOnInit(): void {
    console.log('--- Componente GestionAcademica Iniciado ---');
    this.cargarEstudiantes();
  }

  // --- Módulo Estudiantes (Lista Simple) ---

  cargarEstudiantes(): void {
    console.log('Solicitando lista de estudiantes al backend...');
    this.api.getEstudiantes().subscribe({
      next: (data: any[]) => {
        this.estudiantes = data;
        console.log('Estudiantes cargados con éxito:', this.estudiantes);
      },
      error: (err: any) => {
        console.error('ERROR al conectar con la API de Estudiantes. ¿Está el backend encendido?:', err);
      }
    });
  }

  registrar(): void {
    if (!this.nuevoEstudiante.carnet) {
      console.warn('Intento de registro fallido: El campo Carnet está vacío.');
      return;
    }

    console.log('Enviando nuevo estudiante al backend:', this.nuevoEstudiante);
    this.api.registrarEstudiante(this.nuevoEstudiante).subscribe({
      next: (res: any) => {
        console.log('Registro exitoso en el servidor:', res);
        this.cargarEstudiantes(); // Recarga la lista simple
        this.nuevoEstudiante = { carnet: '', nombres: '', apellidos: '', correo: '' };
      },
      error: (err: any) => console.error('Error durante el registro:', err)
    });
  }

  invertir(): void {
    console.log('Solicitando inversión de la Lista Simple...');
    this.api.invertirLista().subscribe({
      next: () => {
        console.log('Lista invertida correctamente.');
        this.cargarEstudiantes();
      },
      error: (err: any) => console.error('Error al invertir lista:', err)
    });
  }

  // --- Módulo Historial (Lista Doble) ---

  verHistorial(carnet: string): void {
    this.carnetSeleccionado = carnet;
    console.log(`Buscando historial (Lista Doble) para el carnet: ${carnet}`);

    this.api.getHistorial(carnet).subscribe({
      next: (data: any[]) => {
        this.historial = data || [];
        console.log(`Datos del historial recibidos para ${carnet}:`, this.historial);

        if (this.historial.length === 0) {
          console.info('La API respondió, pero el historial de este estudiante está vacío.');
        }
      },
      error: (err: any) => {
        console.error(`ERROR al obtener el historial de ${carnet}:`, err);
        this.historial = [];
      }
    });
  }

  ordenarHistorial(): void {
    if (!this.carnetSeleccionado) return;

    console.log(`Aplicando ordenamiento a la Lista Doble del carnet: ${this.carnetSeleccionado}`);
    this.api.ordenarHistorial(this.carnetSeleccionado).subscribe({
      next: (data: any[]) => {
        this.historial = data;
        console.log('Historial ordenado recibido:', this.historial);
      },
      error: (err: any) => console.error('Error al ordenar el historial:', err)
    });
  }
}
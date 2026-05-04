import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// Si el archivo se llama gestion-academica.ts, usa esta ruta:
import { GestionAcademicaComponent } from './components/gestion-academica/gestion-academica';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GestionAcademicaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'unitrack-frontend';
}
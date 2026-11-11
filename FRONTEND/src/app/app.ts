import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicacionesService } from './publicaciones.service';
import { Publicacion } from './publicacion.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: { ngSkipHydration: 'true' }
})
 export class App implements OnInit {
  publicaciones: Publicacion[] = [];
  textoNuevo: string = '';
  imagenSeleccionada: File | null = null;
  cargando: boolean = false;

  constructor(private publicacionesService: PublicacionesService) {}

  ngOnInit(): void {
    this.cargarPublicaciones();
  }

  cargarPublicaciones(): void {
    this.publicacionesService.obtenerPublicaciones().subscribe({
      next: (data) => {
        this.publicaciones = data;
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
    }
  }

  crearPublicacion(): void {
    if (!this.textoNuevo.trim()) return;

    const formData = new FormData();
    formData.append('texto', this.textoNuevo);
    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.cargando = true;
    this.publicacionesService.crearPublicacion(formData).subscribe({
      next: (nuevaPub) => {
        this.publicaciones.unshift(nuevaPub);
        this.textoNuevo = '';
        this.imagenSeleccionada = null;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al crear publicación:', err);
        this.cargando = false;
      }
    });
  }

  eliminar(id?: string): void {
    if (!id) return;
    
    this.publicacionesService.eliminarPublicacion(id).subscribe({
      next: () => {
        this.publicaciones = this.publicaciones.filter(p => p._id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
      }
    });
  }
}
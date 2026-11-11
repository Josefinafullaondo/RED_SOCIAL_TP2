export interface Autor {
  _id: string;
  nombre?: string;
  apellido?: string;
  username: string;
  fotoPerfil?: string;
}

export interface Publicacion {
  _id?: string;
  texto: string;
  imagenUrl?: string;
  autor: Autor;
  createdAt?: string;
}
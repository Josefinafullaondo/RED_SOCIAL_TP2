# Red Social - Backend (Trabajo Práctico UTN)

Backend desarrollado en NestJS y TypeScript para el trabajo práctico de programación, implementando una arquitectura modular, autenticación basada en cookies HTTP-only, procesamiento de imágenes en memoria con Sharp y almacenamiento en Cloudinary, junto con persistencia en MongoDB.

---

## Tecnologías y Dependencias Principales

* **Framework:** NestJS (TypeScript)
* **Base de Datos:** MongoDB con Mongoose (`@nestjs/mongoose`)
* **Autenticación:** Passport.js (`passport-jwt`), JSON Web Tokens (JWT) y manejo de sesiones mediante Cookies HTTP-only.
* **Procesamiento de Imágenes:** `sharp` (optimización y conversión a WebP en memoria)
* **Almacenamiento Cloud:** Cloudinary API (`cloudinary`)

---

## Arquitectura del Proyecto (Módulos)

El proyecto está estructurado de manera modular para garantizar escalabilidad y separación de responsabilidades:

1. **Usuarios (`/src/usuarios`)**: 
   * Gestión de registros, perfiles y esquemas de usuarios.
   * Sistema de control de sesiones y revocación de tokens para logout real.
2. **Imágenes (`/src/imagenes`)**: 
   * Servicio centralizado para procesar imágenes con `sharp` (redimensionamiento y compresión en memoria sin almacenamiento temporal en disco) y subida automática a Cloudinary.
3. **Publicaciones (`/src/publicaciones`)**: 
   * CRUD completo de publicaciones con soporte de archivos multimedia.
   * Relación directa con el esquema de usuarios (`autor`).
   * Eliminación sincronizada (al borrar la publicación del sistema, se elimina automáticamente la imagen correspondiente en Cloudinary).

---

## Endpoints Principales (Sprint 2)

### Publicaciones (`/publicaciones`)
* **`POST /publicaciones`** *(Protegido)*: Crea una nueva publicación. Permite adjuntar texto y una imagen (campo `imagen` mediante `Multipart Form-data`). Valida la autenticación del usuario mediante cookies.
* **`GET /publicaciones`** *(Público)*: Obtiene el listado completo de publicaciones ordenadas cronológicamente de más nueva a más vieja, populando los datos del autor (`nombre`, `apellido`, `username`, `fotoPerfil`).
* **`DELETE /publicaciones/:id`** *(Protegido)*: Elimina una publicación por su ID, removiendo tanto el registro en MongoDB como la imagen asociada en Cloudinary.

---

## Deploy y Credenciales de Evaluación

Para facilitar la corrección y pruebas de los endpoints protegidos en el entorno de producción, se dispone de las siguientes credenciales de prueba:

* **URL de Deploy:** `https://tu-backend-en-render.onrender.com` *(reemplazar con la URL real)*
* **Usuario Administrador / Prueba:**
  * **Email:** `admin.test@redsocial.com`
  * **Contraseña:** `Password123*`

*(Nota: Al iniciar sesión mediante el endpoint correspondiente, el sistema asignará la cookie de sesión HTTP-only necesaria para probar la creación y eliminación de publicaciones).*

---

## Instalación y Ejecución Local (Desarrollo)

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
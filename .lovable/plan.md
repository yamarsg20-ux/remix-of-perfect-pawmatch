

# 🐾 Sistema de Evaluación de Compatibilidad para Adopción de Mascotas — MVP

## Visión General
Una plataforma web en español con diseño cálido y amigable que conecta adoptantes responsables con mascotas disponibles en refugios, a través de cuestionarios inteligentes de compatibilidad y un catálogo de mascotas con perfiles detallados.

---

## 🔐 1. Autenticación y Roles de Usuario
- Registro e inicio de sesión con **email/contraseña, Google y Facebook**
- Tres roles: **Adoptante**, **Personal de refugio** y **Administrador**
- Cada rol accede a su propio panel tras iniciar sesión
- Perfil de usuario con datos básicos (nombre, foto, contacto)

## 📋 2. Cuestionario de Compatibilidad (Adoptantes)
- Cuestionario interactivo paso a paso que evalúa:
  - **Estilo de vida** (horarios, actividad física, viajes)
  - **Vivienda** (tipo, tamaño, espacio exterior, mascotas actuales)
  - **Tiempo disponible** para cuidado y atención
  - **Experiencia previa** con mascotas
  - **Capacidad financiera** (disposición para gastos veterinarios, alimentación)
- Al completarlo se genera un **perfil de adoptante** con puntaje de compatibilidad
- El adoptante puede ver su perfil y repetir el cuestionario si sus circunstancias cambian

## 🐶 3. Catálogo de Mascotas y Perfiles
- **Panel del refugio** para registrar mascotas con:
  - Fotos, nombre, especie, raza, edad, tamaño, temperamento
  - Necesidades especiales (médicas, de espacio, de compañía)
  - Estado de adopción (disponible, en proceso, adoptado)
- **Catálogo público** con filtros (especie, tamaño, edad, ubicación)
- Cada mascota tiene un perfil detallado visible para adoptantes

## 💡 4. Sistema de Matching (Compatibilidad)
- Algoritmo que cruza el perfil del adoptante con los perfiles de mascotas
- Muestra un **porcentaje de compatibilidad** entre adoptante y cada mascota
- Los adoptantes ven una lista de mascotas recomendadas ordenadas por compatibilidad
- El adoptante puede expresar interés en una mascota, lo cual genera una solicitud visible para el refugio

## 🏠 5. Panel de Administración del Refugio
- Dashboard con estadísticas (mascotas disponibles, solicitudes pendientes, adopciones completadas)
- Gestión de mascotas (agregar, editar, cambiar estado)
- Revisión de solicitudes de adopción con perfil del adoptante y puntaje de compatibilidad
- Aprobar o rechazar solicitudes

## 👑 6. Panel de Administrador de Plataforma
- Vista general de todos los refugios y usuarios registrados
- Gestión de usuarios y roles
- Estadísticas generales de la plataforma

## 🎨 7. Diseño e Interfaz
- Paleta cálida con tonos suaves (cremas, verdes menta, naranjas suaves)
- Bordes redondeados, iconografía amigable con temática de mascotas
- Interfaz completamente en **español**
- Diseño responsive (móvil y escritorio)
- Navegación clara con sidebar o barra superior según el rol del usuario

## 🗄️ 8. Backend (Supabase)
- Base de datos con tablas para: perfiles de usuario, roles, mascotas, cuestionarios, respuestas, solicitudes de adopción
- Seguridad con Row Level Security (RLS) por rol
- Almacenamiento de imágenes de mascotas
- Autenticación con proveedores OAuth (Google, Facebook)

---

## Funcionalidades para fases futuras
Estas se agregarán después del MVP:
- Agendamiento de visitas al refugio
- Contratos digitales con firma electrónica
- Historial médico digital de mascotas
- Simulador de gastos financieros
- Integración con Google Calendar
- Verificación de identidad
- Foro comunitario
- Notificaciones por email


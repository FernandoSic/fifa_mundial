# Descripcion
Aplicacion web de generacion de grupos participantes de mundial de futbol, con validaciones para asegurar que los grupos se formen de manera correcta y cumpliendo con los requisitos establecidos.

# Requerimientos funcionales
## 1. Gestion de equipos
- Crear equipos
- Editar equipos
- Eliminar equipos
- Listar equipos

## 2. Gestion de grupos
- Crear grupos
- Editar grupos
- Eliminar grupos
- Listar grupos

# Modelos de la base de datos

## Equipo

- `id`: Int, clave primaria, autoincremental
- `nombre`: String, unico
- `codigo_FIFA`: String, unico
- `nombre_tecnico`: String
- `cantidad_jugadores`: Int
- `ranking_fifa`: Int
- `fechaCreacion`: DateTime, valor por defecto `now()`
- `grupoId`: Int, opcional, clave foranea hacia `Grupo.id`

## Grupo

- `id`: Int, clave primaria, autoincremental
- `nombre`: String, unico
- `description`: String, opcional
- `fechaCreacion`: DateTime, valor por defecto `now()`
- `equipos`: relacion uno a muchos con `Equipo`

## Relaciones
- Un `Equipo` pertenece a un `Grupo`
- Un `Grupo` tiene muchos `Equipos`

# Validaciones
## Equipos
- El pais no debe estar repetido
- El codigo FIFA no debe estar repetido
- El codigo FIFA debe tener exactamente 3 caracteres
- El ranking FIFA debe ser un numero entero positivo
- La cantidad de jugadores debe ser un numero entero positivo
- La cantidad de jugadores debe ser de minimo 23 y maximo 26
- El equipo al crearse debe tener un grupo vacio, ya que este se asigna y agrega al generar los grupos


# Reglas de formacion de grupos
## Frontend
- Una pagina solamente
- Listar los equipos registrados
- Listar los grupos registrados, si ya hay grupos formados
- Campo donde se ingrese la cantidad de grupos que se quieren formar
- Boton para generar los grupos aleatoriamente, cumpliendo con las validaciones establecidas
- Mostrar vista previa de los grupos formados antes de confirmarlos
- Un boton de guardar para confirmar la formacion de los grupos
- Un boton de volver a generar los grupos en caso de no estar satisfecho con la formacion previa
- Formulario para crear nuevos equipos, con las validaciones establecidas
- Formulario para editar equipos existentes, con las validaciones establecidas
- Boton para eliminar equipos existentes, con una confirmacion previa

## Backend 
- La cantidad de grupos debe ser mayor a 1
- El sistema debe de tomas la cantidad de equipos y validar si se pueden formar la cantidad de grupos solicitados, cumpliendo con las validaciones establecidas
- Todos los grupos deben formarse con la msima cantidad de equipos, sin escepcion
- No deben quedar equipos sin asignar a un grupo
- No se pueden repetir equipos en los grupos ni en otro grupo
- La formacion de los grupos debe ser aleatoria, cumpliendo con las validaciones
- validacion matematica: si la cantidad de equipos dividido la cantidad de grupos no da un numero entero, entonces no se pueden formar los grupos solicitados
### Acquitectura del backend
- Controller: responsable de manejar las peticiones y respuesta
- Routes: responsable de manejar los endpoints
- Services: responsable de manejar la logica de negocios
- Validatios: responsable de validar el cumplimiento de las condiciones de cada entidad

## Guardado de distribucion de grupos
- Luego de la vista previa, el usuario debe confirmar la formacion de los grupos para que se guarden en la base de datos
- La distrubicion guardada debe poder consultarse posteriormente, mostrando los grupos formados y los equipos asignados a cada grupo
- No se debe guardar una distribicion de grupos que no cumpla con las validaciones establecidas

# Requerimientos tecnicos
- Frontend Funcional con React, Vite y Tailwind CSS
- Backend con Node.js, Express y Prisma ORM
- Persistencia de datos relacional con Base de datos PostgreSQL
- Uso de CORS para permitir la comunicacion entre el frontend y el backend
- Diseño responsive basico
- Validaciones en Frontend
- Validaciones en Backend
- Manejo de errores
- Codigo claro y organizado

# Consideraciones adicionales
- Despliegue en la nube (opcional) y bonus





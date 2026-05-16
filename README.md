# FIFA Mundial - Generador de Grupos

> Aplicacion web para la generacion de grupos de equipos participantes del Mundial de Futbol.

## Enlaces

- **Repositorio:** [URL del repo]
- **Frontend:** [URL del deploy frontend]
- **Backend:** [URL del deploy backend]

---

## Descripcion

Sistema que permite registrar equipos de futbol, validar sus datos (codigo FIFA, ranking, cantidad de jugadores) y generar grupos de forma aleatoria para un torneo mundialista. Los grupos se forman garantizando distribucion equitativa, sin repeticiones y validando las reglas establecidas.

## Tecnologias

### Frontend
- React 19 + Vite
- Tailwind CSS v4
- Axios

### Backend
- Node.js + Express
- Prisma ORM 7.8.0
- PostgreSQL

## Funcionalidades

- CRUD de equipos con validaciones
- CRUD de grupos
- Generacion aleatoria de grupos con reglas:
  - Division exacta de equipos
  - Misma cantidad por grupo
  - Sin repeticiones
  - Vista previa antes de guardar
- Confirmacion de distribucion con persistencia en BD

## Requisitos

- Node.js >= 18
- PostgreSQL

## Instalacion y ejecucion

### Backend (Prisma 7.8.0)

```bash
cd backend
npm install

# Configurar variables de entorno en .env:
#   DATABASE_URL=postgresql://usuario:password@localhost:5432/fifa_mundial
#   PORT=3000

# Generar el cliente Prisma
npm run generate

# Ejecutar migraciones
npm run migrate

# Iniciar servidor
npm run dev
```

### Frontend

```bash
cd frontend
npm install

# Configurar variables de entorno en .env:
#   VITE_API_URL=http://localhost:3000

npm run dev
```

### Notas sobre Prisma 7

- La configuracion de la base de datos esta en `backend/prisma.config.ts`, no en `schema.prisma`
- Requiere `typescript` y `tsx` para procesar `prisma.config.ts`
- El cliente Prisma se genera en `backend/generated/prisma/` (ruta custom)
- Para explorar la base de datos: `npm run studio`

## Estructura del proyecto

```
fifa-mundial/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma    # Modelos de datos
│   │   └── migrations/      # Migraciones SQL
│   ├── prisma.config.ts     # Configuracion Prisma 7
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.js    # Cliente Prisma
│   │   ├── controllers/     # Manejadores de peticiones
│   │   ├── routes/          # Definicion de endpoints
│   │   ├── services/        # Logica de negocio
│   │   └── validations/     # Validaciones
│   ├── server.js            # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── EquipoForm.jsx
│   │   │   ├── EquipoList.jsx
│   │   │   ├── GrupoPanel.jsx
│   │   │   └── GrupoList.jsx
│   │   ├── api.js           # Configuracion Axios
│   │   ├── App.jsx           # Pagina principal
│   │   ├── index.css         # Estilos + tokens Tailwind
│   │   └── main.jsx          # Entry point
│   ├── .env                  # VITE_API_URL
│   └── package.json
├── .gitignore
└── README.md
```

## Despliegue

Monorepo con frontend y backend en un solo repositorio. El frontend se despliega desde `frontend/` y el backend desde `backend/`. Compatible con Render, Railway o Vercel + Render.

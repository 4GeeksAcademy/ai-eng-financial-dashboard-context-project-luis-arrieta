# Technology Stack

Actualizado: 2026-09-16.

## Frontend

- Lenguaje: TypeScript.
- Framework y runtime: React 19 y Vite.
- Estilos: Tailwind CSS.
- Visualizacion: Recharts.
- Iconos: Lucide React.
- Testing: Vitest.
- Calidad: ESLint y TypeScript build (`tsc -b`).
- Evidencia: `frontend/package.json`.

## Backend

- Lenguaje: Python.
- Framework: FastAPI.
- Modelos y validacion: Pydantic.
- Servidor: Uvicorn.
- Depuracion local: debugpy.
- Testing: pytest y pytest-cov.
- Evidencia: `backend/requirements.txt`, `backend/app/main.py` y `backend/Dockerfile`.

## Infraestructura y ejecucion

- Docker Compose inicia los servicios `frontend` y `backend`.
- El frontend publica el puerto 5173; el backend publica 8000 y 5678.
- En Docker Compose, `VITE_API_PROXY_TARGET` dirige el proxy de Vite a `host.docker.internal:8000`; `extra_hosts` resuelve ese alias mediante `host-gateway`.
- Los contextos de build son `frontend/` y `backend/` y tienen exclusiones propias en `.dockerignore`.
- Comandos: `docker compose up --build`, `npm test`, `npm run build`, `npm run lint` y `pytest -q`.
- Evidencia: `docker-compose.yml`, Dockerfiles, `.dockerignore` y `frontend/package.json`.
# Validation Record

Actualizado: 2026-09-16.

## Comandos del proyecto

```bash
cd frontend && npm test -- --run
cd frontend && npm run build
cd frontend && npm run lint
cd backend && pytest -q
docker compose up --build
```

## Ultima validacion verificada

- Frontend tests: 6 pruebas correctas.
- Frontend build: correcto.
- Frontend lint: correcto.
- Backend tests: 15 pruebas correctas.
- Docker Compose: frontend y backend construyeron y arrancaron correctamente.
- Integracion HTTP: `/health`, `/api/metrics`, `/docs` y `http://localhost:5173/` respondieron con exito.
- La Fase 3 valido `docker compose build` despues de anadir exclusiones de contexto para frontend y backend.
- La integracion Docker valida `http://localhost:5173/api/metrics` a traves del proxy de Vite con respuesta HTTP 200.

## Comprobaciones obligatorias antes de cerrar un cambio

1. Ejecutar `git status` antes de editar y al terminar.
2. Ejecutar el test mas especifico disponible y despues los checks de la capa afectada.
3. Si cambia API o calculos compartidos, ejecutar tests de frontend y backend, build y lint del frontend.
4. Revisar `git diff --check` y confirmar que no hay secretos ni archivos generados innecesarios.
5. Tras cada cambio de codigo, validar, crear commit y hacer push a la rama de trabajo.

## Avisos conocidos

- El build de Vite informa que el bundle JavaScript supera 500 kB; no bloquea la compilacion.
- Pytest emite una advertencia de deprecacion de Starlette TestClient con `httpx`; los tests siguen pasando.
- La verificacion de handover, hallazgos y prueba de reglas esta registrada en `verification.md`.
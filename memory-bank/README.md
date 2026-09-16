# Memory Bank

Este directorio conserva hechos operativos verificados que ayudan a otro agente a retomar el proyecto sin repetir exploraciones amplias.

## Fuente de verdad

- Contexto de entrega: `financial-dashboard.md`.
- Requisitos y flujo de trabajo: `AGENTS.md`, `.agents/rules/` y `.agents/skills/`.
- Implementacion y contratos: codigo actual, tests y esquema OpenAPI de FastAPI.
- Reglas y procedimientos reutilizables: `.agents/rules/` y `.agents/skills/`.

No inferir campos de API, funcionalidades de producto ni roadmaps. Si una nota contradice el codigo, actualizar o eliminar la nota y priorizar el codigo, los tests y OpenAPI.

## Notas

- `product-overview.md`: comportamiento visible y flujo de datos comprobados.
- `stack.md`: lenguajes, frameworks, tooling, infraestructura y comandos reales.
- `project-state.md`: funcionalidades comprobadas, gaps y decisiones vigentes.
- `api-contract.md`: endpoints, modelos y parametros confirmados en `backend/app/routes.py` y OpenAPI.
- `validation.md`: comandos y resultados de validacion conocidos.

## Mantenimiento

- Actualizar la nota afectada junto con cambios de arquitectura, contrato, formulas o validacion.
- Mantener las notas concisas, trazables a archivos reales y libres de secretos.
- Eliminar hechos obsoletos en lugar de conservar historiales extensos.
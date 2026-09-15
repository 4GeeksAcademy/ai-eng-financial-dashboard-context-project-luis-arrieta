# Instrucciones para el agente — Financial Dashboard

## 1. Contexto del encargo

Estás trabajando en el proyecto de 4Geeks Academy:

- **Cohorte:** Working with AI coding agents — versión 3
- **Cohorte ID:** `1810`
- **Proyecto:** Enhacing development with agent skills - Financial dashboard
- **Tarea:** `987598`
- **Slug:** `company-financial-dashboard-skills-project`
- **Repositorio:** `https://github.com/4GeeksAcademy/ai-eng-financial-dashboard-context-project-luis-arrieta.git`

Lee primero estos archivos antes de modificar nada:

1. `AGENTS.md`
2. `CONTEXTO_PROYECTO_DASHBOARD_FINANCIERO.md`
3. `README.md` y `README.es.md`
4. Las reglas disponibles en `.agents/rules/`, si existen
5. Las skills disponibles en `.agents/skills/`, si existen
6. Los archivos de `memory-bank/`, si existe ese directorio

El contexto de `CONTEXTO_PROYECTO_DASHBOARD_FINANCIERO.md` es la referencia funcional principal, pero debes comprobar siempre el estado real del código antes de confiar en él.

---

## 2. Objetivo principal

El objetivo no es rehacer el dashboard desde cero.

Debes preparar el repositorio para que un agente de coding pueda entender, modificar y validar el dashboard financiero de forma consistente. La entrega debe demostrar que existe un contexto reutilizable y operativo, compuesto por:

- reglas específicas del proyecto;
- documentación de arquitectura y dominio;
- skills reutilizables para agentes;
- memoria de trabajo cuando sea necesaria;
- un flujo de validación reproducible.

La estructura esperada es:

```text
.agents/
├── rules/
│   └── <regla>.md
└── skills/
    └── <skill>/
        └── SKILL.md
```

---

## 3. Estado técnico del proyecto

### Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Recharts, Lucide React.
- Testing frontend: Vitest.
- Backend: Python, FastAPI, Pydantic.
- Testing backend: pytest.
- Ejecución local: Docker Compose.

### Comandos principales

Desde `frontend/`:

```bash
npm run test
npm run build
npm run lint
```

Desde `backend/`, con las dependencias instaladas:

```bash
pytest -q
```

Para ejecutar la aplicación completa:

```bash
docker compose up --build
```

URLs locales:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Documentación API: `http://localhost:8000/docs`

---

## 4. Arquitectura funcional

El flujo actual es:

```text
React App
  → GET /api/metrics
  → FastAPI
  → generación de movimientos mock deterministas
  → filtros y agregaciones
  → respuesta JSON
  → KPIs y gráficos en React
```

Archivos importantes del frontend:

- `frontend/src/App.tsx`
- `frontend/src/index.css`
- `frontend/src/lib/financial-types.ts`
- `frontend/src/lib/financial-utils.ts`
- `frontend/src/lib/mock-data.ts`
- `frontend/src/components/dashboard/`

Archivos importantes del backend:

- `backend/app/main.py`
- `backend/app/routes.py`
- `backend/tests/`

La fuente actual de datos es simulada. No existe una integración con una base de datos ni con servicios financieros reales.

---

## 5. Dominio financiero

### Tipos de operación

- `income`: ingreso.
- `outcome`: gasto o salida.

Los importes de los movimientos son positivos. El tipo de operación determina si el importe suma o resta.

### Categorías válidas

- `sales`
- `suppliers`
- `operational`
- `administrative`
- `others`

### Tipos de negocio

- `B2B`
- `B2C`

### Fórmulas obligatorias

```text
Total Income = suma de amounts donde operation_type = income
Total Outcome = suma de amounts donde operation_type = outcome
Profit / Net = Total Income - Total Outcome
Profit Margin = Profit / Total Income * 100
```

Si no hay ingresos, el margen debe ser `0`. Nunca deben aparecer `NaN` ni `Infinity` en la interfaz.

No cambies la semántica de estas fórmulas sin actualizar los tests y la documentación correspondiente.

---

## 6. Contrato de API que debes preservar

Salvo que la tarea lo requiera explícitamente, conserva los endpoints y sus contratos actuales:

- `GET /health`
- `GET /api/metrics`
- `GET /api/metrics/facets`
- `GET /api/metrics/summary`
- `GET /api/metrics/categories/top`
- `GET /api/metrics/comparison`
- `GET /api/metrics/alerts`
- `GET /api/metrics/b2b`
- `GET /api/metrics/b2c`

Reglas del contrato:

- Los filtros de fechas son inclusivos.
- Los valores de `operation_type`, `category` y `business_type` deben ser válidos.
- La generación mock debe seguir siendo reproducible mediante `seed=42`.
- Los modelos Pydantic existentes deben reutilizarse.
- Los cambios de API deben incluir tests y documentación.

---

## 7. Entregables obligatorios

Crea o completa documentación específica dentro de `.agents/`.

### Reglas recomendadas

```text
.agents/rules/
├── project-architecture.md
├── financial-domain.md
├── coding-conventions.md
└── validation-workflow.md
```

Estas reglas deben explicar, como mínimo:

- arquitectura y flujo de datos;
- ubicación de cada responsabilidad;
- dominio financiero y fórmulas;
- convenciones de TypeScript y Python;
- uso de tipos y modelos existentes;
- tratamiento de fechas, importes y datos vacíos;
- proceso de tests, lint y build;
- requisitos de seguridad y configuración.

### Skills recomendadas

Crea skills específicas del proyecto, no instrucciones genéricas. Como mínimo, considera:

```text
.agents/skills/
├── add-financial-metric/SKILL.md
├── extend-financial-api/SKILL.md
└── validate-financial-dashboard/SKILL.md
```

Cada `SKILL.md` debe indicar:

- cuándo usar la skill;
- qué archivos inspeccionar;
- pasos concretos de ejecución;
- restricciones del dominio;
- cómo validar el resultado;
- errores comunes que se deben evitar.

Las skills deben ser prácticas y reutilizables por otro agente.

---

## 8. Flujo de trabajo obligatorio

Antes de editar:

1. Ejecuta `git status`.
2. Inspecciona la estructura actual del repositorio.
3. Lee las reglas y skills existentes.
4. Identifica los archivos afectados.
5. Comprueba los tests relacionados.
6. No sobrescribas trabajo existente sin entenderlo.

Durante la implementación:

1. Haz cambios pequeños y coherentes.
2. Evita duplicar lógica financiera.
3. Mantén separadas la API, la lógica de cálculo y la presentación.
4. No introduzcas dependencias innecesarias.
5. No añadas secretos, tokens ni archivos `.env` reales.
6. Actualiza la documentación cuando cambie el comportamiento.
7. Añade o actualiza tests para cada comportamiento nuevo.

Al finalizar:

1. Ejecuta los tests del frontend.
2. Ejecuta el build del frontend.
3. Ejecuta el lint del frontend.
4. Ejecuta los tests del backend si las dependencias están disponibles.
5. Revisa el diff completo.
6. Comprueba que no hay secretos ni archivos generados innecesarios.
7. Ejecuta `git status` y resume exactamente qué cambió.

---

## 9. Criterios de calidad

La entrega se considera correcta cuando:

- otro agente puede entender el proyecto leyendo primero las reglas y skills;
- las instrucciones apuntan a archivos reales del repositorio;
- las fórmulas y conceptos financieros están definidos sin ambigüedad;
- se preservan los contratos existentes de la API;
- las skills incluyen pasos accionables y verificables;
- los comandos de validación funcionan o se documenta claramente cualquier bloqueo;
- el frontend mantiene loading, errores y accesibilidad básica;
- los tests, lint y build pasan cuando el entorno lo permite;
- el diff no contiene secretos, cambios ajenos ni archivos innecesarios.

No marques la tarea como terminada solo porque los archivos Markdown existan: verifica que sean coherentes con el código real y que un agente pueda utilizarlos sin tener que adivinar.

---

## 10. Formato del informe final

Cuando termines, informa de forma breve:

1. Archivos creados o modificados.
2. Qué reglas y skills se añadieron.
3. Comandos de validación ejecutados.
4. Resultado de cada validación.
5. Bloqueos o decisiones pendientes.
6. Estado final de `git status`.

No entregues cambios incompletos ni ocultes validaciones fallidas.

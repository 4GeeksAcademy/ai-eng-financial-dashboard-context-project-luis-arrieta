# Contexto del proyecto: Financial Metrics Dashboard

## Propósito de este documento

Este documento sirve como contexto inicial para un agente de coding que trabajará sobre el proyecto de 4Geeks:

- **Repositorio:** https://github.com/4GeeksAcademy/ai-eng-financial-dashboard-context-project-luis-arrieta.git
- **Cohorte:** Working with AI coding agents — versión 3
- **ID de cohorte:** `1810`
- **Proyecto asignado:** Enhacing development with agent skills - Financial dashboard
- **Slug de la tarea:** `company-financial-dashboard-skills-project`
- **ID de tarea:** `987598`

El objetivo principal no es rehacer el dashboard desde cero. El objetivo es **construir contexto reutilizable y skills para que un agente pueda entender, modificar y validar este proyecto de forma consistente**.

> Importante: este archivo describe el estado observado del repositorio. Antes de modificar código, el agente debe volver a inspeccionar el estado actual de Git y los archivos del proyecto, porque el repositorio puede haber cambiado desde la elaboración de este documento.

---

## 1. Objetivo de la entrega

La entrega debe demostrar que el proyecto tiene suficiente contexto operativo para que un agente pueda:

1. Entender la arquitectura sin explorar todo el repositorio desde cero.
2. Comprender el dominio financiero y sus reglas básicas.
3. Localizar rápidamente los archivos relevantes para cada tipo de cambio.
4. Añadir o modificar métricas, filtros, endpoints y visualizaciones sin romper contratos existentes.
5. Seguir un flujo de validación reproducible.
6. Trabajar con skills específicas del proyecto, no con instrucciones genéricas.

El resultado esperado es una combinación de:

- reglas del proyecto;
- documentación de arquitectura y dominio;
- skills reutilizables para agentes;
- memoria o contexto de trabajo cuando sea necesario;
- validación mediante tests, lint y build.

La estructura indicada por el propio repositorio es:

```text
.agents/
├── rules/
│   └── <rule-name>.md
└── skills/
    └── <skill-name>/
        └── SKILL.md
```

---

## 2. Estado inicial del repositorio

En la auditoría inicial:

- La rama era `main`.
- El repositorio estaba limpio.
- El último commit observado era `954f812`.
- No existían todavía `.agents/rules` ni `.agents/skills`.
- No existía un directorio `memory-bank`.
- No se debe asumir que el repositorio continúa exactamente en ese estado: verificar siempre antes de trabajar.

### Archivos principales

```text
AGENTS.md
README.md
README.es.md
docker-compose.yml
backend/
├── Dockerfile
├── requirements.txt
├── app/
│   ├── main.py
│   └── routes.py
└── tests/
    ├── conftest.py
    └── test_routes.py
frontend/
├── Dockerfile
├── package.json
├── package-lock.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   └── ui/
│   ├── lib/
│   │   ├── financial-types.ts
│   │   ├── financial-utils.ts
│   │   ├── financial-utils.test.ts
│   │   ├── mock-data.ts
│   │   └── utils.ts
│   └── assets/
└── public/
```

---

## 3. Stack y ejecución

### Frontend

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- Recharts
- Lucide React
- Vitest
- ESLint

Scripts definidos en `frontend/package.json`:

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:watch
npm run test:coverage
npm run preview
```

### Backend

- Python
- FastAPI
- Pydantic
- pytest configurado en el proyecto

Dependencias declaradas en `backend/requirements.txt`.

### Docker

El proyecto se ejecuta con:

```bash
docker compose up --build
```

Servicios:

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Documentación FastAPI: http://localhost:8000/docs

El frontend usa un proxy de Vite para reenviar `/api` al backend durante el desarrollo local.

Configuración del proxy en `frontend/vite.config.ts`:

```text
/api -> http://backend:8000
```

Para usar otro backend se puede copiar `frontend/.env.example` y definir:

```bash
VITE_API_BASE_URL=
```

No introducir secretos en el repositorio. Los archivos `.env` están excluidos por `.gitignore`.

---

## 4. Arquitectura actual

### Flujo general

```text
React App
   |
   | GET /api/metrics
   v
FastAPI router
   |
   | generate_mock_movements(seed=42)
   v
Movimientos financieros simulados
   |
   v
Filtros y cálculos
   |
   v
Respuesta JSON
   |
   v
KPIs y gráficos en React
```

### Frontend actual

`frontend/src/App.tsx`:

1. Hace una petición a `GET /api/metrics`.
2. Guarda los movimientos recibidos.
3. Calcula los KPIs con `computeKPIs`.
4. Agrupa los datos mensualmente con `computeMonthlyData`.
5. Renderiza:
   - `DashboardHeader`;
   - `KPIRow`;
   - `IncomeOutcomeChart`;
   - `ProfitPercentChart`.

Componentes relevantes:

- `frontend/src/components/dashboard/dashboard-header.tsx`
- `frontend/src/components/dashboard/kpi-card.tsx`
- `frontend/src/components/dashboard/kpi-row.tsx`
- `frontend/src/components/dashboard/income-outcome-chart.tsx`
- `frontend/src/components/dashboard/profit-percent-chart.tsx`

Tipos principales:

`frontend/src/lib/financial-types.ts` define:

```ts
export type OperationType = 'income' | 'outcome'
export type Category =
  | 'suppliers'
  | 'sales'
  | 'operational'
  | 'administrative'
  | 'others'
export type BusinessType = 'B2B' | 'B2C'
```

Y el movimiento:

```ts
interface FinancialMovement {
  create_date: string
  amount: number
  operation_type: OperationType
  category: Category
  business_type: BusinessType
}
```

### Backend actual

`backend/app/main.py`:

- crea la aplicación FastAPI;
- habilita CORS;
- incluye el router de `backend/app/routes.py`.

`backend/app/routes.py` contiene:

- modelos Pydantic;
- generación de datos mock;
- filtrado;
- agregaciones;
- comparación de períodos;
- detección de anomalías;
- endpoints HTTP.

La fuente actual de datos es simulada. No existe base de datos ni integración con datos financieros reales.

---

## 5. Dominio financiero

### Tipos de operación

- `income`: ingreso.
- `outcome`: gasto o salida.

### Categorías válidas

- `sales`: ventas. Es la categoría normal para ingresos.
- `suppliers`: proveedores.
- `operational`: gastos operativos.
- `administrative`: gastos administrativos.
- `others`: otros.

### Tipos de negocio

- `B2B`
- `B2C`

### Fórmulas

Para una colección de movimientos:

```text
Total Income = suma de amounts donde operation_type = income
Total Outcome = suma de amounts donde operation_type = outcome
Profit = Total Income - Total Outcome
Profit Margin = Profit / Total Income * 100
```

Si no hay ingresos, `Profit Margin` debe ser `0` para evitar división por cero.

En el backend, los importes se expresan como números `float`. En una aplicación financiera real habría que considerar `Decimal` o una estrategia explícita de precisión monetaria, pero no cambiar esto sin justificarlo y actualizar tests y documentación.

### Datos mock

El backend genera 360 movimientos, aproximadamente 30 por mes, usando `seed=42` para que los resultados sean reproducibles.

El frontend también contiene `frontend/src/lib/mock-data.ts`, con un conjunto de datos estático de 2024. En la implementación actual parece ser código heredado o no utilizado por `App.tsx`. No eliminarlo ni modificarlo automáticamente: primero confirmar si alguna ruta o test lo necesita.

---

## 6. Contrato actual de la API

### `GET /health`

Devuelve:

```json
{"status": "ok"}
```

### `GET /api/metrics`

Devuelve una lista de `FinancialMovement`.

Query params opcionales:

- `start_date`
- `end_date`
- `category`
- `operation_type`

El rango de fechas es inclusivo.

### `GET /api/metrics/facets`

Devuelve las opciones disponibles para filtros:

- `operation_types`
- `business_types`
- `categories`
- `min_date`
- `max_date`

### `GET /api/metrics/summary`

Devuelve resúmenes con:

```json
{
  "period": "2025-01",
  "income": 0,
  "outcome": 0,
  "net": 0
}
```

Query params:

- `group_by`: `day`, `week` o `month`;
- `start_date`;
- `end_date`;
- `category`;
- `operation_type`;
- `business_type`: `B2B` o `B2C`.

### `GET /api/metrics/categories/top`

Devuelve las categorías con mayor importe.

Query params:

- `operation_type`: por defecto `outcome`;
- `limit`: entre 1 y 20;
- `start_date`;
- `end_date`;
- `business_type`.

### `GET /api/metrics/comparison`

Requiere:

- `start_date`;
- `end_date`.

Opcional:

- `business_type`.

Compara el neto del período actual con el período anterior de la misma duración y devuelve:

```json
{
  "current_period": 0,
  "previous_period": 0,
  "delta_abs": 0,
  "delta_pct": 0
}
```

`delta_pct` puede ser `null` cuando el período anterior tiene valor cero.

### `GET /api/metrics/alerts`

Detecta períodos en los que los gastos superan el promedio histórico por encima de un umbral.

Query params:

- `threshold`, por defecto `0.3`;
- `group_by`: `day`, `week` o `month`;
- `start_date`;
- `end_date`;
- `business_type`.

### `GET /api/metrics/b2b`

Devuelve movimientos filtrados a `business_type = B2B`.

Acepta filtros de fecha, categoría y operación.

### `GET /api/metrics/b2c`

Devuelve movimientos filtrados a `business_type = B2C`.

Acepta filtros de fecha, categoría y operación.

---

## 7. Reglas que el agente debe respetar

### Antes de actuar

1. Leer `AGENTS.md`.
2. Revisar `.agents/rules/` si existe.
3. Revisar `.agents/skills/` si existe.
4. Revisar `memory-bank/` si existe.
5. Ejecutar `git status`.
6. Inspeccionar los archivos afectados y sus tests.
7. No asumir que la documentación está más actualizada que el código.

### Cambios de backend

- Mantener los contratos existentes salvo que el cambio sea explícito.
- Reutilizar los modelos Pydantic existentes.
- Mantener filtros inclusivos en fechas.
- Mantener valores válidos de `OperationType`, `Category` y `BusinessType`.
- Añadir tests para cualquier endpoint, filtro o cálculo nuevo.
- Mantener la generación determinista de datos mientras el backend siga usando mock data.
- No introducir llamadas a servicios externos sin autorización y documentación.

### Cambios de frontend

- Reutilizar los tipos de `financial-types.ts`.
- Mantener la separación entre obtención de datos, cálculos y presentación.
- Mantener estados de loading y error.
- Evitar duplicar lógica financiera dentro de los componentes visuales.
- Añadir o actualizar tests para cálculos y comportamiento relevante.
- Mantener accesibilidad básica: labels, nombres de sección y estados comprensibles.
- No hardcodear períodos si se pueden derivar de los datos o de una selección explícita.

### Cambios financieros

- No confundir `outcome` con un valor negativo: los importes de los movimientos son positivos y el tipo de operación indica si suman o restan.
- `net` y `profit` representan ingresos menos gastos.
- `profitPercent` y `delta_pct` son porcentajes, no valores absolutos.
- No mostrar porcentajes `NaN` o `Infinity`.
- Redondear únicamente en el punto apropiado y no varias veces durante el cálculo.
- Documentar cualquier cambio en fórmulas o semántica.

### Seguridad y configuración

- No añadir secretos al repositorio.
- No copiar tokens ni contraseñas a documentación, código o commits.
- No crear `.env` reales dentro del repositorio.
- Revisar CORS antes de considerar el proyecto listo para producción: actualmente está configurado de forma abierta para desarrollo.

---

## 8. Contexto que se recomienda crear en el repositorio

La primera implementación debería crear documentación enfocada y pequeña, no una gran cantidad de archivos redundantes.

### Reglas sugeridas

```text
.agents/rules/
├── project-architecture.md
├── financial-domain.md
├── coding-conventions.md
└── validation-workflow.md
```

#### `project-architecture.md`

Debe explicar:

- qué hace cada carpeta;
- flujo frontend-backend;
- endpoints y componentes principales;
- dónde modificar cada tipo de funcionalidad;
- límites entre UI, lógica y API.

#### `financial-domain.md`

Debe explicar:

- income, outcome, net, profit y margin;
- categorías válidas;
- B2B/B2C;
- fórmulas;
- tratamiento de cero y datos vacíos;
- convenciones de fechas e importes.

#### `coding-conventions.md`

Debe explicar:

- TypeScript y Python existentes;
- reutilización de tipos y modelos;
- nombres de archivos y funciones;
- evitar duplicación;
- no introducir dependencias sin necesidad;
- actualización obligatoria de tests y documentación.

#### `validation-workflow.md`

Debe incluir comandos y criterios:

```bash
cd frontend
npm run test
npm run build
npm run lint
```

Para backend, después de instalar las dependencias:

```bash
cd backend
pytest -q
```

También se recomienda comprobar:

```bash
docker compose up --build
```

Y verificar:

- `GET /health` responde correctamente;
- el frontend carga;
- el frontend puede acceder a `/api/metrics`;
- no hay errores en consola;
- los estados de loading y error funcionan.

### Skills sugeridas

```text
.agents/skills/
├── financial-dashboard-overview/SKILL.md
├── financial-api/SKILL.md
└── financial-dashboard-ui/SKILL.md
```

#### Skill: `financial-dashboard-overview`

Debe enseñar al agente a:

1. inspeccionar el repositorio;
2. localizar reglas y memoria;
3. identificar si el cambio pertenece a frontend, backend o ambos;
4. elaborar un plan corto antes de editar;
5. validar el resultado.

#### Skill: `financial-api`

Debe enseñar al agente a:

1. localizar modelos y rutas en `backend/app/routes.py`;
2. preservar contratos;
3. añadir filtros y agregaciones de forma consistente;
4. escribir tests de endpoint y lógica;
5. comprobar fechas, categorías y porcentajes.

#### Skill: `financial-dashboard-ui`

Debe enseñar al agente a:

1. localizar componentes del dashboard;
2. reutilizar `financial-types.ts` y `financial-utils.ts`;
3. conectar endpoints mediante una capa clara de fetching;
4. mantener loading, error y estados vacíos;
5. validar gráficos y KPIs;
6. mantener la coherencia visual y accesibilidad.

---

## 9. Flujo de trabajo recomendado para cada tarea

El agente debe seguir este proceso:

### Fase 1: comprensión

- Leer reglas, skills y memoria disponibles.
- Revisar estado Git.
- Leer README y archivos relacionados.
- Identificar requisitos explícitos y restricciones.
- Detectar si hay inconsistencias entre documentación y código.

### Fase 2: plan

Antes de editar, presentar un plan breve con:

- objetivo;
- archivos que probablemente cambiarán;
- contrato afectado;
- tests que se añadirán o modificarán;
- riesgos.

### Fase 3: implementación

- Hacer el cambio mínimo que resuelva el objetivo.
- Evitar refactors no solicitados.
- Mantener tipos y contratos.
- Actualizar documentación cuando cambie el comportamiento.

### Fase 4: validación

Ejecutar los tests y comprobaciones relevantes.

Frontend:

```bash
npm run test
npm run build
npm run lint
```

Backend:

```bash
pytest -q
```

Si una validación no puede ejecutarse, indicarlo claramente y no afirmar que el cambio está completamente validado.

### Fase 5: revisión final

Informar de:

- archivos modificados;
- comportamiento añadido o cambiado;
- tests ejecutados y resultado;
- advertencias pendientes;
- próximos pasos, si los hay.

---

## 10. Estado verificado al cierre de la entrega

Durante la validación real del repositorio se comprobó que:

- la estructura `.agents/rules` y `.agents/skills` ya existe y está documentada;
- el backend queda validado con `pytest -q` tras instalar sus dependencias;
- el frontend queda validado con `npm test -- --run`, `npm run build` y `npm run lint`;
- la UI ya no mantiene un período fijo hardcodeado y usa el rango derivado de las fechas reales de los movimientos;
- la documentación del proyecto quedó alineada con la arquitectura, reglas financieras y flujo de validación reales.

Esto marca el punto de cierre del contexto: la base del proyecto queda preparada para que un agente pueda orientarse sin tener que rediscover el repositorio desde cero.

---

## 11. Criterios de aceptación del contexto

El contexto puede considerarse útil cuando un agente nuevo es capaz de responder correctamente, leyendo las reglas y skills, a preguntas como:

- ¿Dónde están las rutas de la API?
- ¿Qué significa `outcome`?
- ¿Cómo se calcula `profitPercent`?
- ¿Qué categorías son válidas?
- ¿Cómo añado un filtro de negocio?
- ¿Qué componente renderiza los KPIs?
- ¿Qué tests debo ejecutar?
- ¿Qué debo revisar antes de modificar un endpoint?
- ¿Qué archivos debo tocar para añadir una nueva visualización?
- ¿Qué información debo reportar al terminar?

Además, el agente debe poder realizar una tarea pequeña, por ejemplo:

> Añadir un filtro B2B/B2C al dashboard sin romper la API actual.

Y debe ser capaz de:

1. localizar los endpoints y tipos afectados;
2. proponer un plan;
3. implementar el cambio de forma coherente;
4. añadir tests;
5. ejecutar las validaciones;
6. explicar el resultado.

---

## 12. Instrucción inicial para el agente

Usa este documento como contexto inicial, pero verifica siempre el repositorio real antes de actuar.

Tu primera tarea no es modificar funcionalidades. Primero:

1. inspecciona `AGENTS.md`;
2. comprueba si existen `.agents/rules`, `.agents/skills` y `memory-bank`;
3. revisa `git status`;
4. compara este contexto con el código actual;
5. identifica qué documentación o skills faltan;
6. propón una estructura mínima y concreta;
7. no edites código funcional hasta que el contexto del proyecto esté suficientemente definido.

El objetivo es que el repositorio pueda ser trabajado por agentes de IA de manera segura, repetible y mantenible.

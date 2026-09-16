# Construyendo contexto desde un proyecto existente — Dashboard financiero

## Datos del proyecto

- **Título:** Construyendo contexto desde un proyecto existente - Dashboard financiero
- **Repositorio base:** `https://github.com/4GeeksAcademy/ai-eng-financial-dashboard-context-project`
- **Tipo de trabajo:** preparar un repositorio heredado para que pueda ser entendido y trabajado por coding agents.
- **Fuente oficial:** [README oficial en español](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/company-financial-dashboard-context-project/README.es.md)

> Este proyecto no consiste en reconstruir el dashboard ni en añadir funcionalidades. Consiste en dejar el repositorio **listo para agentes**, con comprensión validada, reglas accionables y memoria del proyecto basada en evidencia real.

---

## Reto

El equipo hereda un repositorio que ya tiene frontend y backend, pero el handover está incompleto:

- casi no hay documentación de producto;
- no existen estándares de código explícitos;
- no hay memoria del proyecto para la siguiente persona o coding agent;
- las afirmaciones sobre la arquitectura y el funcionamiento deben comprobarse contra el código real.

No se necesita conocimiento previo del stack. El coding agent debe actuar como investigador principal, mientras el estudiante dirige, comprueba y rechaza suposiciones o afirmaciones no verificadas.

La entrega debe demostrar stewardship profesional del repositorio asistido por un agent, no notas genéricas ni preferencias personales.

---

## Cómo trabajar en cada fase

1. Pregunta primero al coding agent.
2. Exige evidencia mediante rutas y archivos para las afirmaciones importantes.
3. Rechaza puertos, frameworks, APIs o comportamientos inventados.
4. Verifica los artefactos generados por el agent antes de hacer commit.
5. Mantén un rastro corto de verificación de afirmaciones incorrectas y correcciones. Puede estar en:
   - mensajes de commit;
   - notas del Pull Request;
   - un archivo pequeño `verification.md`.
6. Haz un commit separado por cada fase mayor.

## Qué no hacer

- No inventar buenas prácticas basadas únicamente en memoria o gusto personal.
- No pegar este README como único prompt y aceptar sin revisar todo lo que produzca el agent.
- No centrar la entrega en un ensayo largo del producto.
- No reconstruir el producto.
- No hacer rediseños visuales, añadir features ni refactors mayores salvo que sean estrictamente necesarios para validar una regla.

---

## Flujo requerido

### 1. Obtener el repositorio

Haz fork de:

```text
https://github.com/4GeeksAcademy/ai-eng-financial-dashboard-context-project
```

Después, clona tu fork o ábrelo en GitHub Codespaces y trabaja sobre ese repositorio.

### 2. Investigar cómo se ejecuta

Pregunta al coding agent:

- cómo levantar el proyecto;
- qué servicios existen;
- qué comandos están disponibles;
- cómo confirmar que los servicios están sanos;
- qué URLs y puertos utiliza realmente el proyecto.

Arranca únicamente lo que esté respaldado por la evidencia del repositorio:

- `docker-compose.yml`;
- Dockerfiles;
- scripts de `package.json`;
- README;
- archivos de configuración.

No asumas puertos fijos ni frameworks sin comprobarlos en archivos reales.

### 3. Obtener y verificar un resumen del proyecto

Pide al agent un resumen que explique:

- qué hace la aplicación;
- cómo se conectan frontend y backend;
- cómo se ejecuta;
- qué servicios existen;
- qué archivos son los entry points;
- qué archivos desconocidos son relevantes.

Comprueba cada afirmación contra el código y clasifícala como:

- ✅ verificada en el código;
- ❌ incorrecta;
- ❓ no verificada.

Corrige las afirmaciones incorrectas con ayuda del agent y deja un rastro breve de esa verificación.

### 4. Mantener commits separados

No hagas un mega-commit. Cada fase mayor debe tener su propio commit.

Las cuatro fases que deben quedar separadas son:

1. comprensión del handover;
2. hallazgos de ingeniería;
3. implementación y prueba de reglas;
4. construcción de la memoria del proyecto.

---

# Qué debes hacer

## Fase 1 — Comprender el handover con el agent

- [ ] Haz fork del repositorio.
- [ ] Clona el fork o ábrelo en Codespaces.
- [ ] Abre el proyecto en tu coding agent.
- [ ] Pide al agent que mapee la estructura del repositorio.
- [ ] Pide que identifique servicios y entry points.
- [ ] Comprueba personalmente las rutas clave que el agent mencione.
- [ ] Pide un resumen del proyecto: qué hace, cómo se conectan sus partes y cómo se ejecuta.
- [ ] Verifica el resumen contra el código real.
- [ ] Marca cada afirmación como ✅, ❌ o ❓.
- [ ] Corrige las afirmaciones incorrectas con el agent.
- [ ] Deja un rastro corto de verificación en un commit, notas del PR o `verification.md`.
- [ ] Crea un commit dedicado exclusivamente a esta fase.

### El resumen debe cubrir como mínimo

- estructura de carpetas;
- frontend y backend;
- servicios disponibles;
- puntos de entrada;
- flujo de datos;
- comandos de ejecución;
- configuración relevante;
- URLs y puertos respaldados por archivos del repo;
- estado funcional observado;
- limitaciones o gaps comprobables.

## Fase 2 — Derivar hallazgos de ingeniería con el agent

- [ ] Pide al agent que identifique convenciones útiles ya presentes.
- [ ] Pide que detecte patrones arriesgados para futuros contribuidores o agents.
- [ ] Conserva únicamente hallazgos ligados a archivos, carpetas o comportamientos concretos.
- [ ] Descarta frases vagas o recomendaciones que no estén respaldadas por el repo.
- [ ] Agrupa los hallazgos por categorías, por ejemplo:
  - arquitectura;
  - naming;
  - testing;
  - documentación;
  - DX/developer experience;
  - frontend;
  - backend;
  - seguridad;
  - mantenimiento.
- [ ] Convierte los hallazgos válidos en un conjunto de reglas propuestas.
- [ ] Haz que cada regla cite al menos un hecho concreto del repositorio.
- [ ] Crea un commit dedicado a esta fase.

## Fase 3 — Implementar y probar las reglas del repositorio

- [ ] Crea `.agents/rules` si no existe.
- [ ] Haz que el agent redacte archivos de reglas específicos del proyecto.
- [ ] Cada regla debe tener como mínimo:
  - nombre claro;
  - alcance;
  - justificación basada en el repositorio;
  - guía accionable para el agent;
  - restricciones y validaciones relevantes.
- [ ] Evita reglas genéricas como “escribe código limpio” sin explicar qué significa en este repo.
- [ ] Valida cada regla con una tarea pequeña real, por ejemplo:
  - cambio de documentación;
  - higiene de commits;
  - ajuste pequeño del frontend;
  - modificación de una ruta backend;
  - actualización de tests;
  - revisión de configuración.
- [ ] Comprueba si la regla realmente dirige el trabajo del agent.
- [ ] Refina las reglas hasta que sean accionables y específicas.
- [ ] Crea un commit dedicado a esta fase.

### Posible estructura

```text
.agents/
└── rules/
    ├── project-architecture.md
    ├── financial-domain.md
    ├── coding-conventions.md
    └── validation-workflow.md
```

Los nombres anteriores son ejemplos. Las reglas deben derivarse de la evidencia del repositorio y no copiarse automáticamente.

## Fase 4 — Construir la memoria del proyecto

- [ ] Crea una carpeta `memory-bank` en la raíz del repositorio.
- [ ] Usa nombres de archivo coherentes con la convención del agent o del repo.
- [ ] Haz que la memoria esté basada en hechos verificables.
- [ ] Rechaza afirmaciones de producto sin soporte.
- [ ] Rechaza roadmaps inventados.
- [ ] Incluye, como mínimo:
  - descripción general del producto;
  - stack tecnológico;
  - estado actual del proyecto;
  - funcionalidades comprobadas;
  - gaps conocidos;
  - prioridades siguientes únicamente si están justificadas por evidencia.
- [ ] Crea un commit dedicado a esta fase.

### Contenido mínimo del `memory-bank`

#### Descripción del producto

Debe explicar qué hace el dashboard basándose en componentes, rutas, textos y lógica reales.

#### Stack tecnológico

Debe incluir, cuando exista evidencia:

- lenguajes;
- frameworks;
- librerías clave;
- infraestructura;
- tooling;
- testing;
- comandos de ejecución.

#### Estado actual

Debe distinguir entre:

- lo que funciona y fue comprobado;
- gaps conocidos;
- limitaciones del entorno;
- próximas prioridades respaldadas por el repo.

---

## Regla crítica sobre commits

Cada fase listada debe tener su propio commit.

> Un único commit que mezcle varias fases se considera incompleto.

Como mínimo, el historial debe permitir identificar cuatro commits separados:

```text
1. Comprender el handover
2. Derivar hallazgos y reglas propuestas
3. Implementar y validar reglas
4. Construir el memory-bank
```

Los mensajes de commit deben ser claros y describir la fase realizada.

---

# Qué vamos a evaluar

## 1. Repositorio forkeado y ejecutable

- [ ] El repositorio fue forkeado correctamente.
- [ ] Se trabajó sobre el fork propio.
- [ ] El proyecto se puede ejecutar usando el setup descubierto por el agent.
- [ ] El setup utilizado está respaldado por evidencia del repositorio.
- [ ] No se asumieron puertos, servicios o comandos sin verificarlos.

## 2. Resumen generado y verificado

- [ ] Existe un resumen generado con ayuda de IA.
- [ ] El resumen fue contrastado con el código real.
- [ ] Las afirmaciones importantes fueron marcadas como verificadas, incorrectas o no verificadas.
- [ ] Las afirmaciones incorrectas fueron corregidas.
- [ ] Existe un rastro de verificación en commits, notas del PR o `verification.md`.

## 3. Historial de commits por fase

- [ ] El historial muestra commits separados por fase.
- [ ] Existe un commit para comprender el handover.
- [ ] Existe un commit para los hallazgos de ingeniería y reglas propuestas.
- [ ] Existe un commit para implementar y probar las reglas.
- [ ] Existe un commit para construir la memoria del proyecto.
- [ ] No se entregó todo mediante un único mega-commit.

## 4. Hallazgos de ingeniería basados en evidencia

- [ ] Los hallazgos citan archivos, carpetas o comportamientos concretos.
- [ ] Las convenciones descritas existen realmente en el repo.
- [ ] Los riesgos identificados están relacionados con futuras ediciones o mantenimiento.
- [ ] Las reglas propuestas se pueden vincular a los hallazgos.
- [ ] Se descartaron recomendaciones vagas o basadas solamente en preferencias personales.

## 5. Reglas en `.agents/rules`

- [ ] Existe `.agents/rules`.
- [ ] Contiene reglas accionables.
- [ ] Las reglas son específicas del proyecto.
- [ ] Cada regla tiene alcance claro.
- [ ] Cada regla tiene una justificación basada en evidencia.
- [ ] Las reglas orientan tareas reales del agent.
- [ ] No son únicamente eslóganes genéricos.
- [ ] Las reglas fueron probadas con al menos una tarea pequeña real.
- [ ] Se refinó el contenido después de comprobar su utilidad.

## 6. Validación de las reglas

- [ ] Se dio al agent una tarea pequeña real usando las reglas.
- [ ] Se comprobó que las reglas influyen en su forma de trabajar.
- [ ] Se verificó que el agent localiza los archivos correctos.
- [ ] Se verificó que el agent respeta las convenciones y restricciones del proyecto.
- [ ] Se comprobó la validación técnica correspondiente.

## 7. `memory-bank`

- [ ] Existe la carpeta `memory-bank` en la raíz.
- [ ] Incluye un overview del producto.
- [ ] El overview está ligado a evidencia verificable.
- [ ] Documenta el stack tecnológico.
- [ ] Documenta lenguajes, frameworks, infraestructura, tooling y dependencias relevantes.
- [ ] Documenta el estado actual.
- [ ] Distingue lo que funciona de los gaps conocidos.
- [ ] No contiene claims de producto sin soporte.
- [ ] No contiene roadmaps inventados.
- [ ] La memoria es mantenible y útil para el siguiente agent.

## 8. Calidad del trabajo asistido por agent

- [ ] El resultado demuestra colaboración entre estudiante y coding agent.
- [ ] El agent investigó y propuso.
- [ ] El estudiante dirigió y verificó.
- [ ] Los artefactos no fueron pegados sin revisión.
- [ ] Las decisiones importantes pueden explicarse mediante evidencia del repositorio.
- [ ] El trabajo se lee como stewardship profesional del codebase heredado.

## 9. Alcance del proyecto

- [ ] No se reconstruyó el dashboard desde cero.
- [ ] No se hizo un rediseño visual innecesario.
- [ ] No se añadieron funcionalidades no requeridas.
- [ ] No se hicieron refactors mayores salvo que fueran estrictamente necesarios para validar una regla.
- [ ] El foco se mantuvo en contexto, reglas, memoria y verificación.

---

# Entrega

Haz push de tu fork a GitHub y comparte:

1. URL del repositorio.
2. Historial de commits que muestre un commit por fase.
3. Archivos dentro de `.agents/rules`.
4. Carpeta `memory-bank`.
5. Rastro de verificación en commits, notas del Pull Request o `verification.md`.

Sigue cualquier instrucción adicional que proporcione el instructor.

---

## Checklist final

```text
[ ] Fork realizado
[ ] Repositorio clonado o abierto en Codespaces
[ ] Estructura, servicios y entry points mapeados
[ ] Resumen del proyecto generado por el agent
[ ] Resumen comprobado contra el código real
[ ] Afirmaciones clasificadas como ✅ / ❌ / ❓
[ ] Correcciones y rastro de verificación documentados
[ ] Commit separado para la Fase 1
[ ] Hallazgos concretos derivados del repositorio
[ ] Reglas propuestas relacionadas con esos hallazgos
[ ] Commit separado para la Fase 2
[ ] `.agents/rules` creado o revisado
[ ] Reglas accionables y específicas
[ ] Reglas probadas con una tarea real
[ ] Commit separado para la Fase 3
[ ] `memory-bank` creado en la raíz
[ ] Overview del producto documentado
[ ] Stack tecnológico documentado
[ ] Estado actual documentado
[ ] Claims no verificadas eliminadas
[ ] Commit separado para la Fase 4
[ ] URL del repositorio preparada
[ ] Historial de commits preparado
[ ] Archivos `.agents/rules` preparados
[ ] Carpeta `memory-bank` preparada
[ ] Rastro de verificación preparado
```

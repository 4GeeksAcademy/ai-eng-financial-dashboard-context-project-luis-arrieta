# Mejorando el desarrollo con skills de agentes - Dashboard financiero

## Identificación oficial en 4Geeks

**Fuente:** cuenta de Luis Alfredo Arrieta Castillo en 4Geeks Academy, consultada mediante la API de 4Geeks.

- **Usuario:** Luis Alfredo Arrieta Castillo
- **Email de la cuenta:** luisalfredo612@gmail.com
- **GitHub asociado:** `ilfredo`
- **Academia:** 4Geeks Madrid
- **Cohorte:** Working with AI coding agents
- **Versión de la cohorte:** 3
- **Cohorte ID:** `1810`
- **Slug de la cohorte:** `working-with-ai-coding-agents-v3`
- **Estado educativo de la cohorte:** `INACTIVE`
- **Matrícula del estudiante en la cohorte:** `58115`
- **Proyecto/tarea ID:** `987598`
- **Título registrado por 4Geeks:** `Enhacing development with agent skills - Financial dashboard`
- **Título en español del asset:** `Mejorando el desarrollo con skills de agentes - Dashboard financiero`
- **Slug:** `company-financial-dashboard-skills-project`
- **Tipo:** `PROJECT`
- **Estado de la tarea:** `PENDING`
- **Estado de revisión:** `PENDING`
- **GitHub URL registrada en la tarea:** ninguna
- **Live URL registrada en la tarea:** ninguna
- **Fecha de creación de la tarea:** `2026-09-07T19:06:02.669446Z`
- **Fecha de actualización de la tarea:** `2026-09-07T19:06:21.323081Z`

### Asset oficial del proyecto

- **Asset ID:** `3447` para la versión española
- **Asset inglés:** `3445`
- **Tipo de asset:** `PROJECT`
- **Dificultad:** `INTERMEDIATE`
- **Duración estimada:** `2`
- **Categoría:** `Habilidades Técnicas`
- **Visibilidad:** `PUBLIC`
- **Estado del contenido:** `DRAFT`
- **Evaluación automática:** no graduada (`graded: false`)
- **Repositorio fuente del contenido:** `https://github.com/4GeeksAcademy/ai-engineering-syllabus`
- **README oficial en español:** `https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/company-financial-dashboard-skills-project/README.es.md`
- **README oficial en inglés:** `https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/company-financial-dashboard-skills-project/README.md`
- **Solución oficial:** `https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/company-financial-dashboard-skills-project/.learn/solution/README.md`
- **Sincronización del asset:** `OK`
- **Última sincronización registrada:** `2026-08-26T21:36:43.943867Z`

### Tecnologías etiquetadas por 4Geeks

- `git`
- `AI`
- `accessibility`
- `documentation`
- `agent-skills`
- `coding-agents`

---

## Propósito del proyecto

El proyecto continúa sobre el repositorio heredado del dashboard financiero después del proyecto de contexto. El objetivo es dirigir un coding agent para:

1. aplicar la skill `accessibility`;
2. aplicar la skill `vercel-react-best-practices`;
3. descubrir y aplicar al menos una skill adicional usando `npx skills find`;
4. crear una skill interna dentro de `.skills/`;
5. verificar los resultados;
6. actualizar el `memory bank`.

La descripción oficial de 4Geeks indica que la skill interna puede cubrir commits, despliegue, testing/QA u otra necesidad específica del repositorio.

**Restricción principal:** no reescribir el dashboard desde cero. El trabajo debe mejorar el codebase heredado mediante skills, con resultados verificables.

---

## Historia planteada por el README

El README presenta el escenario de un dashboard heredado que ya quedó preparado para agentes con:

- un `memory-bank` verificado;
- reglas en `.agents/rules`;
- un setup local funcional;
- datos cargando correctamente;
- gráficos renderizándose correctamente.

El siguiente encargo del tech lead es elevar la calidad en dos frentes principales:

- accesibilidad;
- buenas prácticas de despliegue.

Después se debe explorar el ecosistema de skills y capturar una skill interna que el equipo pueda reutilizar en este repositorio.

La idea central del ejercicio es utilizar paquetes de instrucciones reutilizables sobre un codebase heredado, en lugar de depender de checklists memorizados o de un prompt masivo.

---

# Instrucciones oficiales auditadas

## 1. Trabajar siempre sobre el repositorio heredado

El README indica que no se debe hacer un fork nuevo ni crear otro repositorio.

Antes de modificar código hay que confirmar que están presentes y actualizados:

- `memory-bank/`;
- `.agents/rules`;
- la configuración necesaria para ejecutar el proyecto.

El coding agent debe confirmar basándose en la evidencia del repositorio:

- cómo ejecutar la aplicación;
- qué comando valida el build del frontend;
- qué comandos ejecutan los tests.

## 2. Rama de trabajo obligatoria

Actualizar primero la rama base si corresponde y crear la rama indicada:

```bash
git pull origin main
git switch -c feature/agent-skills
```

Los cambios de este proyecto deben quedar en:

```text
feature/agent-skills
```

La rama base del Pull Request es:

```text
main
```

---

## 3. Skill `accessibility`

### Descubrimiento

Ejecutar:

```bash
npx skills find accessibility
```

Revisar la skill antes de aplicarla y cargarla en el coding agent.

### Forma de aplicación

1. Pedir al agente una auditoría del dashboard.
2. Pedir propuestas concretas de corrección.
3. Revisar cada propuesta antes de aceptarla.
4. Relacionar cada cambio con un archivo real y con una instrucción de la skill.
5. Aplicar las correcciones justificadas.
6. Verificar el resultado en la aplicación y en el código.
7. Crear un commit cuyo mensaje haga referencia a `accessibility`.

### Aspectos de accesibilidad exigidos

La evaluación del proyecto requiere comprobar:

- navegación por teclado en los elementos interactivos;
- atributos `aria-*` correctos donde sean necesarios;
- uso adecuado de `role`;
- texto `alt` presente en imágenes;
- nombres accesibles para iconos y controles;
- contraste básico de textos y controles;
- foco visible y usable;
- estados de carga comprensibles;
- estados de error comprensibles;
- contenido vacío comprensible para usuarios de tecnologías de asistencia.

---

## 4. Skill `vercel-react-best-practices`

### Descubrimiento

Ejecutar:

```bash
npx skills find vercel-react-best-practices
```

Leer la skill y cargarla en el coding agent antes de aplicarla.

### Forma de aplicación

1. Pedir al agente una auditoría de los patrones frontend relacionados con despliegue y rendimiento.
2. Pedir propuestas basadas en la skill y en el stack real del repositorio.
3. Revisar cada propuesta.
4. Aplicar solo las correcciones justificadas.
5. Ejecutar el build documentado por el repositorio.
6. Confirmar que no aparecen advertencias nuevas e injustificadas.
7. Crear un commit cuyo mensaje haga referencia a `vercel-react-best-practices`.

### Áreas que puede cubrir

- uso correcto de imágenes y fuentes;
- metadatos de la página;
- prevención de layout shift;
- patrones de renderizado adecuados;
- prácticas que afecten a Lighthouse o al despliegue;
- anti-patrones de React.

### Adaptación obligatoria al stack real

El README del proyecto especifica que el dashboard usa React/Vite, no Next.js. Por tanto:

- no introducir `next/image`;
- no introducir `next/font`;
- no añadir dependencias de Next.js;
- interpretar las recomendaciones de la skill según la arquitectura real del dashboard.

---

## 5. Explorar el ecosistema de skills

Usar `npx skills find <tema>` para explorar al menos dos temas relevantes. El README propone como ejemplos:

```bash
npx skills find performance
npx skills find seo
npx skills find forms
npx skills find typescript
npx skills find testing
```

Requisitos:

- revisar los resultados encontrados;
- escoger al menos una skill adicional útil para el repositorio;
- cargarla y aplicarla;
- justificar por escrito la selección;
- verificar el resultado de su aplicación.

La justificación debe quedar en `memory-bank` o en las notas del Pull Request.

---

## 6. Crear una skill interna del proyecto

### Ubicación obligatoria

La skill interna debe guardarse dentro de:

```text
.skills/
```

### Problema que debe resolver

Debe cubrir un gap específico del dashboard heredado que las skills comunitarias no resuelvan suficientemente. El README acepta como ejemplos:

- convenciones de commits;
- pasos de despliegue del dashboard;
- testing y QA antes de hacer merge;
- reglas de formato de datos financieros;
- patrones de uso de la API;
- convenciones específicas de la interfaz;
- otro flujo derivado del código real del repositorio.

### Estructura mínima

La skill debe tener, como mínimo:

- objetivo claro;
- entradas necesarias;
- pasos o procedimiento accionable;
- salida esperada;
- criterios de aceptación verificables.

### Proceso de validación

Después de crearla:

1. cargarla en el coding agent;
2. usarla en una tarea real o representativa del repositorio;
3. verificar que produce instrucciones útiles y específicas;
4. ajustarla si es demasiado genérica o no puede verificarse.

La skill no debe ser una plantilla genérica ni una copia de las skills comunitarias.

---

## 7. Actualizar el `memory-bank`

Actualizar:

```text
memory-bank/progress.md
```

Si el repositorio usa otro archivo equivalente de memoria, actualizar ese archivo.

El registro debe incluir:

- skills aplicadas;
- archivos y cambios verificados;
- resultados de las comprobaciones;
- skill adicional elegida y justificación;
- skill interna creada;
- comandos de validación ejecutados;
- limitaciones o decisiones pendientes.

El contenido debe reflejar el trabajo real de la sesión, no una descripción inventada o genérica.

---

# Criterios de evaluación oficiales

## Skills proporcionadas

- [ ] `accessibility` fue descubierta, cargada y aplicada.
- [ ] `vercel-react-best-practices` fue descubierta, cargada y aplicada.
- [ ] Las mejoras son visibles o verificables en el código y la aplicación.
- [ ] Los cambios se relacionan con instrucciones concretas de las skills.
- [ ] No se hicieron ediciones masivas sin revisión.

## Accesibilidad

- [ ] Funciona la navegación por teclado.
- [ ] Los atributos `aria-*` son correctos donde hacen falta.
- [ ] Los roles son apropiados.
- [ ] Las imágenes tienen `alt`.
- [ ] Los iconos y controles tienen nombres accesibles.
- [ ] El foco es visible y usable.
- [ ] El contraste básico es razonable.
- [ ] Los estados de carga, error y vacío son comprensibles.

## Build y validación

- [ ] Pasa el build del frontend usando el comando documentado.
- [ ] No hay advertencias nuevas e injustificadas.
- [ ] Se ejecutan los tests relevantes.
- [ ] Se comprueba la aplicación ejecutándose cuando es posible.
- [ ] Los resultados se documentan.

Los comandos de referencia indicados por las instrucciones son:

```bash
cd frontend
npm test -- --run
npm run lint
npm run build
```

Para el backend, si corresponde:

```bash
cd backend
pytest -q
```

## Skill adicional

- [ ] Se exploraron al menos dos temas con `npx skills find`.
- [ ] Se revisaron los resultados.
- [ ] Se descubrió y aplicó al menos una skill adicional.
- [ ] La elección está justificada.
- [ ] El resultado está verificado.

## Skill interna

- [ ] Existe una skill dentro de `.skills/`.
- [ ] Tiene objetivo claro.
- [ ] Define entradas.
- [ ] Describe pasos accionables.
- [ ] Define la salida esperada.
- [ ] Incluye criterios de aceptación verificables.
- [ ] Es específica del dashboard financiero.
- [ ] Fue cargada y probada con una tarea real o representativa.

## Rama y entrega

- [ ] Los cambios están en `feature/agent-skills`.
- [ ] No se trabajó directamente sobre `main`.
- [ ] Los commits son claros y trazables.
- [ ] La rama fue subida a GitHub.
- [ ] Se abrió un Pull Request desde `feature/agent-skills` hacia `main`.
- [ ] Se compartió con el instructor la URL del Pull Request.

La entrega esperada es la URL del Pull Request, no solamente la URL del repositorio.

---

# Estado actual de la tarea en 4Geeks

A fecha de la consulta a la cuenta:

- **Tarea:** pendiente (`PENDING`).
- **Revisión:** pendiente (`PENDING`).
- **GitHub URL:** no registrada.
- **Live URL:** no registrada.
- **Entrega enviada:** no consta en la tarea.
- **Pull Request:** no consta en los datos de la tarea consultada.

Este archivo documenta los requisitos oficiales obtenidos desde 4Geeks y el README asociado. No afirma que una skill, test, build, commit, push o Pull Request se haya realizado si no aparece confirmado en la plataforma o en una verificación independiente.

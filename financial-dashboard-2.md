# Mejorando el desarrollo con skills de agentes — Dashboard financiero

## Proyecto

- **Cohorte:** Working with AI coding agents — versión 3
- **Proyecto:** Enhancing development with agent skills - Financial dashboard
- **Slug:** `company-financial-dashboard-skills-project`
- **Repositorio:** el mismo repositorio heredado del proyecto de contexto del dashboard financiero
- **Rama obligatoria:** `feature/agent-skills`
- **Rama base del Pull Request:** `main`

> **Importante:** este proyecto continúa sobre el mismo repositorio del proyecto de contexto. No hay que crear otro fork ni otro repositorio.

## Fuente oficial

- [Instrucciones oficiales en español](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/company-financial-dashboard-skills-project/README.es.md)
- [Instrucciones oficiales en inglés](https://github.com/4GeeksAcademy/ai-engineering-syllabus/blob/main/content/projects/company-financial-dashboard-skills-project/README.md)

---

## Reto

Continúa trabajando sobre el **dashboard financiero heredado** del proyecto de contexto. El proyecto anterior debía haber dejado preparado un `memory-bank` verificado, reglas en `.agents/rules` y un setup local funcional.

El objetivo de este proyecto es mejorar el código existente mediante skills de agentes, especialmente en:

- accesibilidad;
- buenas prácticas de React y despliegue;
- exploración del ecosistema de skills;
- creación de una skill interna específica del repositorio;
- verificación de resultados y documentación de lo aprendido.

No se trata de reescribir el dashboard desde cero. Las mejoras deben ser dirigidas por skills, trazables y verificadas.

## Cómo trabajar en cada fase

1. Cargar la skill y permitir que el agente audite y proponga cambios. No corregir manualmente siguiendo únicamente este documento.
2. Pedir al agente que cite los archivos afectados y explique cada cambio.
3. Revisar las propuestas y aceptar solo cambios relacionados con una instrucción real de la skill y con el código existente.
4. Verificar los resultados en la aplicación ejecutándose y mediante los comandos de build/test documentados en el repositorio.
5. Mantener los cambios trazables a una skill mediante mensajes de commit claros o notas del Pull Request.
6. Actualizar el `memory-bank` cuando cambie la línea base de calidad o el flujo de trabajo del repositorio.

---

## Cómo iniciar el proyecto

### 1. Continuar en el mismo repositorio

Usa el repositorio heredado del proyecto de contexto. No hagas un fork nuevo ni crees otro repositorio.

### 2. Confirmar el contexto anterior

Antes de modificar código, comprueba que están commiteados y actualizados:

- `memory-bank/`;
- `.agents/rules/`;
- la configuración necesaria para ejecutar el proyecto localmente.

Pide al coding agent que confirme, basándose en la evidencia del repositorio:

- cómo ejecutar la aplicación;
- qué comando de build valida el frontend;
- qué comandos ejecutan los tests.

### 3. Actualizar y crear la rama obligatoria

Si trabajas en equipo, actualiza primero la rama base:

```bash
git pull origin main
```

Después crea y utiliza la rama exigida por el proyecto:

```bash
git switch -c feature/agent-skills
```

Todos los cambios de este proyecto deben quedar en `feature/agent-skills`, no directamente en `main`.

---

# Qué debes hacer

## 1. Descubrir y cargar las skills proporcionadas

Ejecuta y revisa las skills indicadas:

```bash
npx skills find accessibility
npx skills find vercel-react-best-practices
```

Debes:

- revisar qué cubre cada skill;
- cargar ambas skills en el coding agent;
- leer sus instrucciones antes de aplicarlas.

## 2. Aplicar la skill `accessibility`

Con la skill cargada:

1. Pide al agente que audite el dashboard.
2. Pide propuestas de corrección concretas.
3. Revisa cada propuesta antes de aceptarla.
4. Comprueba que cada cambio se puede vincular a un archivo real y a una instrucción de la skill.
5. Aplica las correcciones justificadas.
6. Verifica los resultados.
7. Crea un commit cuyo mensaje haga referencia a `accessibility`.

La verificación debe incluir como mínimo:

- navegación por teclado en los elementos interactivos;
- atributos `aria-*` correctos donde sean necesarios;
- uso adecuado de `role` cuando corresponda;
- texto `alt` presente en imágenes;
- nombres accesibles para iconos o controles;
- contraste básico de textos y controles;
- foco visible y usable;
- estados de carga y error comprensibles para usuarios de tecnologías de asistencia.

## 3. Aplicar la skill `vercel-react-best-practices`

Con la skill cargada:

1. Pide al agente que audite los patrones frontend relacionados con despliegue y rendimiento.
2. Pide propuestas basadas en la skill y en el stack real del repositorio.
3. Revisa las propuestas antes de aceptarlas.
4. Aplica las correcciones justificadas.
5. Ejecuta el build documentado por el repositorio.
6. Comprueba que pasa sin advertencias nuevas e injustificadas.
7. Crea un commit cuyo mensaje haga referencia a `vercel-react-best-practices`.

La revisión puede incluir, según lo que sea aplicable al proyecto:

- uso correcto de imágenes y fuentes;
- metadatos de la página;
- prevención de layout shift;
- patrones de renderizado adecuados;
- prácticas que afecten a Lighthouse o al despliegue;
- evitar anti-patrones de React;
- mantener las soluciones compatibles con el stack real del dashboard.

> El dashboard usa React/Vite, no Next.js. No hay que introducir `next/image`, `next/font` ni dependencias de Next.js si no corresponden al proyecto. La skill debe aplicarse interpretando sus recomendaciones según la arquitectura real.

## 4. Explorar el ecosistema de skills

Usa `npx skills find <tema>` para explorar al menos dos temas relevantes para este proyecto.

Ejemplos:

```bash
npx skills find performance
npx skills find seo
npx skills find forms
npx skills find typescript
npx skills find testing
```

Debes:

- revisar los resultados;
- elegir al menos una skill adicional que sea útil para este repositorio;
- cargarla y aplicarla;
- justificar por escrito en el `memory-bank` o en las notas del Pull Request por qué fue elegida;
- verificar el resultado de su aplicación.

## 5. Crear una skill interna del proyecto

Identifica, con ayuda del agente, un problema específico del dashboard heredado que las skills comunitarias no cubran suficientemente.

La skill interna debe guardarse dentro de:

```text
.skills/
```

Puede tratar, por ejemplo, sobre:

- convenciones de commits;
- pasos de despliegue del dashboard;
- testing y QA antes de hacer merge;
- reglas de formato de datos financieros;
- patrones de uso de la API;
- convenciones específicas de la interfaz del dashboard;
- otro flujo derivado del código real del repositorio.

La skill debe tener una estructura clara y accionable, como mínimo:

- **objetivo**;
- **entradas**;
- **pasos o procedimiento**;
- **salida esperada**;
- **criterios de aceptación**;
- restricciones y errores comunes específicos del repositorio.

Después de crearla:

1. Cárgala en el agente.
2. Úsala en una tarea real o representativa del repositorio.
3. Comprueba que produce instrucciones útiles y específicas.
4. Ajusta la skill si es demasiado genérica o no se puede verificar.

No debe ser una plantilla genérica: debe demostrar conocimiento real del dashboard.

## 6. Actualizar el memory bank

Actualiza:

```text
memory-bank/progress.md
```

Si el repositorio utiliza otro archivo equivalente de memoria, actualiza ese archivo.

El registro debe incluir:

- las skills aplicadas;
- los archivos y cambios verificados;
- los resultados de las comprobaciones;
- la skill adicional elegida y la justificación de su elección;
- la skill interna creada;
- los comandos de validación ejecutados;
- cualquier limitación o decisión pendiente.

El `memory-bank` debe reflejar el trabajo real de la sesión, no una descripción inventada o genérica.

---

# Qué vamos a evaluar

## 1. Aplicación de las skills proporcionadas

- [ ] La skill `accessibility` fue cargada y aplicada.
- [ ] La skill `vercel-react-best-practices` fue cargada y aplicada.
- [ ] Las mejoras son visibles o verificables en el código y la aplicación.
- [ ] Los cambios se pueden relacionar con instrucciones concretas de cada skill.
- [ ] El trabajo no consiste en ediciones masivas sin revisión.

## 2. Resultados de accesibilidad

- [ ] La navegación por teclado funciona en los elementos interactivos.
- [ ] Los atributos `aria-*` son correctos donde hacen falta.
- [ ] Los roles son apropiados y no se añaden innecesariamente.
- [ ] Las imágenes tienen texto `alt` cuando corresponde.
- [ ] Los iconos y controles tienen nombres accesibles.
- [ ] El foco es visible y usable.
- [ ] El contraste básico de textos y controles es razonable.
- [ ] Los estados de carga, error y contenido vacío son comprensibles.

## 3. Build y validación

- [ ] El build del frontend pasa usando el comando documentado por el repositorio.
- [ ] No aparecen advertencias nuevas e injustificadas como consecuencia de los cambios.
- [ ] Se ejecutan los tests relevantes.
- [ ] Se comprueba la aplicación ejecutándose cuando sea posible.
- [ ] Los resultados de las verificaciones quedan documentados.

Los comandos deben salir de la evidencia y scripts del propio repositorio. Como referencia, pueden incluir:

```bash
cd frontend
npm test -- --run
npm run lint
npm run build
```

Y para el backend, si corresponde:

```bash
cd backend
pytest -q
```

## 4. Skill adicional del ecosistema

- [ ] Se exploraron al menos dos temas con `npx skills find <tema>`.
- [ ] Se descubrió al menos una skill adicional.
- [ ] La skill adicional fue aplicada al repositorio.
- [ ] La elección está justificada por escrito.
- [ ] El resultado de su aplicación fue verificado.

## 5. Skill interna en `.skills/`

- [ ] Existe una skill interna dentro de `.skills/`.
- [ ] Tiene un objetivo claro.
- [ ] Define las entradas necesarias.
- [ ] Describe pasos accionables.
- [ ] Define el resultado esperado.
- [ ] Incluye criterios de aceptación verificables.
- [ ] Contiene guía específica del dashboard financiero.
- [ ] No es relleno genérico ni una copia de las skills comunitarias.
- [ ] Fue cargada y probada con una tarea real o representativa del repositorio.

## 6. Memory bank

- [ ] `memory-bank/progress.md`, o su equivalente, fue actualizado.
- [ ] Refleja con precisión las skills aplicadas.
- [ ] Documenta los cambios verificados.
- [ ] Documenta la skill adicional y el motivo de elección.
- [ ] Documenta la skill interna creada.
- [ ] Incluye las validaciones ejecutadas y sus resultados.

## 7. Rama y commits

- [ ] Los cambios están en la rama `feature/agent-skills`.
- [ ] No se trabajó directamente sobre `main` como rama de entrega.
- [ ] Los commits son claros y trazables.
- [ ] Idealmente existe un commit por cada skill aplicada.
- [ ] Los mensajes de commit identifican la skill o el tipo de mejora realizado.
- [ ] La rama fue subida a GitHub.
- [ ] Se abrió un Pull Request desde `feature/agent-skills` hacia `main`.

## 8. Naturaleza del trabajo

- [ ] El resultado se lee como una mejora impulsada por un coding agent.
- [ ] El agente auditó y propuso cambios antes de implementarlos.
- [ ] El estudiante verificó los resultados.
- [ ] Cada modificación importante se puede explicar y justificar.
- [ ] No se reescribió el dashboard desde cero.
- [ ] Se trabajó sobre el repositorio heredado.

> La calidad de la skill interna se evalúa por su claridad y especificidad, no por su longitud. Una skill breve y precisa es mejor que una larga y vaga.

---

# Entrega

1. Confirma que todo el trabajo está en `feature/agent-skills`.
2. Sube la rama a GitHub:

```bash
git push -u origin feature/agent-skills
```

3. Abre un Pull Request contra `main`.
4. Comparte con el instructor la URL del Pull Request.

La URL del Pull Request es la entrega esperada, no solamente la URL del repositorio.

---

## Checklist final

```text
[ ] Rama feature/agent-skills creada y utilizada
[ ] memory-bank anterior comprobado
[ ] accessibility descubierta, cargada y aplicada
[ ] vercel-react-best-practices descubierta, cargada y aplicada
[ ] Al menos dos temas explorados con npx skills find
[ ] Una skill adicional descubierta, aplicada y justificada
[ ] Skill interna creada dentro de .skills/
[ ] Skill interna con objetivo, entradas, salida y criterios de aceptación
[ ] memory-bank/progress.md actualizado
[ ] Accesibilidad verificada
[ ] Tests ejecutados
[ ] Build ejecutado
[ ] Lint ejecutado
[ ] Commits claros y trazables
[ ] Rama subida a GitHub
[ ] Pull Request abierto contra main
[ ] URL del Pull Request compartida con el instructor
```

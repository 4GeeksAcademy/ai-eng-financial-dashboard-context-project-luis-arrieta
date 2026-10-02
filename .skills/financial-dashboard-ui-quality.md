# Skill: Financial Dashboard UI Quality

## Objetivo
Garantizar que el dashboard financiero heredado mantenga una experiencia accesible, legible y eficiente para usuarios reales, sin perder la coherencia de negocio y la arquitectura ya existente del proyecto.

## Entradas
- Especificación del proyecto: `financial-dashboard-2.md`
- Arquitectura real del repositorio: `frontend/src/`, `backend/app/`, `memory-bank/`
- Reglas activas: `.agents/rules/`
- Estado funcional conocido y validado del dashboard

## Procedimiento
1. Revisar primero la especificación y el estado del repositorio antes de proponer cambios.
2. Auditar la interfaz en los puntos reales del flujo:
   - página principal y metadatos
   - KPIs y tarjetas de resumen
   - gráficos y mensajes de carga/error/vacío
   - navegación y foco dentro de la UI
3. Priorizar cambios con impacto directo en usabilidad y rendimiento:
   - etiquetas y texto accesible
   - roles, aria y estados de carga/error
   - metadatos HTML básicos
   - carga diferida de componentes pesados
4. Mantener las reglas del dominio financiero y no reescribir la lógica de negocio.
5. Verificar con tests, lint y build del frontend antes de cerrar.

## Salida esperada
- UI más accesible y comprensible.
- Menor carga inicial del bundle cuando hay gráficos pesados.
- Cambios trazables a una justificación real del código y de la especificación.
- Datos financieros sin alterar la semántica de ingresos, gastos, beneficio y margen.

## Criterios de aceptación
- La app conserva su estructura actual y no se reescribe desde cero.
- No aparecen errores de lint o build causados por el ajuste.
- Los elementos visuales y los mensajes cargan con estado claro y accesible.
- La mejora se puede explicar con referencia a una evidencia real del repo.

## Restricciones
- No introducir dependencias nuevas sin necesidad.
- No cambiar contratos de API ni reglas financieras sin pruebas y justificación.
- No mezclar mejoras de estilo con cambios funcionales no relacionados.
- No asumir que la documentación externa reemplaza la evidencia del código.

---
title: "Refactor: desacoplar layout paralelo de generate-menu-pdf.mjs del nombre legible de subcategoría"
type: TASK
state: backlog
priority: medium
estimate: "2-3h"
labels:
  - tech-debt
  - pdf
  - refactor
  - menu
assignee: null
parent: null
project: PICAITO
created: 2026-06-02
source: offline-import
openspec_compatible: true
---

# Refactor: desacoplar layout paralelo de generate-menu-pdf.mjs del nombre legible de subcategoría

## Type
TASK

## Description

## Contexto

El script `scripts/generate-menu-pdf.mjs` renderiza la carta PDF desde `src/data/menu.ts`. Para dos categorías (`tostadas-desayuno` y `cafes-infusiones`) usa un layout en columnas paralelas donde la columna izquierda y la derecha se determinan por comparaciones de strings sobre el nombre legible de la subcategoría:

```js
const isFirst = (name) => category.id === 'tostadas-desayuno' && name === 'Tostadas'
              || category.id === 'cafes-infusiones' && name === 'Cafetería';
const isLast = (name) => category.id === 'tostadas-desayuno' && name === 'Dulces'
              || category.id === 'cafes-infusiones' && name === 'Infusiones y Zumos';
const isLeftSub = (name) => category.id === 'tostadas-desayuno' && name === 'Extras';
```

## Problema

Si alguien renombra `'Dulces'` a `'Bollería'` o `'Cafetería'` a `'Cafés'` en `src/data/menu.ts`, **el layout se desbalancea en silencio**: los items caen en la columna incorrecta, o la rama `isFirst/isLast` no se activa y los items se renderizan apilados en una sola columna.

Esto acopla la estructura visual del PDF al contenido legible por el usuario. Cualquier cambio de copy i18n o de reorganización interna rompe el PDF sin error de compilación.

## Tareas

1. Reemplazar las funciones `isFirst/isLast/isLeftSub` (líneas ~346, 394-398 en el commit actual) por un mecanismo basado en **identificador de subcategoría**, no en nombre legible.
2. Opciones de diseño posibles (a evaluar):
   - Añadir un campo `subcategoryId` (estable, kebab-case) a `MenuItem` en `src/data/menu.ts`, separado del `subcategory` legible.
   - Declarar explícitamente en cada categoría qué subcategorías van a la columna izquierda (ej: array `parallelLayout: { left: ['tostadas', 'extras'], right: ['dulces'] }` en una constante del script).
   - Usar el `id` del item como discriminador (menos limpio, los ids son ruidosos).
3. Mantener el comportamiento visual actual exactamente: el PDF de salida debe ser idéntico al actual (7 páginas, mismo layout).
4. Añadir tests o, al menos, una verificación manual de las 3 categorías afectadas:
   - `tostadas-desayuno` (Tostadas | Extras a la izquierda, Dulces a la derecha)
   - `cafes-infusiones` (Cafetería a la izquierda, Infusiones y Zumos a la derecha)

## Criterios de aceptación

- [ ] Renombrar `'Dulces'` → `'Bollería'` en `menu.ts` no rompe el PDF (los items siguen apareciendo a la derecha de Tostadas).
- [ ] Renombrar `'Cafetería'` → `'Cafés'` no rompe el PDF.
- [ ] `node --experimental-strip-types scripts/generate-menu-pdf.mjs` sigue generando 7 páginas con el mismo layout.
- [ ] El código del script ya no compara con strings literales como `'Tostadas'`, `'Dulces'`, `'Cafetería'`, etc.

## Archivos relevantes

- `scripts/generate-menu-pdf.mjs` (líneas 343-428, funciones `getSectionHeight` y bloque de procesamiento de subcategorías)
- `src/data/menu.ts` (interfaz `MenuItem` línea 6-14, subcategories de `tostadas-desayuno` líneas 24-118, `cafes-infusiones` líneas 121-298)

## Prioridad

Media. No bloquea nada, pero el riesgo de regresión silenciosa es real cuando se editen las cartas.

## Metadata

- **Priority**: medium
- **Type**: TASK
- **Tags**: `tech-debt`, `pdf`, `refactor`, `menu`
- **Asignado**: (vacío)
- **Estimación**: 2-3 horas
- **Parent / epic**: ninguno (top-level)
- **Attachments**: ninguno

## Notas técnicas (verificadas)

- La lógica de layout paralelo está **duplicada en dos bloques** del script `generate-menu-pdf.mjs`:
  1. **Cálculo de altura** (función `getSectionHeight`, líneas 387-421): define `isLast` + `hasSubheader` (variante de `isLeftSub` para el caso 'Extras').
  2. **Rendering** (procesamiento de subcategorías, líneas 438-510): define `isFirst` + `isLast` + `isLeftSub` completas.

  → El refactor debe centralizar el discriminador en **una sola función o constante** consumida por ambos bloques. Si se deja la duplicación, el riesgo de regresión silenciosa se mantiene en uno de los dos caminos.

- Strings literales a eliminar (todos aparecen en `scripts/generate-menu-pdf.mjs`):
  - `'Tostadas'`, `'Dulces'`, `'Extras'` (rama `tostadas-desayuno`)
  - `'Cafetería'`, `'Infusiones y Zumos'` (rama `cafes-infusiones`)
  - También referenciados en `scripts/update-breakfast.mjs` (líneas 128, 135) y `scripts/reorder-menu.mjs` (línea 170) como literales de subcategoría. Esos scripts son de mantenimiento one-shot, no bloquean este refactor, pero conviene tenerlos en cuenta.

## OpenSpec Compatibility

Esta task puede expandirse a una especificación OpenSpec formal con:

- **API design / contrato de datos**: forma del nuevo campo `subcategoryId` o de la constante `parallelLayout` por categoría.
- **Comportamiento esperado**: layout idéntico al actual (7 páginas, 2 categorías con paralelismo, resto apilado/balanceado).
- **Criterios verificables**: los 4 criterios de aceptación de arriba son 1:1 traducibles a `## Acceptance` en el `spec.md`.
- **Casos de prueba**: tabla de mapeo `categoryId × subcategoryId → {left | right | left-with-subheader}` y casos de renombrado (Dulces→Bollería, Cafetería→Cafés) que el sistema debe tolerar.
- **Migración**: estrategia para introducir `subcategoryId` sin tocar la carta actual (p. ej. derivar `subcategoryId` por hash del `subcategory` si se elige la opción de id estable, o derivar del `id` del item).

## Cómo importar en Plane

1. Abre Plane en `https://app.plane.so` y navega al **proyecto Picaito**.
2. Click en `+ New work item` (o `+ Issue` según versión) → elige tipo **Task**.
3. En el campo de descripción, abre el editor markdown y **pega todo el contenido del cuerpo de este archivo** (sin el frontmatter YAML, sólo desde `# Refactor: ...` hasta la sección "OpenSpec Compatibility"). Plane interpreta markdown nativamente: headings, listas, checkboxes y bloques de código se renderizan correctamente.
4. Aplica los metadatos del frontmatter YAML manualmente en la barra lateral derecha del work item:
   - **Priority**: Medium
   - **Estimate**: 2-3h (en horas o puntos según tu configuración de Plane)
   - **Labels**: `tech-debt`, `pdf`, `refactor`, `menu` (crea las labels que no existan vía Settings → Labels antes de pegarlas)
   - **Assignee**: dejar vacío
   - **Parent**: ninguno
   - **Start date / Target date**: si quieres, déjalos en blanco
5. Click en **Create**. Una vez creado, los checkboxes de "Criterios de aceptación" aparecerán como sub-checklist nativo de Plane; márcalos conforme se verifiquen.

> **Tip**: si en el futuro se automatiza este import, el frontmatter YAML ya tiene la forma 1:1 con los campos de la API de Plane (`POST /api/v1/workspaces/{slug}/projects/{project_id}/issues/`).

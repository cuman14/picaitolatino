# AGENTS.md — Picaito Latino

Guía operativa para agentes de IA. **Léelo antes de cualquier cambio.**

## TL;DR

- Mobile-first, rendimiento crítico (Lighthouse ≥95)
- Astro 6 + TypeScript estricto. Sin JS en cliente salvo islands imprescindibles
- Componentes: **Dumb** (ui/) vs **Smart** (sections/, features/)
- i18n: `es`/`en` ahora, `fr` futuro. Nunca hardcodear textos
- Tailwind v4 planificado: sin `tailwind.config.js`, usa `@theme` en CSS
- Con Stitch: descomponer → buscar componente existente → proponer → esperar OK → implementar

---

## Environment Setup

- **Node:** `>=22.12.0` (ver `package.json` engines)
- **Install:** `npm install`
- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`

---

## Commands

| Acción           | Comando                      |
| ---------------- | ---------------------------- |
| Instalar deps    | `npm install`                |
| Dev server       | `npm run dev`                |
| Build producción | `npm run build`              |
| Preview build    | `npm run preview`            |
| Astro CLI        | `npm run astro -- <comando>` |

---

## Repository Structure

```
src/
  components/
    ui/           # Dumb components (Button, Card, Badge, Price...)
    sections/     # Smart components (HeroSection, MenuSection...)
    features/     # Smart complejos (Reservation, Cart...)
  layouts/
    BaseLayout.astro
  pages/
    index.astro          # Página principal (spañol default)
    [lang]/              # Rutas i18n futuras: /es/, /en/, /fr/
      index.astro
      carta.astro
  i18n/
    es.ts, en.ts, fr.ts  # Diccionarios tipados
    index.ts             # helpers t(), getLocalePaths()
  lib/
    content/             # Content adapters (preparado para CMS)
      dishes.ts
      categories.ts
      types.ts
  data/                  # Contenido JSON/TS provisional pre-CMS
  styles/
    global.css           # @import "tailwindcss"; @theme { ... }
  assets/
public/
```

---

## Architecture: Dumb vs Smart

Toda UI nueva **debe** clasificarse explícitamente.

### Dumb Components (`src/components/ui/`)

**Responsabilidad:** _cómo se ve_

- Solo props, markup, estilos
- **No** fetch, **no** acceso a `src/data/`, **no** `Astro.currentLocale`
- Props tipadas con valores por defecto
- Cero lógica de negocio
- Reutilizables en cualquier idioma

**Ejemplos:** `Button`, `Badge`, `Card`, `Price`, `ImageWithFallback`, `SectionHeading`

```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
const { variant = 'primary', size = 'md' } = Astro.props;
---
<button class={`btn btn--${variant} btn--${size}`}>
  <slot />
</button>
```

### Smart Components (`src/components/sections/`, `src/components/features/`)

**Responsabilidad:** _qué se muestra_

- Resuelven datos (CMS/data layer), traducciones, locale
- Componen Dumb components
- **No** definen estilos visuales nuevos
- Un Smart por sección de página

**Ejemplos:** `HeroSection`, `MenuSection`, `LocationSection`

```astro
---
// src/components/sections/MenuSection.astro
import { getDishes } from '../../lib/content/dishes';
import { t } from '../../i18n';
import DishCard from '../ui/DishCard.astro';

const locale = Astro.currentLocale || 'es';
const dishes = await getDishes(locale);
---
<section>
  <h2>{t('menu.title', locale)}</h2>
  {dishes.map(d => <DishCard dish={d} />)}
</section>
```

---

## Design System (Tailwind v4 - Planificado)

Cuando se migre a Tailwind v4:

- Configuración en CSS: `@import "tailwindcss"` en `src/styles/global.css`
- **Sin `tailwind.config.js`** — usa `@theme` en CSS para tokens
- Colores cálidos latinos, tipografía mobile-optimized
- **No** mezclar Tailwind con CSS scoped pesado
- Migración gradual componente a componente

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-spice-500: #c2410c;
  --color-arepa-100: #fef3c7;
  --font-display: "Inter", system-ui, sans-serif;
}
```

---

## i18n Rules

- **Nunca** hardcodear textos visibles
- Diccionarios en `src/i18n/{es,en,fr}.ts` exportando `as const`
- Helper `t(key, locale)` o `astro:i18n`
- Las claves i18n viven en **Smart components**, **no** en Dumbs
- URLs traducibles: `/es/carta`, `/en/menu`, `/fr/carte`
- `<html lang>`, `hreflang`, `og:locale` siempre correctos

---

## Performance (Mobile-First, No Negociable)

- **Astro islands:** JS solo donde sea imprescindible (`client:visible`, `client:idle`)
- Por defecto: **cero JS** enviado al cliente
- **Imágenes:** `<Image />` / `<Picture />` de Astro. Formatos `avif` + `webp`
  - `loading="lazy"` excepto LCP
  - Dimensiones explícitas siempre (evitar CLS)
- **Fonts:** auto-host, `font-display: swap`, subset latino
  - Máx 2 familias, máx 3 pesos
- **CSS:** purga automática con Tailwind v4
- **JS de terceros:** prohibido sin justificación (no jQuery, no bundles UI pesados)
- **Target:** Lighthouse mobile ≥95 en Performance
- **CDN:** aprovechar Vercel edge, páginas estáticas

---

## Stitch Workflow (Obligatorio)

Cuando el usuario pase una URL de **Google Stitch** (o diseño similar):

### Paso 1: Descomponetizar

Identificar antes de tocar código:

- Bloques presentacionales atómicos → candidatos a **Dumb**
- Bloques con datos/lógica → candidatos a **Smart**
- Tokens de diseño nuevos → mapear a Tailwind v4 `@theme`

### Paso 2: Buscar componente existente

En `src/components/`:

- Si **existe y encaja** → proponer mejora/extensión (nuevas props, variantes)
- Si **existe pero obsoleto** → proponer refactor
- Si **no existe** → proponer creación nueva con ubicación (Dumb/Smart) y API de props

### Paso 3: Presentar propuesta al usuario

Formato obligatorio:

```markdown
## Propuesta de descomposición

### Dumb a reutilizar

- <ComponentX> (mejoras: ...)

### Dumb a crear

- <NewBadge> props: { variant, icon }

### Smart a crear

- <MenuHighlights> consume DishRepository

### Tokens de diseño nuevos

- color.spice-500 #...
```

### Paso 4: Esperar confirmación

**Solo tras OK del usuario**, implementar.

### Paso 5: Implementar

Respetar: Architecture, i18n, Performance, Code Conventions.

---

## Content Layer (Preparado para CMS)

Hoy: `src/data/` (JSON/TS)
Futuro: Headless CMS (Sanity/Storyblok/Strapi)

**Regla:** Todo acceso a datos pasa por `src/lib/content/`:

```typescript
// src/lib/content/dishes.ts
export interface DishRepository {
  getAll(locale: string): Promise<Dish[]>;
  getById(id: string, locale: string): Promise<Dish | null>;
}

// Implementación actual (pre-CMS)
export const dishRepo: DishRepository = {
  async getAll(locale) {
    const data = await import(`../../data/menu.${locale}.json`);
    return data.default;
  },
  // ...
};
```

Así cambiar de fuente no toca componentes.

---

## Code Conventions

- **TypeScript:** estricto. Nada de `any` salvo justificado
- **Componentes Astro:** `interface Props` tipada siempre
- **Naming:**
  - `PascalCase` → componentes
  - `camelCase` → utilidades
  - `kebab-case` → archivos no-componente
- **Accesibilidad:** roles ARIA correctos, contraste AA, navegación teclado, `alt` siempre
- **Commits:** convencionales
  - `feat:` nueva funcionalidad
  - `fix:` corrección
  - `refactor:` sin cambio de comportamiento
  - `perf:` optimización
  - `i18n:` traducciones
  - `chore:` mantenimiento

---

## Design Patterns (Programming)

Patrones reutilizables para mantener código limpio y escalable.

### Repository Pattern

Abstracción de fuentes de datos para facilitar migración a CMS.

```typescript
// src/lib/content/dishes.ts
export interface DishRepository {
  getAll(locale: string): Promise<Dish[]>;
  getById(id: string, locale: string): Promise<Dish | null>;
  getByCategory(categoryId: string, locale: string): Promise<Dish[]>;
}
```

### Component Composition

Preferir composición sobre configuración masiva de props.

```astro
<!-- ✅ Correcto: slots para flexibilidad -->
<Card>
  <CardHeader icon="star" />
  <CardBody>
    <p>Contenido personalizado</p>
  </CardBody>
  <CardFooter>
    <Button>Acción</Button>
  </CardFooter>
</Card>

<!-- ❌ Evitar: props para cada variante -->
<Card headerIcon="star" bodyText="..." footerButtonText="..." />
```

### Props Pattern

- **Default props**: valores sensatos para reusabilidad
- **Variant props**: `variant`, `size`, `color` para estados visuales
- **Render props**: cuando se necesita control total del renderizado
- **Discriminated unions**: para props mutuamente exclusivas

### Lazy Loading

- Imágenes: `loading="lazy"` por defecto, excepto LCP
- Componentes islands: `client:visible` o `client:idle`
- Datos: streaming con `Promise` y slots de fallback

### Error Boundaries (Astro)

Usar `try/catch` en Smart components con fallback UI.

```astro
---
let dishes: Dish[] = [];
let error: string | null = null;

try {
  dishes = await getDishes(locale);
} catch (e) {
  error = 'Failed to load menu';
}
---
{error ? <ErrorMessage message={error} /> : <DishGrid {dishes} />}
```

---

## UX/UI Design Patterns

Patrones de interfaz probados para restaurantes y comercio móvil.

### Mobile-First Patterns

| Patrón               | Uso                                         | Implementación                      |
| -------------------- | ------------------------------------------- | ----------------------------------- |
| **Thumb Zone**       | CTAs principales en zona natural del pulgar | Botones ≥44×44px, bottom-aligned    |
| **Cards**            | Menú, platos, categorías                    | Imagen arriba, info abajo, tappable |
| **Bottom Sheet**     | Detalles, filtros, reservas                 | Deslizable, dismissible             |
| **Sticky Header**    | Navegación persistente                      | Altura reducida en scroll           |
| **Skeleton Loading** | Percepción de velocidad                     | Pulsing placeholders mientras carga |

### Restaurant-Specific Patterns

- **Menu Grid**: 2 columnas en móvil, categorías con iconos
- **Dish Card**: Imagen + nombre + precio + badge (vegano/picante)
- **Quick Actions**: Llamar, reservar, ver carta en header sticky
- **Social Proof**: Reviews/testimonios visibles en homepage
- **Location Map**: Integración nativa con enlace a Google Maps

### Navigation Patterns

```
Homepage
├── Hero (CTA principal: Ver Carta)
├── Categorías destacadas (horizontal scroll)
├── Platos estrella (grid 2 cols)
├── Info restaurante (horario, ubicación)
└── Footer (redes, legal)

Carta (/carta)
├── Sticky Category Tabs
├── Lista de platos por categoría
└── Floating CTA (Reservar)
```

### Accessibility Patterns

**Obligatorio en cada componente — WCAG 2.1 AA mínimo:**

#### Contraste de color

| Contexto                                 | Ratio mínimo | Notas                                                                                   |
| ---------------------------------------- | ------------ | --------------------------------------------------------------------------------------- |
| Texto normal (≥18px o bold ≥14px)        | **4.5:1**    | Usar `--color-secondary-text` (#8b6914), nunca `--color-secondary` (#c9a227) para texto |
| Texto grande (≥24px o bold ≥18.67px)     | **3:1**      | Títulos, headings                                                                       |
| Componentes UI (botones, iconos activos) | **3:1**      | Bordes, outlines                                                                        |
| **Texto sobre imagen/foto**              | **4.5:1**    | Siempre usar overlay CSS; denso solo en la zona del texto, no toda la imagen            |

#### Overlay sobre imágenes (CategoryCard, HeroCard)

```css
/* ✅ Correcto: gradiente localizado en la zona del texto */
background: linear-gradient(
  to top,
  rgba(0, 0, 0, 0.82) 0%,
  /* texto: ratio >9:1 */ rgba(0, 0, 0, 0.6) 35%,
  /* transición */ rgba(0, 0, 0, 0.1) 65%,
  /* imagen visible */ rgba(0, 0, 0, 0) 100%
    /* imagen completamente visible arriba */
);

/* ❌ Incorrecto: oscurece toda la imagen */
background: rgba(0, 0, 0, 0.6); /* bloquea la foto entera */
```

#### Estructura semántica

- Un solo `<h1>` por página
- Jerarquía `h1 > h2 > h3` sin saltar niveles
- `aria-label` en botones/links sin texto visible
- `aria-hidden="true"` en iconos decorativos
- `role` explícito cuando el elemento semántico no es suficiente

#### Interacción y foco

- **Touch targets**: mínimo 44×44px (móvil)
- **Focus visible**: `outline: 2px solid` en `:focus-visible`, nunca `outline: none`
- **Orden de tabulación**: lógico, de arriba a abajo, izquierda a derecha
- **Teclado**: todos los elementos interactivos accesibles con Tab/Enter/Space

#### Textos e imágenes

- `alt` siempre presente en `<img>` — descriptivo si la imagen aporta info, vacío `alt=""` si es decorativa
- No transmitir información solo por color (añadir texto o icono de apoyo)
- Tamaños de texto responsivos con `clamp()` — nunca `font-size` fijo en px para cuerpo

#### Movimiento

- Respetar `prefers-reduced-motion` en animaciones

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Performance UX Patterns

- **Progressive enhancement**: funciona sin JS, mejora con JS
- **Image placeholders**: blur-up o dominant color
- **Prefetch**: rutas probables en hover/tap start
- **Offline indicator**: banner si no hay conexión

---

## Checklist Pre-Cambio

- [ ] Mobile-first, no degrada Lighthouse (≥95)
- [ ] Textos en `src/i18n/`, no hardcodeados
- [ ] Componentes clasificados Dumb/Smart
- [ ] Reutilizar existentes antes de crear nuevos
- [ ] Acceso a datos vía `src/lib/content/` (CMS-ready)
- [ ] Cero JS innecesario (islands solo si imprescindible)
- [ ] Imágenes optimizadas con dimensiones explícitas
- [ ] Si hay URL Stitch: ¿propuse descomposición y obtuve OK?

### ✅ Checklist de Accesibilidad (obligatorio)

- [ ] Contraste texto/fondo ≥4.5:1 (normal) o ≥3:1 (grande/UI) — verificar con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Texto sobre imagen: overlay localizado en zona del texto, imagen visible en el resto
- [ ] `alt` en todas las `<img>` (descriptivo o `alt=""` si decorativa)
- [ ] `aria-hidden="true"` en iconos decorativos
- [ ] Touch targets ≥44×44px en móvil
- [ ] `:focus-visible` estilado, nunca `outline: none` sin alternativa
- [ ] Jerarquía de headings correcta (sin saltar niveles)
- [ ] Tamaños de fuente con `clamp()` — responsivos, no fijos
- [ ] `prefers-reduced-motion` respetado en animaciones

---

## Prohibido / Qué NO Hacer

- **Iconos:** Usar `@lucide/astro` (librería oficial Astro de Lucide). Instalar: `npm install @lucide/astro`
- No introducir React/Vue/Svelte sin discusión previa
- No instalar librerías UI pesadas (MUI, Chakra, Bootstrap)
- No mezclar Tailwind con frameworks CSS adicionales
- No hardcodear strings visibles ni rutas sin locale
- No leer `src/data/` directamente desde Dumb components
- No duplicar componentes: primero buscar, luego extender, por último crear
- No hacer cambios masivos sin propuesta previa al usuario

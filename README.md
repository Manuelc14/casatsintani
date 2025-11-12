# 🌿 Casa Tsíntani – Sitio Web Oficial

Sitio institucional de **Casa Tsíntani**, clínica de rehabilitación integral.
Construido con **Astro 5**, **Tailwind CSS 4** y **React 19 (Islands)** para ofrecer un sitio rápido, accesible y fácil de mantener.

---

## ⚙️ Stack técnico

| Tecnología | Rol |
|---|---|
| **Astro 5** | Generación **estática** (`output: "static"`), enrutamiento por archivos y partial hydration. |
| **@astrojs/react** | Integración de React para **islas interactivas** (client:load / client:visible). |
| **Tailwind CSS 4** + **@tailwindcss/vite** | Design system con tokens en `@theme`, variante `dark` y utilidades modernas. |
| **Framer Motion 12** | Animaciones fluidas y performantes en islas React. |
| **Lucide React** | Iconografía ligera y escalable. |
| **@astrojs/prefetch** | Prefetch de enlaces para transiciones de página más ágiles. |
| **Vite** | Bundling y DX veloz durante desarrollo. |

**Dependencias clave** (ver `package.json`):
- `astro`, `@astrojs/react`, `@astrojs/prefetch`
- `tailwindcss` `^4` + `@tailwindcss/vite`
- `react`, `react-dom` `^19`
- `framer-motion`, `lucide-react`

---

## 🏛️ Arquitectura y decisiones

### Renderizado
- **SSG** (Static Site Generation). No hay endpoints de servidor ni SSR; el sitio se publica como archivos estáticos en `dist/`.
- **Islas React** para interactividad puntual (acordeón FAQ, carrusel de testimonios, toggles, animaciones on-view). El resto es **Astro/HTML** para maximizar rendimiento.

### Estilos / Design System
- Tailwind v4 con `@import "tailwindcss";` y tokens en `@theme` definidos en `src/styles/global.css` (colores `--color-brand-*`, tipografías `--font-*`, radii, sombras, etc.).
- **Dark mode** mediante la variante personalizada `@custom-variant dark (&:where(.dark, .dark *));` y persistencia en `localStorage` (`ThemeToggle`).
- Conjunto de utilidades extendidas (sombras suaves, animaciones `fade-in`, `slide-in`, etc.).

### Interactividad
- **Framer Motion** para animaciones (e.g. `AnimateOnView`, `MotionReveal`, `Stagger`).
- **Islas** con hydration selectivo (`client:visible`, `client:load`) reducen JS enviado al cliente.
- Botón **WhatsApp** con teléfono/texto configurables. También está embebido un **widget de ElevenLabs Convai** en el layout base.

### Accesibilidad y SEO
- Enlaces con estados activo/foco y estructura semántica por secciones.
- Prefetch de enlaces con `@astrojs/prefetch` para UX instantánea.
- Metaetiquetas por página desde `BaseLayout` (título/description via `Astro.props`).

---

## 🧩 Estructura del proyecto

```

casatsintani/
├── astro.config.mjs           # Config principal (output estático, React, Prefetch, Tailwind v4 via Vite)
├── package.json               # Scripts y dependencias
├── tsconfig.json              # TS para el proyecto
├── Makefile                   # Atajos (dev / prepare)
├── .env                       # Variables públicas (WhatsApp)
├── src/
│   ├── assets/                # Imágenes y SVGs (logos, favicon, hero)
│   ├── styles/
│   │   └── global.css         # Tailwind v4 + tokens @theme + variantes
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML base, header/footer, widget Convai, theme/WA
│   ├── components/
│   │   ├── layout/
│   │   │   └── Footer.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro     # Hero principal (en ui/)
│   │   │   ├── Testimonios.astro
│   │   │   └── CTAFinal.astro
│   │   ├── islands/           # Islas React (interactividad)
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   ├── AnimateOnView.tsx / MotionReveal.tsx / Stagger.tsx
│   │   └── ui/
│   │       └── Hero.astro
│   └── pages/                 # Enrutamiento por archivos
│       ├── index.astro
│       ├── nosotros.astro / programas.astro / equipo.astro
│       ├── instalaciones.astro / familia.astro / educacion.astro
│       ├── testimonios.astro / contacto.astro / privacidad.astro
│       └── 404.astro
└── public/                    # (si aplica) estáticos adicionales

````

> **Nota:** el proyecto exporta a `dist/` con `astro build`. No hay adaptador SSR; cualquier hosting estático (Vercel/Netlify/CF Pages/FTP) funciona.

---

## 🔌 Integraciones y configuración

### `astro.config.mjs`
```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  vite: { plugins: [tailwind()] },
  integrations: [react(), prefetch()],
});
````

* **Tailwind v4** se habilita con el plugin oficial de Vite.
* **output: "static"** asegura SSG.

### Variables de entorno (`.env`)

```bash
PUBLIC_WHATSAPP_PHONE=+52XXXXXXXXXX
PUBLIC_WHATSAPP_TEXT="Hola, me gustaría recibir información sobre los programas de tratamiento."
```

> Variables que comienzan con `PUBLIC_` son accesibles en el cliente. Úsalas para parametrizar el botón de WhatsApp u otros componentes públicos.

### Scripts (NPM/PNPM)

```jsonc
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro"
}
```

Si usas **PNPM** (recomendado):

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

---

## 🧠 Páginas y composición

* Todas las páginas usan `BaseLayout.astro` para configurar `<head>`, `<body>`, el **header**, **footer**, el **ThemeToggle**, el **WhatsAppButton** y el **widget de asistencia** (ElevenLabs Convai).
* La home (`index.astro`) compone:

  * `Hero` (sección UI)
  * `AnimateOnView` / `MotionReveal` (islas para animaciones)
  * `Testimonios` (sección estática) + `TestimonialCarousel` (isla)
  * `FAQ` (isla React con acordeón accesible)
  * `CTAFinal`

---

## 🧱 Patrones de componentes

* **Islas React**: cada isla se encapsula en `src/components/islands/*` y se hidrata solo donde se usa.
* **Secciones Astro**: bloques de contenido reusables (`sections/*`) sin JS por defecto.
* **UI mínima**: componentes atómicos en `ui/` y layout en `layout/`.

**Ejemplo**: `AnimateOnView.tsx` con Framer Motion para revelar contenido en viewport:

```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5 }}
/>
```

---

## 🔒 Seguridad y privacidad

* Sin backend ni cookies propias; el sitio es **estático**.
* Widgets de terceros (WhatsApp, ElevenLabs) cargan desde sus CDNs. Verifica sus políticas si recopilas datos.
* Página dedicada de **Privacidad** en `src/pages/privacidad.astro`.

---

## 📈 Rendimiento

* **Astro** minimiza el JS por defecto; solo hidrata las islas necesarias.
* **@astrojs/prefetch** mejora la navegabilidad percibida.
* **Imágenes**: colócalas en `src/assets/` y usa formatos comprimidos (WebP/AVIF) cuando sea posible.
* **Tailwind v4**: no requiere purge manual; genera solo las clases usadas.

**Recomendaciones**:

* Reutiliza islas y evita hidratar componentes innecesarios.
* Prefiere secciones `.astro` para contenido estático/estilizado.
* Revisa pesos de framer-motion si una página tuviera muchas animaciones.

---

## 🚀 Desarrollo local

```bash
# 1) Instalar dependencias
pnpm install

# 2) Ejecutar entorno de desarrollo
pnpm dev
# http://localhost:4321

# 3) Build de producción
pnpm build
# genera ./dist
```

---

## 🌐 Despliegue

Cualquier proveedor de estáticos sirve:

* **Vercel**, **Netlify**, **Cloudflare Pages**, **Render** o **FTP/SSH** tradicional.

> Si usas Vercel/Netlify, selecciona framework **Astro**, comando `pnpm build` y output `dist/`.


---

## 👨‍💻 **Autor**

**Manuel C.**  
📍 [github.com/Manuelc14](https://github.com/Manuelc14)

---

## 📜 **Licencia**

Este proyecto es de uso privado.  
© **Casa Tsíntani**, todos los derechos reservados.

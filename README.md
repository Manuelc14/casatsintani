# 🌿 **Casa Tsíntani – Sitio Web Oficial**

> Sitio web institucional de **Casa Tsíntani**, clínica de rehabilitación integral.  
> Desarrollado con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com) para ofrecer un sitio rápido, moderno y optimizado.

---

## ⚙️ **Tecnologías principales**

| Tecnología          | Descripción                                                        |
| ------------------- | ------------------------------------------------------------------ |
| ⚡ **Astro**        | Framework web moderno y ligero para contenido estático y dinámico. |
| 🎨 **Tailwind CSS** | Sistema de utilidades para diseño responsivo y limpio.             |
| 🧠 **TypeScript**   | Tipado estático y seguridad en el código.                          |
| ⚙️ **Vite**         | Entorno de desarrollo ultra rápido.                                |
| 🧩 **PNPM**         | Gestor de paquetes eficiente y liviano.                            |

---

## 🚀 **Instalación y ejecución local**

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Manuelc14/casatsintani.git
   cd casatsintani
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   # o npm install
   ```

3. **Iniciar el servidor de desarrollo**

   ```bash
   pnpm dev
   ```

   📍 El sitio estará disponible en: [http://localhost:4321](http://localhost:4321)

---

## 🧩 **Estructura del proyecto**

```
casatsintani/
├── src/
│   ├── components/
│   │   ├── islands/          # Componentes interactivos (TSX)
│   │   ├── layout/           # Header, Footer, etc.
│   │   └── ui/               # Hero y otros bloques reutilizables
│   ├── layouts/              # Plantillas base de página
│   ├── pages/                # Secciones del sitio
│   └── styles/               # Estilos globales
├── public/                   # Recursos estáticos (imágenes, íconos)
├── astro.config.mjs          # Configuración principal
├── tsconfig.json             # Configuración de TypeScript
├── package.json              # Dependencias y scripts
└── pnpm-lock.yaml            # Bloqueo de dependencias
```

---

## 🧱 **Comandos útiles**

| Comando        | Descripción                                        |
| -------------- | -------------------------------------------------- |
| `pnpm dev`     | Inicia el entorno de desarrollo                    |
| `pnpm build`   | Genera los archivos para producción (`/dist`)      |
| `pnpm preview` | Vista previa local del build                       |
| `pnpm lint`    | Analiza el código con ESLint (si está configurado) |

---

## 🌐 **Despliegue**

Puede desplegarse fácilmente en:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- Cualquier hosting con soporte estático (por FTP o SSH)

**Comando de build:**

```bash
pnpm build
```

El resultado se genera en la carpeta **`dist/`**, lista para subir.

---

## 👨‍💻 **Autor**

**Manuel C.**  
📍 [github.com/Manuelc14](https://github.com/Manuelc14)

---

## 📜 **Licencia**

Este proyecto es de uso privado.  
© **Casa Tsíntani**, todos los derechos reservados.

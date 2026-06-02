# pulso-ayuda

Sitio estático con la guía de ayuda de PULSO CRM. Pensado para vivir en
`ayuda.pulsocrm.com.mx`.

## Stack

- Vite 7 + React 19
- Tailwind CSS v4 (vía `@tailwindcss/vite`)

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve dist/ para verificar
```

## Imágenes

Todas las capturas viven en `public/img/` con nombres `img-XX-descripcion.png`.
Hasta que se suban los archivos reales, los componentes muestran placeholders
grises con el nombre del archivo esperado y el `alt` text. Cualquier `<img>`
que falle al cargar simplemente se oculta vía `onError`, dejando ver el
placeholder de fondo.

Para reemplazar un placeholder:
1. Sube el PNG con el nombre exacto a `public/img/`.
2. Recarga. Vite lo sirve automáticamente sin tocar código.

## Deploy

Apuntado para Vercel:
1. Crear repo en GitHub (`pulso-ayuda`).
2. Importar en Vercel — detecta Vite y configura todo solo.
3. Apuntar `ayuda.pulsocrm.com.mx` al proyecto desde DNS + Vercel Domains.

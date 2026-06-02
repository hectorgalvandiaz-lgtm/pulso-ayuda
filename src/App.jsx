import { useState } from 'react'

const SECCIONES = [
  { id: 'primeros-pasos', label: 'Primeros pasos' },
  { id: 'contpaqi',       label: 'CONTPAQi' },
  { id: 'cotizaciones',   label: 'Cotizaciones' },
  { id: 'pipeline',       label: 'Pipeline' },
  { id: 'movil',          label: 'Móvil' },
]

const URL_CRM = 'https://www.pulsocrm.com.mx'

export default function App() {
  return (
    <div className="text-slate-800">
      <Header />
      <Hero />
      <PrimerosPasos />
      <Contpaqi />
      <Cotizaciones />
      <Pipeline />
      <Movil />
      <Footer />
    </div>
  )
}

// ============================================================================
// HEADER
// ============================================================================

function Header() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo />
          <div className="leading-tight">
            <div className="font-bold text-slate-900">PULSO</div>
            <div className="text-[11px] text-slate-500">Centro de Ayuda</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {SECCIONES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href={URL_CRM}
          className="hidden sm:inline-flex px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg text-sm font-semibold transition shadow-sm"
        >
          Ir al CRM →
        </a>

        <button
          onClick={() => setAbierto((v) => !v)}
          className="md:hidden p-2 -mr-2 text-slate-700"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={abierto ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {abierto && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {SECCIONES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setAbierto(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50"
              >
                {s.label}
              </a>
            ))}
            <a
              href={URL_CRM}
              className="mt-2 px-3 py-2.5 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold rounded-lg"
            >
              Ir al CRM →
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function Logo() {
  return (
    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
    </div>
  )
}

// ============================================================================
// HERO
// ============================================================================

function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden text-white"
      style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#3730a3 50%,#581c87 100%)' }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
          Guía completa de PULSO CRM
        </h1>
        <p className="mt-5 text-lg text-blue-100 max-w-2xl mx-auto">
          Aprende a sacarle el máximo provecho a tu CRM. Diseñado para equipos
          comerciales en México.
        </p>

        <div className="mt-10 max-w-xl mx-auto">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Buscar en la documentación… (próximamente)"
              disabled
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/95 text-slate-900 placeholder:text-slate-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300/40 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2 text-xs">
          {SECCIONES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-blue-50 font-medium transition"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// LAYOUT HELPERS
// ============================================================================

function Seccion({ id, eyebrow, titulo, intro, children }) {
  return (
    <section id={id} className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600">
            {eyebrow}
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {titulo}
          </h2>
          {intro && (
            <p className="mt-3 text-slate-600 max-w-3xl">{intro}</p>
          )}
        </div>
        <div className="space-y-12">{children}</div>
      </div>
    </section>
  )
}

function Paso({ numero, titulo, children, imagenes = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
            {numero}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">{titulo}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{children}</p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7">
        <div className={imagenes.length > 1 ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
          {imagenes.map((img) => (
            <Placeholder key={img.src} src={img.src} alt={img.alt} />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Imagen con fallback a placeholder gris cuando el archivo aún no existe.
 * Héctor reemplazará los PNGs en /public/img/.
 */
function Placeholder({ src, alt }) {
  return (
    <div className="relative aspect-video rounded-lg border border-slate-200 bg-slate-100 overflow-hidden group">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs p-4 text-center pointer-events-none">
        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div className="font-mono opacity-70">{src.replace('/img/', '')}</div>
        <div className="mt-1 italic">{alt}</div>
      </div>
    </div>
  )
}

// ============================================================================
// SECCIÓN 1: PRIMEROS PASOS
// ============================================================================

function PrimerosPasos() {
  return (
    <Seccion
      id="primeros-pasos"
      eyebrow="Sección 1"
      titulo="Primeros pasos en PULSO CRM"
      intro="Lo esencial para arrancar: ingresar, navegar el CRM y registrar tu primera empresa."
    >
      <Paso
        numero="1"
        titulo="Ingresa a PULSO CRM"
        imagenes={[
          { src: '/img/img-01-login.png',       alt: 'Login en desktop' },
          { src: '/img/img-02-login-movil.png', alt: 'Login en móvil' },
        ]}
      >
        Abre tu navegador y visita <strong>www.pulsocrm.com.mx</strong>. Ingresa
        tu correo y contraseña. Si es tu primera vez, usa las credenciales que
        recibiste por email.
      </Paso>

      <Paso
        numero="2"
        titulo="Tu Dashboard"
        imagenes={[{ src: '/img/img-08-dashboard.png', alt: 'Dashboard con datos' }]}
      >
        Al iniciar sesión verás tu resumen comercial: empresas activas,
        contactos, oportunidades abiertas e ingresos del mes. Todo actualizado
        en tiempo real.
      </Paso>

      <Paso
        numero="3"
        titulo="Navega por los módulos"
        imagenes={[
          { src: '/img/img-06-sidebar.png',       alt: 'Sidebar completo' },
          { src: '/img/img-m3-sidebar-movil.png', alt: 'Sidebar móvil' },
        ]}
      >
        El menú lateral tiene acceso a todos los módulos. En móvil, toca el
        ícono <span className="font-mono">≡</span> para abrir el menú.
      </Paso>

      <Paso
        numero="4"
        titulo="Agrega tu primera empresa"
        imagenes={[{ src: '/img/img-04-form-empresa.png', alt: 'Formulario nueva empresa' }]}
      >
        Ve a <strong>Empresas → Nueva empresa</strong>. Llena los datos
        comerciales y fiscales. <em>Tip:</em> Si tienes CONTPAQi conectado, tus
        clientes se sincronizan automáticamente.
      </Paso>

      <Paso
        numero="5"
        titulo="Ficha completa del cliente"
        imagenes={[{ src: '/img/img-05-ficha-empresa.png', alt: 'Ficha empresa con 4 tabs' }]}
      >
        Cada empresa tiene su ficha 360° con información general, contactos
        vinculados, oportunidades activas y el historial de actividades.
      </Paso>

      <Paso
        numero="6"
        titulo="Configura tu empresa"
        imagenes={[{ src: '/img/img-01b-configuracion.png', alt: 'Configuración Mi empresa' }]}
      >
        En <strong>Configuración</strong> puedes subir tu logo, definir colores
        de marca y configurar datos fiscales que aparecerán en tus
        cotizaciones.
      </Paso>
    </Seccion>
  )
}

// ============================================================================
// SECCIÓN 2: CONTPAQi
// ============================================================================

function Contpaqi() {
  return (
    <Seccion
      id="contpaqi"
      eyebrow="Sección 2"
      titulo="Conectar CONTPAQi"
      intro="La integración estrella de PULSO. Conectarla elimina la doble captura para siempre."
    >
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-sm text-blue-900 leading-relaxed">
            PULSO es el único CRM mexicano con integración nativa a{' '}
            <strong>CONTPAQi Comercial Pro</strong>. Conectarlo sincroniza
            automáticamente: clientes, productos, precios, condiciones de pago
            y vendedores — sin re-captura manual.
          </p>
        </div>
      </div>

      <Paso
        numero="1"
        titulo="Genera tu token de conexión"
        imagenes={[
          { src: '/img/img-07-tab-contpaqi.png',       alt: 'Tab Conexión CONTPAQi' },
          { src: '/img/img-08b-token-generado.png',    alt: 'Token generado' },
          { src: '/img/img-09-token-activo.png',       alt: 'Token activo en lista' },
        ]}
      >
        Ve a <strong>Configuración → Conexión CONTPAQi → Generar token</strong>.
        Dale un nombre descriptivo (ej: "Servidor Principal").
        <span className="block mt-2 text-red-700 font-semibold">
          IMPORTANTE: copia el token inmediatamente, no podrás verlo de nuevo.
        </span>
      </Paso>

      <Paso
        numero="2"
        titulo="Instala el PULSO Bridge"
        imagenes={[{ src: '/img/img-09b-config-json.png', alt: 'config.json en Notepad' }]}
      >
        Descarga el instalador <strong>PULSO Bridge</strong> en el servidor
        donde corre CONTPAQi. Ejecuta <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">instalar_bridge.bat</span> como
        Administrador. El instalador configura todo automáticamente.
      </Paso>

      <Paso
        numero="3"
        titulo="Verificar la sincronización"
        imagenes={[{ src: '/img/img-10-bridge-log.png', alt: 'Log Bridge ciclo finalizado' }]}
      >
        El Bridge sincroniza automáticamente cada <strong>15 minutos</strong>.
        Puedes verificar que funciona correctamente revisando el log.
      </Paso>

      <Paso
        numero="4"
        titulo="Revisa tus catálogos sincronizados"
        imagenes={[
          { src: '/img/img-19-catalogo-cond-pago.png', alt: 'Catálogo Condiciones de pago' },
          { src: '/img/img-22-catalogo-impuestos.png', alt: 'Catálogo Impuestos' },
        ]}
      >
        En <strong>Catálogo</strong> verás todos los datos que llegaron de
        CONTPAQi: productos, condiciones de pago, monedas, impuestos y
        vendedores.
      </Paso>
    </Seccion>
  )
}

// ============================================================================
// SECCIÓN 3: COTIZACIONES Y PORTAL
// ============================================================================

function Cotizaciones() {
  return (
    <Seccion
      id="cotizaciones"
      eyebrow="Sección 3"
      titulo="Cotizaciones y Portal del Cliente"
      intro="Cotizar, enviar al cliente y cerrar — todo en un solo flujo, con pedido CONTPAQi automático."
    >
      <Paso
        numero="1"
        titulo="Lista de cotizaciones"
        imagenes={[{ src: '/img/img-11-lista-cotizaciones.png', alt: 'Lista cotizaciones' }]}
      >
        En <strong>Cotizaciones</strong> verás todas tus propuestas organizadas
        por estado: Borrador, Enviada, Vista, Aceptada, Rechazada. Puedes
        filtrar y ordenar por cualquier columna.
      </Paso>

      <Paso
        numero="2"
        titulo="Crea una cotización"
        imagenes={[{ src: '/img/img-12-editor-cotizacion.png', alt: 'Editor cotización' }]}
      >
        Haz clic en <strong>Nueva cotización</strong>. Selecciona la empresa y
        contacto, elige los productos del catálogo y el sistema calcula
        subtotal, IVA y total automáticamente.
      </Paso>

      <Paso
        numero="3"
        titulo="Genera el PDF"
        imagenes={[{ src: '/img/img-13-pdf-browser.png', alt: 'PDF en browser' }]}
      >
        Con un clic genera un PDF profesional con tu logo y datos fiscales.
        Puedes guardarlo o enviarlo directamente.
      </Paso>

      <Paso
        numero="4"
        titulo="Envía al cliente"
      >
        Usa el botón <strong>Enviar por email</strong> para que el cliente
        reciba la cotización con un link al Portal del Cliente. También puedes
        enviarla por WhatsApp.
      </Paso>

      <Paso
        numero="5"
        titulo="Portal del Cliente"
        imagenes={[
          { src: '/img/img-14-portal-cliente.png',  alt: 'Portal del cliente' },
          { src: '/img/img-15-modal-aceptar.png',   alt: 'Modal aceptar cotización' },
          { src: '/img/img-16-cot-aceptada.png',    alt: 'Cotización aceptada' },
        ]}
      >
        Tu cliente recibe un link único y seguro donde puede ver el detalle
        completo, los términos y decidir si acepta o rechaza — sin necesidad
        de cuenta ni contraseña.
      </Paso>

      <Paso
        numero="6"
        titulo="Pedido automático en CONTPAQi"
      >
        Cuando el cliente acepta, PULSO notifica a tu equipo por email y en el
        próximo ciclo del Bridge crea automáticamente el Pedido en CONTPAQi
        con serie <strong>PCRM</strong> — sin que nadie tenga que re-capturar
        nada.
      </Paso>
    </Seccion>
  )
}

// ============================================================================
// SECCIÓN 4: PIPELINE
// ============================================================================

function Pipeline() {
  return (
    <Seccion
      id="pipeline"
      eyebrow="Sección 4"
      titulo="Pipeline y seguimiento de oportunidades"
      intro="Visualiza tu pipeline, mueve oportunidades entre etapas y revisa la historia automática."
    >
      <Paso
        numero="1"
        titulo="Kanban de ventas"
        imagenes={[
          { src: '/img/img-16b-kanban.png',         alt: 'Kanban de ventas' },
          { src: '/img/img-17-kanban-tarjeta.png',  alt: 'Tarjeta de oportunidad en Kanban' },
        ]}
      >
        En <strong>Oportunidades</strong> verás tu pipeline visual. Arrastra
        las tarjetas entre columnas para actualizar la etapa. Cada tarjeta
        muestra el valor, la empresa y la probabilidad.
      </Paso>

      <Paso
        numero="2"
        titulo="Detalle de la oportunidad"
        imagenes={[{ src: '/img/img-18-detalle-oportunidad.png', alt: 'Detalle oportunidad' }]}
      >
        Haz clic en cualquier oportunidad para ver su ficha completa: valor,
        probabilidad, empresa, contacto y las etapas disponibles para avanzar.
      </Paso>

      <Paso
        numero="3"
        titulo="Historia automática (El Chismoso)"
        imagenes={[{ src: '/img/img-19b-chismoso.png', alt: 'El Chismoso timeline' }]}
      >
        La pestaña <strong>Historia</strong> registra automáticamente TODO lo
        que pasa con esa oportunidad: cambios de etapa, cotizaciones enviadas,
        cuándo el cliente abrió el portal, si aceptó o rechazó, y el pedido
        generado en CONTPAQi. <em>Nunca más preguntarás "¿en qué quedamos con
        este cliente?"</em>
      </Paso>
    </Seccion>
  )
}

// ============================================================================
// SECCIÓN 5: MÓVIL
// ============================================================================

function Movil() {
  return (
    <Seccion
      id="movil"
      eyebrow="Sección 5"
      titulo="Accede desde donde estés"
      intro="PULSO CRM es 100% responsivo. Funciona perfectamente en cualquier dispositivo — celular, tablet, computadora… o incluso desde la pantalla de tu Tesla."
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
        <Placeholder src="/img/img-m1-login-movil.png"      alt="Login móvil" />
        <Placeholder src="/img/img-m4-dashboard-movil.png"  alt="Dashboard móvil" />
        <Placeholder src="/img/img-m2-empresas-movil.png"   alt="Empresas móvil" />
        <Placeholder src="/img/img-m3-sidebar-movil.png"    alt="Sidebar móvil" />
      </div>

      <div className="relative w-full rounded-xl border border-slate-200 bg-slate-100 overflow-hidden">
        <div className="aspect-[21/9] relative">
          <img
            src="/img/img-tesla.png"
            alt="PULSO CRM corriendo en pantalla de Tesla"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs p-4 text-center pointer-events-none">
            <span className="text-5xl mb-2">🚗</span>
            <div className="font-mono opacity-70">img-tesla.png</div>
          </div>
        </div>
        <div className="px-4 py-3 text-center text-sm text-slate-600 italic bg-white">
          PULSO CRM — accesible desde cualquier lugar
        </div>
      </div>
    </Seccion>
  )
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo />
            <div>
              <div className="font-bold text-white">PULSO CRM</div>
              <div className="text-xs text-slate-400">Centro de Ayuda</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            CRM mexicano con integración nativa a CONTPAQi Comercial Pro.
          </p>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            ¿Necesitas ayuda?
          </div>
          <a
            href="https://wa.me/523341624372"
            target="_blank"
            rel="noreferrer"
            className="block text-sm hover:text-white transition"
          >
            WhatsApp: +52 334 162 4372
          </a>
          <a
            href="mailto:asistencia@pulsocrm.com.mx"
            className="block text-sm mt-1 hover:text-white transition"
          >
            asistencia@pulsocrm.com.mx
          </a>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Plataforma
          </div>
          <a
            href={URL_CRM}
            className="inline-flex items-center gap-1.5 text-sm text-white hover:text-blue-300 transition"
          >
            Volver al CRM
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © 2026 PULSO CRM · COMPURIGHT · Morelia, México
      </div>
    </footer>
  )
}

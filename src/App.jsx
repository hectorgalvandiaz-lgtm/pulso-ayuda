import { useState } from 'react'

// ============================================================================
// CONSTANTES
// ============================================================================

const URL_CRM = 'https://www.pulsocrm.com.mx'
const URL_WHATSAPP = 'https://wa.me/523341624372'
const EMAIL_SOPORTE = 'asistencia@pulsocrm.com.mx'

const SECCIONES_NAV = [
  { id: 'primeros-pasos', label: 'Primeros pasos' },
  { id: 'contpaqi',       label: 'CONTPAQi' },
  { id: 'cotizaciones',   label: 'Cotizaciones' },
  { id: 'pipeline',       label: 'Pipeline' },
  { id: 'movil',          label: 'Móvil' },
]

// ============================================================================
// APP
// ============================================================================

export default function App() {
  return (
    <>
      <Navbar />
      <main className="guia-wrap">
        <Hero />
        <PrimerosPasos />
        <Contpaqi />
        <Cotizaciones />
        <Pipeline />
        <Movil />
      </main>
      <Footer />
    </>
  )
}

// ============================================================================
// NAVBAR (sticky)
// ============================================================================

function Navbar() {
  const [abierto, setAbierto] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 flex-shrink-0">
          <Logo />
          <div className="leading-tight">
            <div className="font-bold text-slate-900 text-[15px]">PULSO</div>
            <div className="text-[11px] text-slate-500">Guía de ayuda</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {SECCIONES_NAV.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0052CC] transition"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href={URL_CRM}
          className="hidden sm:inline-flex px-4 py-2 bg-[#0052CC] hover:bg-[#003d99] text-white rounded-lg text-sm font-semibold transition flex-shrink-0"
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
            {SECCIONES_NAV.map((s) => (
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
              className="mt-2 px-3 py-2.5 text-center bg-[#0052CC] text-white text-sm font-semibold rounded-lg"
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
    <div className="w-9 h-9 bg-[#0052CC] rounded-lg flex items-center justify-center flex-shrink-0">
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
    <section id="top" className="guia-hero">
      <h1>Guía completa de PULSO CRM</h1>
      <p>
        Aprende a sacarle el máximo provecho a tu CRM. Diseñado para equipos
        comerciales en México.
      </p>
      <div className="guia-nav">
        {SECCIONES_NAV.map((s) => (
          <a key={s.id} href={`#${s.id}`}>{s.label}</a>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// COMPONENTES REUTILIZABLES
// ============================================================================

function Seccion({ id, numero, titulo, intro, children }) {
  return (
    <section id={id} className="seccion">
      <div className="seccion-header">
        <div className="seccion-num">{numero}</div>
        <h2>{titulo}</h2>
      </div>
      {intro && <p className="seccion-intro">{intro}</p>}
      {children}
    </section>
  )
}

/**
 * Una imagen renderizada según su variante:
 *   img-tesla.png  → clase .img-tesla (object-contain, max-h 400)
 *   img-m*.png     → wrap centrado con marco de teléfono (180px)
 *   resto          → desktop normal (width:100%, height:auto)
 */
function ImagenPaso({ src, alt }) {
  const props = {
    src,
    alt,
    loading: 'lazy',
    onError: (e) => { e.currentTarget.style.display = 'none' },
  }

  if (src.includes('tesla')) {
    return <img {...props} className="img-tesla" />
  }
  if (/\/img-m\d/i.test(src)) {
    return (
      <div className="img-movil-wrap">
        <img {...props} className="img-movil" />
      </div>
    )
  }
  // Desktop: NO usar className adicional — el CSS .paso-img img maneja el estilo
  return <img {...props} />
}

/**
 * Un paso de la guía. `numero` es 1-based; los pares (2, 4, 6...) llevan la
 * clase .par que invierte el orden (imagen izq, texto der).
 */
function Paso({ numero, titulo, imagenes = [], tip, children }) {
  const par = numero % 2 === 0
  return (
    <div className={par ? 'paso par' : 'paso'}>
      <div className="paso-texto">
        <span className="paso-num">Paso {numero}</span>
        <h3>{titulo}</h3>
        {/* children puede ser texto, jsx, o un array de <p>'s */}
        <div>{children}</div>
        {tip && (
          <div className="tip-box">
            <p>{tip}</p>
          </div>
        )}
      </div>
      <div className="paso-img">
        {imagenes.map((img) => (
          <ImagenPaso key={img.src} src={img.src} alt={img.alt} />
        ))}
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
      numero={1}
      titulo="Primeros pasos"
      intro="Lo esencial para arrancar: ingresar, navegar el CRM y registrar tu primera empresa."
    >
      <Paso
        numero={1}
        titulo="Ingresa a PULSO CRM"
        imagenes={[{ src: '/img/img-01-login.png', alt: 'Login en desktop' }]}
      >
        <p>
          Abre tu navegador y visita <strong>www.pulsocrm.com.mx</strong>.
          Ingresa tu correo y contraseña. Si es tu primera vez, usa las
          credenciales que recibiste por email.
        </p>
      </Paso>

      <Paso
        numero={2}
        titulo="Tu Dashboard"
        imagenes={[{ src: '/img/img-08-dashboard.png', alt: 'Dashboard con datos' }]}
      >
        <p>
          Al iniciar sesión verás tu resumen comercial: empresas activas,
          contactos, oportunidades abiertas e ingresos del mes. Todo
          actualizado en tiempo real.
        </p>
      </Paso>

      <Paso
        numero={3}
        titulo="Navega por los módulos"
        imagenes={[{ src: '/img/img-06-sidebar.png', alt: 'Sidebar completo' }]}
      >
        <p>
          El menú lateral tiene acceso a todos los módulos. En móvil, toca el
          ícono <span className="font-mono">≡</span> para abrir el menú.
        </p>
      </Paso>

      <Paso
        numero={4}
        titulo="Agrega tu primera empresa"
        imagenes={[{ src: '/img/img-04-form-empresa.png', alt: 'Formulario nueva empresa' }]}
        tip="Si tienes CONTPAQi conectado, tus clientes se sincronizan automáticamente — no hace falta capturarlos a mano."
      >
        <p>
          Ve a <strong>Empresas → Nueva empresa</strong>. Llena los datos
          comerciales y fiscales.
        </p>
      </Paso>

      <Paso
        numero={5}
        titulo="Ficha completa del cliente"
        imagenes={[{ src: '/img/img-05-ficha-empresa.png', alt: 'Ficha empresa con 4 tabs' }]}
      >
        <p>
          Cada empresa tiene su ficha 360° con información general, contactos
          vinculados, oportunidades activas y el historial de actividades.
        </p>
      </Paso>

      <Paso
        numero={6}
        titulo="Configura tu empresa"
        imagenes={[{ src: '/img/img-01b-configuracion.png', alt: 'Configuración Mi empresa' }]}
      >
        <p>
          En <strong>Configuración</strong> puedes subir tu logo, definir
          colores de marca y configurar datos fiscales que aparecerán en tus
          cotizaciones.
        </p>
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
      numero={2}
      titulo="Conectar CONTPAQi"
      intro="PULSO es el único CRM mexicano con integración nativa a CONTPAQi Comercial Pro. Conectarlo sincroniza automáticamente clientes, productos, precios, condiciones de pago y vendedores — sin re-captura manual."
    >
      <Paso
        numero={1}
        titulo="Genera tu token de conexión"
        imagenes={[{ src: '/img/img-07-tab-contpaqi.png', alt: 'Tab Conexión CONTPAQi' }]}
        tip="IMPORTANTE: copia el token inmediatamente — por seguridad, no podrás verlo de nuevo."
      >
        <p>
          Ve a <strong>Configuración → Conexión CONTPAQi → Generar token</strong>.
          Dale un nombre descriptivo (ej: "Servidor Principal").
        </p>
      </Paso>

      <Paso
        numero={2}
        titulo="Instala el PULSO Bridge"
        imagenes={[{ src: '/img/img-09b-config-json.png', alt: 'config.json en Notepad' }]}
      >
        <p>
          Descarga el instalador <strong>PULSO Bridge</strong> en el servidor
          donde corre CONTPAQi. Ejecuta{' '}
          <span className="font-mono text-xs bg-slate-200 px-1.5 py-0.5 rounded">instalar_bridge.bat</span>{' '}
          como Administrador. El instalador configura todo automáticamente.
        </p>
      </Paso>

      <Paso
        numero={3}
        titulo="Verificar la sincronización"
        imagenes={[{ src: '/img/img-10-bridge-log.png', alt: 'Log Bridge ciclo finalizado' }]}
      >
        <p>
          El Bridge sincroniza automáticamente cada <strong>15 minutos</strong>.
          Puedes verificar que funciona correctamente revisando el log.
        </p>
      </Paso>

      <Paso
        numero={4}
        titulo="Revisa tus catálogos sincronizados"
        imagenes={[{ src: '/img/img-19-catalogo-cond-pago.png', alt: 'Catálogo Condiciones de pago' }]}
      >
        <p>
          En <strong>Catálogo</strong> verás todos los datos que llegaron de
          CONTPAQi: productos, condiciones de pago, monedas, impuestos y
          vendedores.
        </p>
      </Paso>
    </Seccion>
  )
}

// ============================================================================
// SECCIÓN 3: COTIZACIONES
// ============================================================================

function Cotizaciones() {
  return (
    <Seccion
      id="cotizaciones"
      numero={3}
      titulo="Cotizaciones y Portal del Cliente"
      intro="Cotizar, enviar al cliente y cerrar — todo en un solo flujo, con pedido CONTPAQi automático al aceptar."
    >
      <Paso
        numero={1}
        titulo="Lista de cotizaciones"
        imagenes={[{ src: '/img/img-11-lista-cotizaciones.png', alt: 'Lista cotizaciones' }]}
      >
        <p>
          En <strong>Cotizaciones</strong> verás todas tus propuestas
          organizadas por estado: Borrador, Enviada, Vista, Aceptada,
          Rechazada. Puedes filtrar y ordenar por cualquier columna.
        </p>
      </Paso>

      <Paso
        numero={2}
        titulo="Crea una cotización"
        imagenes={[{ src: '/img/img-12-editor-cotizacion.png', alt: 'Editor cotización' }]}
      >
        <p>
          Haz clic en <strong>Nueva cotización</strong>. Selecciona la empresa
          y contacto, elige los productos del catálogo y el sistema calcula
          subtotal, IVA y total automáticamente.
        </p>
      </Paso>

      <Paso
        numero={3}
        titulo="Genera el PDF"
        imagenes={[{ src: '/img/img-13-pdf-browser.png', alt: 'PDF en browser' }]}
      >
        <p>
          Con un clic genera un PDF profesional con tu logo y datos fiscales.
          Puedes guardarlo o enviarlo directamente al cliente.
        </p>
      </Paso>

      <Paso
        numero={4}
        titulo="Envía al cliente"
        imagenes={[{ src: '/img/img-14-portal-cliente.png', alt: 'Portal del cliente' }]}
      >
        <p>
          Usa el botón <strong>Enviar por email</strong> para que el cliente
          reciba la cotización con un link al Portal del Cliente. También
          puedes enviarla por WhatsApp.
        </p>
      </Paso>

      <Paso
        numero={5}
        titulo="Portal del Cliente"
        imagenes={[{ src: '/img/img-15-modal-aceptar.png', alt: 'Modal aceptar cotización' }]}
      >
        <p>
          Tu cliente recibe un link único y seguro donde puede ver el detalle
          completo, los términos y decidir si acepta o rechaza — sin necesidad
          de cuenta ni contraseña.
        </p>
      </Paso>

      <Paso
        numero={6}
        titulo="Pedido automático en CONTPAQi"
        imagenes={[{ src: '/img/img-16-cot-aceptada.png', alt: 'Cotización aceptada' }]}
        tip="Sin que nadie tenga que re-capturar nada: el pedido aparece en CONTPAQi con serie PCRM al siguiente ciclo del Bridge."
      >
        <p>
          Cuando el cliente acepta, PULSO notifica a tu equipo por email y en
          el próximo ciclo del Bridge crea automáticamente el Pedido en
          CONTPAQi.
        </p>
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
      numero={4}
      titulo="Pipeline y seguimiento"
      intro="Visualiza tu pipeline, mueve oportunidades entre etapas y revisa la historia automática de cada cliente."
    >
      <Paso
        numero={1}
        titulo="Kanban de ventas"
        imagenes={[{ src: '/img/img-16b-kanban.png', alt: 'Kanban de ventas' }]}
      >
        <p>
          En <strong>Oportunidades</strong> verás tu pipeline visual. Arrastra
          las tarjetas entre columnas para actualizar la etapa. Cada tarjeta
          muestra el valor, la empresa y la probabilidad.
        </p>
      </Paso>

      <Paso
        numero={2}
        titulo="Detalle de la oportunidad"
        imagenes={[{ src: '/img/img-18-detalle-oportunidad.png', alt: 'Detalle oportunidad' }]}
      >
        <p>
          Haz clic en cualquier oportunidad para ver su ficha completa: valor,
          probabilidad, empresa, contacto y las etapas disponibles para
          avanzar.
        </p>
      </Paso>

      <Paso
        numero={3}
        titulo='Historia automática ("El Chismoso")'
        imagenes={[{ src: '/img/img-19b-chismoso.png', alt: 'El Chismoso timeline' }]}
        tip='Nunca más preguntarás "¿en qué quedamos con este cliente?".'
      >
        <p>
          La pestaña <strong>Historia</strong> registra automáticamente todo
          lo que pasa con esa oportunidad: cambios de etapa, cotizaciones
          enviadas, cuándo el cliente abrió el portal, si aceptó o rechazó,
          y el pedido generado en CONTPAQi.
        </p>
      </Paso>
    </Seccion>
  )
}

// ============================================================================
// SECCIÓN 5: MÓVIL
// ============================================================================

function Movil() {
  const screenshots = [
    { src: '/img/img-m1-login-movil.png',     caption: 'Login' },
    { src: '/img/img-m4-dashboard-movil.png', caption: 'Dashboard' },
    { src: '/img/img-m2-empresas-movil.png',  caption: 'Empresas' },
    { src: '/img/img-m3-sidebar-movil.png',   caption: 'Menú' },
  ]

  return (
    <Seccion
      id="movil"
      numero={5}
      titulo="Accede desde donde estés"
      intro="PULSO CRM es 100% responsivo. Funciona perfectamente en cualquier dispositivo — celular, tablet, computadora… o incluso desde la pantalla de tu Tesla."
    >
      <div className="grid-movil">
        {screenshots.map((s) => (
          <div key={s.src} className="grid-movil-item">
            <img
              src={s.src}
              alt={s.caption}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
              className="img-movil"
            />
            <p>{s.caption}</p>
          </div>
        ))}
      </div>

      <img
        src="/img/img-tesla.png"
        alt="PULSO CRM corriendo en pantalla de Tesla"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
        className="img-tesla"
      />
      <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b', fontStyle: 'italic', marginTop: 10 }}>
        PULSO CRM — accesible desde cualquier lugar
      </p>
    </Seccion>
  )
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer() {
  return (
    <footer className="bg-[#0052CC] text-white mt-16">
      <div className="max-w-[860px] mx-auto px-5 py-12 text-center">
        <h3 className="text-xl font-bold">¿Tienes dudas? Estamos aquí para ayudarte</h3>
        <p className="mt-2 text-sm text-white/85">
          Lunes a viernes 9 am – 6 pm hora Ciudad de México.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={URL_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg text-sm font-semibold transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            WhatsApp +52 334 162 4372
          </a>
          <a
            href={`mailto:${EMAIL_SOPORTE}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold border border-white/30 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {EMAIL_SOPORTE}
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 text-xs text-white/70">
          © 2026 PULSO CRM · COMPURIGHT · Morelia, México
        </div>
      </div>
    </footer>
  )
}

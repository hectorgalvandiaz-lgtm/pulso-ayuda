import { useState, useEffect } from 'react'

// ============================================================================
// CONSTANTES
// ============================================================================

const URL_CRM = 'https://www.pulsocrm.com.mx'
const URL_WHATSAPP = 'https://wa.me/5214439800967'
const EMAIL_SOPORTE = 'soporteps@pulsosoluciones.mx'

// `barra: true` = aparece también en la barra superior (en escritorio no caben
// todas); el índice del encabezado muestra siempre la lista completa.
const SECCIONES_NAV = [
  { id: 'primeros-pasos', label: 'Primeros pasos', barra: true },
  { id: 'tu-cuenta',      label: 'Prueba y términos' },
  { id: 'contpaqi',       label: 'CONTPAQi', barra: true },
  { id: 'bridge-instalacion', label: 'Instalar el Bridge' },
  { id: 'vendedores',     label: 'Vendedores' },
  { id: 'cotizaciones',   label: 'Cotizaciones', barra: true },
  { id: 'pipeline',       label: 'Oportunidades', barra: true },
  { id: 'bandeja',        label: 'Bandeja', barra: true },
  { id: 'teamviewer',     label: 'Soporte remoto' },
  { id: 'goto',           label: 'GoTo Connect' },
  { id: 'bookings',       label: 'Microsoft Bookings' },
  { id: 'cobro',          label: 'PULSO Cobro' },
  { id: 'whatsapp-configuracion', label: 'WhatsApp' },
  { id: 'integraciones',  label: 'Integraciones', barra: true },
  { id: 'movil',          label: 'Móvil' },
]

function Etiqueta({ tipo }) {
  const textos = { nuevo: 'Nuevo', solicitud: 'A solicitud', proximamente: 'Próximamente' }
  return <span className={`etiqueta ${tipo}`}>{textos[tipo]}</span>
}

/** Bloque de una sola columna, sin captura. */
function Bloque({ rotulo, titulo, children }) {
  return (
    <div className="paso solo">
      <div className="paso-texto">
        <span className="paso-num">{rotulo}</span>
        {titulo && <h3>{titulo}</h3>}
        {children}
      </div>
    </div>
  )
}

function Tip({ children }) {
  return <div className="tip-box"><p>{children}</p></div>
}

// ============================================================================
// APP
// ============================================================================

export default function App() {
  // Scroll al ancla (#seccion) cuando se llega desde un enlace externo. El SPA
  // monta después de que el navegador intenta el scroll inicial, así que lo
  // reintentamos tras montar y de nuevo al cargar imágenes (evita quedar arriba).
  useEffect(() => {
    const id = decodeURIComponent((window.location.hash || '').replace('#', ''))
    if (!id) return undefined
    let cancelado = false
    const irAlAncla = () => {
      if (cancelado) return
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ block: 'start' })
    }
    const t1 = setTimeout(irAlAncla, 120)
    const t2 = setTimeout(irAlAncla, 700)
    window.addEventListener('load', irAlAncla)
    return () => { cancelado = true; clearTimeout(t1); clearTimeout(t2); window.removeEventListener('load', irAlAncla) }
  }, [])

  return (
    <>
      <Navbar />
      <main className="guia-wrap">
        <Hero />
        <PrimerosPasos />
        <TuCuenta />
        <Contpaqi />
        <InstalarBridge />
        <Vendedores />
        <Cotizaciones />
        <Pipeline />
        <Bandeja />
        <SoporteRemoto />
        <GotoConnect />
        <Bookings />
        <Cobro />
        <WhatsappConfiguracion />
        <Integraciones />
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
          {SECCIONES_NAV.filter((s) => s.barra).map((s) => (
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

function Seccion({ id, titulo, etiqueta, intro, children }) {
  // El número sale del orden del índice: así no hay que renumerar a mano.
  const numero = SECCIONES_NAV.findIndex((s) => s.id === id) + 1
  return (
    <section id={id} className="seccion">
      <div className="seccion-header">
        <div className="seccion-num">{numero}</div>
        <h2>{titulo}{etiqueta && <Etiqueta tipo={etiqueta} />}</h2>
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
          En <strong>Configuración → Mi empresa</strong> puedes subir tu logo,
          definir colores de marca y capturar los datos fiscales y el{' '}
          <strong>Teléfono</strong> de tu empresa, que aparecerán en tus
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
      titulo="Conectar CONTPAQi"
      intro="PULSO es el único CRM mexicano con integración nativa a CONTPAQi Comercial Pro y Premium. Conectarlo sincroniza automáticamente clientes, productos, precios, condiciones de pago y vendedores — sin re-captura manual."
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
        imagenes={[{ src: '/img/img-09b-config-json.png', alt: 'Instalador del PULSO Bridge' }]}
      >
        <p>
          En el servidor donde corre CONTPAQi, descarga el instalador desde{' '}
          <strong>Configuración → Bridge CONTPAQi</strong> y ejecuta{' '}
          <span className="font-mono text-xs bg-slate-200 px-1.5 py-0.5 rounded">PULSO-Bridge-Installer.exe</span>{' '}
          como Administrador. El instalador configura todo automáticamente.
        </p>
        <p>
          <strong>Antes de descargarlo</strong>, revisa{' '}
          <a href="#bridge-instalacion" className="underline">Instalar el Bridge</a>:
          algunos antivirus borran sus programas si no se les indica que son de confianza.
        </p>
      </Paso>

      <Paso
        numero={3}
        titulo="Verificar la sincronización"
        imagenes={[{ src: '/img/img-10-bridge-log.png', alt: 'Estado del Bridge en PULSO' }]}
      >
        <p>
          El Bridge sincroniza automáticamente cada <strong>15 minutos</strong>.
          En <strong>Configuración → Bridge CONTPAQi</strong> verás si está{' '}
          <strong>Conectado</strong>, la <strong>Última sincronización</strong> y
          la versión instalada.
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

      <Bloque rotulo="Paso 5" titulo="Crear pedidos en CONTPAQi desde PULSO">
        <p>
          En <strong>Configuración → Bridge CONTPAQi</strong>, en el paso{' '}
          <strong>Escritura a CONTPAQi</strong>, enciende{' '}
          <strong>Crear pedidos en CONTPAQi</strong>. Cuando ganes una cotización,
          el Bridge crea el documento en CONTPAQi en su siguiente ciclo. En{' '}
          <strong>Al ganar una cotización</strong> eliges si se crea como{' '}
          <strong>Pedido</strong> o como <strong>Cotización</strong>.
        </p>
        <ul>
          <li>Funciona con CONTPAQi Comercial <strong>Premium</strong> y <strong>Pro</strong>. En Pro requiere Bridge <strong>1.12</strong> o posterior; si tienes una versión anterior, la pantalla te avisa que actualices.</li>
          <li>Al guardar verás <strong>“Guardado. Se aplica en el siguiente ciclo.”</strong></li>
          <li>Si lo apagas, las cotizaciones ganadas se quedan pendientes en PULSO; no se pierde ninguna.</li>
          <li>Si aparece <strong>“El Bridge no puede escribir en CONTPAQi”</strong>, escríbenos a {EMAIL_SOPORTE}.</li>
        </ul>
      </Bloque>

      <Bloque rotulo="Paso 6" titulo="Liga a tus agentes de ventas">
        <p>
          En la misma pantalla, el paso <strong>Vendedores de CONTPAQi</strong> te
          deja decir qué usuario de PULSO es cada agente de ventas de CONTPAQi.
          Detalle en <a href="#vendedores" className="underline">Vendedores</a>.
        </p>
      </Bloque>
    </Seccion>
  )
}

// ============================================================================
// SECCIÓN 3: COTIZACIONES
// ============================================================================

function InstalarBridge() {
  const ruta = (t) => (
    <span className="font-mono text-xs bg-slate-200 px-1.5 py-0.5 rounded">{t}</span>
  )
  return (
    <Seccion
      id="bridge-instalacion"
      titulo="Instalar, actualizar o desinstalar el PULSO Bridge"
      intro="Algunos antivirus borran los programas del Bridge en cuanto se descomprimen, porque todavía no los conocen. No es un virus: es un programa nuevo que el antivirus no ha visto antes. Se resuelve una sola vez, indicándole al antivirus una carpeta de confianza. Toma unos 5 minutos."
    >
      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Antes de empezar</span>
          <h3>¿Cómo sé si me está pasando?</h3>
          <ul>
            <li>Al descomprimir el ZIP <strong>faltan archivos</strong>: debe haber cuatro programas ({ruta('PULSO-Bridge-Installer.exe')} y, dentro de {ruta('PULSOBridgeService')}, tres más).</li>
            <li>Al abrir el instalador, Windows dice que <strong>no encuentra el archivo</strong> o no pasa nada.</li>
            <li>El antivirus muestra un aviso de que <strong>eliminó o puso en cuarentena</strong> un archivo de PULSO.</li>
          </ul>
          <div className="tip-box"><p>Si ya te pasó, no hay problema: sigue estos pasos desde el principio y vuelve a descargar el Bridge.</p></div>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 1</span>
          <h3>Crea la carpeta del Bridge <em>(~1 minuto)</em></h3>
          <p>En el servidor donde corre CONTPAQi, crea esta carpeta si no existe:</p>
          <ul>
            <li>{ruta('C:\\pulso-bridge')}</li>
          </ul>
          <p>Ahí vive todo el Bridge. Dentro de ella crea también {ruta('C:\\pulso-bridge\\instaladores')}: ahí vas a guardar lo que descargues.</p>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 2</span>
          <h3>Dile al antivirus que esa carpeta es de confianza <em>(~3 minutos)</em></h3>
          <h4>Si usas el antivirus de Windows (Microsoft Defender)</h4>
          <ul>
            <li>Abre <strong>Seguridad de Windows</strong> (búscalo en el menú Inicio).</li>
            <li>Entra a <strong>Protección antivirus y contra amenazas</strong>.</li>
            <li>En <strong>Configuración de antivirus y protección contra amenazas</strong>, haz clic en <strong>Administrar la configuración</strong>.</li>
            <li>Baja hasta <strong>Exclusiones</strong> → <strong>Agregar o quitar exclusiones</strong>.</li>
            <li><strong>Agregar una exclusión</strong> → <strong>Carpeta</strong> → elige {ruta('C:\\pulso-bridge')}.</li>
          </ul>
          <h4>Si usas otro antivirus (ESET, Kaspersky, Norton, McAfee, Bitdefender, Sophos…)</h4>
          <p>Todos tienen una opción de <strong>exclusiones</strong> o <strong>excepciones</strong>. Agrega la carpeta {ruta('C:\\pulso-bridge')} completa.</p>
          <div className="tip-box"><p>En muchas empresas el antivirus lo administra el área de sistemas o el proveedor de soporte, y el equipo no deja cambiarlo. Si es tu caso, pídeles que agreguen la exclusión de la carpeta <strong>C:\pulso-bridge</strong>. Puedes reenviarles esta página.</p></div>
          <h4>¿Es seguro?</h4>
          <p>Sí. Tu antivirus sigue protegiendo todo el equipo; solo deja de revisar esa carpeta. <strong>No apagues el antivirus completo</strong>: no hace falta.</p>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 3</span>
          <h3>Descarga y descomprime en la carpeta de instaladores <em>(~1 minuto)</em></h3>
          <ul>
            <li>En PULSO entra a <strong>Configuración → Bridge CONTPAQi</strong> y haz clic en <strong>Descargar Bridge Installer</strong>.</li>
            <li>Guárdalo (o muévelo) en {ruta('C:\\pulso-bridge\\instaladores')}.</li>
            <li>Clic derecho sobre el ZIP → <strong>Extraer todo…</strong> → deja que cree una carpeta nueva ahí mismo.</li>
          </ul>
          <div className="tip-box"><p><strong>Nunca lo descomprimas dentro de {ruta('C:\\pulso-bridge\\pulso-bridge\\dist')}</strong>. Ésa es la carpeta del Bridge que ya está trabajando, y Windows no deja reemplazar sus archivos mientras corre. El instalador se encarga de eso.</p></div>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 4</span>
          <h3>Ejecuta el instalador <em>(~2 minutos)</em></h3>
          <ul>
            <li>Dentro de la carpeta que se creó, clic derecho sobre {ruta('PULSO-Bridge-Installer.exe')} → <strong>Ejecutar como administrador</strong>.</li>
            <li>Si Windows muestra <strong>“Windows protegió su PC”</strong>, haz clic en <strong>Más información</strong> → <strong>Ejecutar de todas formas</strong>.</li>
            <li><strong>Primera vez:</strong> captura los datos que te pide y termina con <strong>Instalar</strong>.</li>
            <li><strong>Si ya tenías el Bridge:</strong> te ofrece <strong>Actualizar instalación</strong>. Tu configuración se conserva; no hay que capturar nada.</li>
            <li>Al final debe decir <strong>“Instalación completada ✓”</strong> o <strong>“Actualización completada ✓”</strong>.</li>
          </ul>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Preguntas frecuentes</span>
          <h3>Dudas comunes</h3>
          <h4>¿Cómo sé que hay una versión nueva?</h4>
          <p>En <strong>Configuración → Bridge CONTPAQi</strong> aparece la <strong>Versión instalada</strong> y, si hay una más reciente, el aviso <strong>“hay vX disponible”</strong>. Para actualizar, descárgala con el botón <strong>Descargar Bridge Installer</strong> y repite los pasos 3 y 4: el instalador ofrece <strong>Actualizar instalación</strong> y conserva tu configuración.</p>
          <h4>¿Puedo cambiar de empresa de CONTPAQi?</h4>
          <p>Sí. Vuelve a ejecutar el instalador: verás preseleccionada la empresa actual. Elige la otra y haz clic en <strong>Cambiar empresa</strong> (o <strong>Actualizar instalación</strong>). No hay que editar ningún archivo. La sincronización empieza de nuevo con la empresa elegida.</p>
          <h4>¿Cómo lo desinstalo?</h4>
          <p>En Windows, abre <strong>Agregar o quitar programas</strong>, busca <strong>PULSO Bridge</strong> y elige <strong>Desinstalar</strong> (también puedes usar <strong>Desinstalar PULSO Bridge</strong> dentro del instalador). Antes de quitarlo guarda una copia de tu configuración en <strong>Documentos</strong>. La información que ya está en PULSO se conserva.</p>
          <h4>¿Tengo que hacer esto cada vez que actualice?</h4>
          <p>No. La exclusión se configura una sola vez. En las siguientes actualizaciones solo repites los pasos 3 y 4.</p>
          <h4>El antivirus ya había borrado archivos. ¿Qué hago?</h4>
          <p>Agrega la exclusión (paso 2), borra la carpeta que descomprimiste y vuelve a descargar el ZIP desde PULSO. No intentes recuperar los archivos de la cuarentena uno por uno.</p>
          <h4>¿Necesitas ayuda?</h4>
          <p>Escríbenos a <strong>{EMAIL_SOPORTE}</strong> o por WhatsApp. Podemos hacer la instalación contigo en una sesión.</p>
        </div>
      </div>
    </Seccion>
  )
}

// ============================================================================

function Cotizaciones() {
  return (
    <Seccion
      id="cotizaciones"
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
          subtotal, impuestos y total automáticamente. Cada partida puede llevar
          varios impuestos (ver <a href="#impuestos" className="underline">Impuestos</a> más abajo).
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
        tip="Sin que nadie tenga que re-capturar nada: el pedido aparece en CONTPAQi al siguiente ciclo del Bridge."
      >
        <p>
          Cuando el cliente acepta, PULSO notifica a tu equipo por email y, si
          tienes encendido <strong>Crear pedidos en CONTPAQi</strong> (ver{' '}
          <a href="#contpaqi" className="underline">CONTPAQi</a>), en el próximo
          ciclo del Bridge crea automáticamente el pedido en CONTPAQi.
        </p>
      </Paso>

      <div id="impuestos" />
      <Bloque rotulo="Impuestos" titulo="Varios impuestos por partida: IVA, IEPS, retenciones e impuestos locales">
        <p>Una partida puede llevar varios impuestos a la vez: por ejemplo IVA + IEPS, IVA + IVA retenido + ISR retenido, o IVA + ISH.</p>
        <h4>1. Ten los impuestos en tu catálogo</h4>
        <ul>
          <li>Entra a <strong>Catálogo → Impuestos</strong>.</li>
          <li>Haz clic en <strong>Agregar impuestos comunes</strong>. PULSO te muestra los que te faltan: IVA retenido 2/3 (10.6667 %, honorarios y arrendamiento), IVA retenido 4 % (autotransporte), ISR retenido 10 %, ISR retenido 1.25 % (RESICO) e ISH. Escribe la <strong>Tasa del ISH de tu estado</strong> y haz clic en <strong>Agregar</strong>.</li>
          <li>También puedes dar de alta uno a mano como <strong>Traslado</strong> o <strong>Retención</strong>, o como impuesto local (estatal).</li>
        </ul>
        <Tip>Si tienes CONTPAQi conectado, el IVA y el IEPS llegan de CONTPAQi. Las retenciones y los impuestos locales los das de alta tú en PULSO.</Tip>
        <h4>2. Asígnalos en la cotización</h4>
        <ul>
          <li>En el editor de la cotización, la columna <strong>Impuestos</strong> muestra los impuestos de cada partida (retenciones en rojo, locales en ámbar).</li>
          <li>Para agregar uno, usa <strong>+ Agregar impuesto…</strong>; para quitarlo, la <strong>×</strong>.</li>
          <li>En el producto, el campo <strong>Impuestos del producto</strong> define los que trae por defecto al cotizarlo.</li>
        </ul>
        <h4>3. Retenciones por cliente</h4>
        <p>En la ficha de la empresa, sección <strong>Facturación (defaults SAT)</strong>, el campo <strong>Retenciones e impuestos locales que aplica este cliente</strong> hace que esas retenciones se agreguen solas a los servicios y partidas libres que le cotices. Por ejemplo, una persona moral que te retiene IVA 2/3 e ISR 10 % por honorarios. Las partidas donde ya elegiste impuestos no se cambian.</p>
        <h4>4. El desglose</h4>
        <p>El resumen muestra la <strong>Base imponible</strong> y un renglón por cada impuesto y tasa; las retenciones restan. El mismo desglose aparece en el PDF, en el Portal del Cliente y en el correo.</p>
      </Bloque>

      <Bloque rotulo="Formatos" titulo="Usa tus formatos de cotización de CONTPAQi Pro">
        <p>Si ya tienes un formato de cotización en CONTPAQi Comercial Pro, tus cotizaciones de PULSO pueden salir con ese mismo diseño en la vista previa, el PDF y el Portal del Cliente.</p>
        <ul>
          <li>Entra a <strong>Configuración → Cotizaciones</strong>, sección <strong>Formatos de CONTPAQi Pro</strong>.</li>
          <li>Haz clic en <strong>Importar formato .html</strong> y elige el archivo de tu formato.</li>
          <li>Con <strong>Editar</strong> abres el editor: ves una <strong>vista previa con una cotización de ejemplo</strong> mientras cambias el diseño, y la lista de <strong>Etiquetas disponibles</strong> (clic para copiar). Termina con <strong>Guardar cambios</strong>.</li>
          <li><strong>Logo:</strong> si el formato no trae logo, usa <strong>Agregar mi logo arriba a la izquierda</strong>; si trae otro, <strong>Poner mi logo en su lugar</strong>. Tu logo se sube en <strong>Configuración → Mi empresa</strong>.</li>
          <li>Marca el que más uses con <strong>Usar como predeterminado</strong>. En cada cotización puedes elegir otro en <strong>Formato de impresión</strong>.</li>
        </ul>
        <Tip>Disponible desde el plan <strong>Profesional</strong>. El teléfono que capturas en <strong>Configuración → Mi empresa</strong> se llena solo en el formato.</Tip>
      </Bloque>

      <Bloque rotulo="Portal del Cliente" titulo={<>Comentarios del cliente en la cotización <Etiqueta tipo="nuevo" /></>}>
        <p>Tu cliente podrá pedir cambios sin aceptar ni rechazar la cotización: en el portal verá <strong>¿Tienes algún comentario?</strong>, escribe su mensaje y lo manda con <strong>Enviar comentario</strong>. Después puede aceptar o rechazar cuando quiera.</p>
        <p>Tú recibes el aviso en la campanita y lo ves en el panel <strong>Comentarios del cliente</strong> dentro de la cotización.</p>
      </Bloque>
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
      titulo="Oportunidades y seguimiento"
      intro="Visualiza tu pipeline, mueve oportunidades entre etapas, encuentra rápido las que necesitan atención y revisa la historia automática de cada cliente."
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

      <Bloque rotulo="Filtros" titulo="Encuentra las oportunidades que necesitan seguimiento">
        <p>En <strong>Oportunidades</strong>, cambia a la vista <strong>Tabla</strong> para usar los filtros:</p>
        <ul>
          <li><strong>Estado:</strong> de entrada muestra <strong>Sin perdidas</strong> (abiertas y ganadas). También puedes ver Todos los estados, Abiertas, Ganadas o Perdidas.</li>
          <li><strong>Origen:</strong> <strong>Eventos</strong> (llegaron de PULSO Eventos o de un webinar) o <strong>CRM</strong> (todas las demás).</li>
          <li><strong>Orden:</strong> <strong>Más recientes primero</strong> o <strong>Más antiguas primero</strong>, sobre todos los resultados, no solo la página que ves.</li>
          <li>La columna <strong>Alta</strong> muestra cuándo se creó cada oportunidad, para ubicar las que llevan más tiempo sin cerrarse.</li>
        </ul>
      </Bloque>

      <Bloque rotulo="Empresas y contactos" titulo="Pestaña Oportunidades en la ficha">
        <p>La ficha de cada <strong>empresa</strong> y de cada <strong>contacto</strong> tiene la pestaña <strong>Oportunidades</strong>: lista las suyas con su fecha de alta y si están ganadas o perdidas, y desde ahí creas otra con <strong>Nueva oportunidad</strong>.</p>
      </Bloque>

      <Bloque rotulo="Duplicados" titulo={<>Fusionar oportunidades duplicadas <Etiqueta tipo="nuevo" /></>}>
        <p>Cuando la misma venta quedó registrada dos veces podrás juntarlas:</p>
        <ul>
          <li>Desde la tabla: marca las dos y haz clic en <strong>Fusionar</strong>.</li>
          <li>Desde la oportunidad: botón <strong>Fusionar con…</strong></li>
        </ul>
        <p>Cotizaciones, actividades, correos y lo demás de la duplicada pasan a la que se queda. La duplicada no se borra: se cierra como perdida con la nota «Fusionada con…» y su valor no se suma.</p>
      </Bloque>
    </Seccion>
  )
}

// ============================================================================
// SECCIÓN 5: MÓVIL
// ============================================================================

function Cobro() {
  return (
    <Seccion
      id="cobro"
      titulo="PULSO Cobro — Cobranza automatizada"
      intro="Reúne tus cuentas por cobrar, clasifica cada factura por su nivel de vencimiento y cobra más rápido con links de pago SPEI y recordatorios automáticos por WhatsApp y email."
    >
      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Antes de empezar</span>
          <h3>¿Qué es y qué necesitas?</h3>
          <p>PULSO Cobro es el módulo de cobranza automatizada de PULSO. Funciona con o sin el Bridge de CONTPAQi.</p>
          <h4>Requisitos</h4>
          <ul>
            <li>Plan <strong>Profesional</strong> o <strong>Enterprise</strong>.</li>
            <li>La función <strong>PULSO Cobro</strong> activada por el equipo de PULSO.</li>
            <li>Una cuenta de <strong>Conekta</strong> para los links de pago SPEI.</li>
          </ul>
          <h4>Con y sin Bridge</h4>
          <ul>
            <li><strong>Con Bridge CONTPAQi:</strong> las facturas por cobrar se sincronizan solas desde CONTPAQi y, al pagarse, el abono se aplica de vuelta en CONTPAQi.</li>
            <li><strong>Sin Bridge:</strong> capturas las facturas manualmente en PULSO y llevas la cobranza igual.</li>
          </ul>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 1</span>
          <h3>Configuración inicial</h3>
          <ul>
            <li>Al activarse verás <strong>💰 PULSO Cobro</strong> en el menú lateral.</li>
            <li>En <strong>Configuración → Cobranza</strong> pega tu <strong>API Key de Conekta</strong> (se guarda cifrada y nunca se vuelve a mostrar).</li>
            <li>Elige los <strong>métodos de pago</strong> (SPEI y/o Tarjeta).</li>
            <li>Define los <strong>días por nivel</strong>: Preventivo, Correctivo y Crítico (por defecto 5, 15 y 30 días).</li>
          </ul>
          <div className="tip-box"><p>Cada cliente usa su propia API Key de Conekta — nunca una compartida — para que los pagos entren directo a su cuenta.</p></div>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 2</span>
          <h3>Sincronización de facturas</h3>
          <ul>
            <li><strong>Con Bridge:</strong> automático en cada ciclo (~cada 15 min). No haces nada.</li>
            <li><strong>Sin Bridge:</strong> entra a <strong>PULSO Cobro → “＋ Nueva factura”</strong> y captura empresa, contacto, folio, fechas y monto. PULSO calcula saldo, días vencido y nivel.</li>
          </ul>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 3</span>
          <h3>Dashboard de cobranza</h3>
          <p>El tablero resume tu cartera con cuatro indicadores: <strong>Total CxC</strong>, <strong>Vencido</strong>, <strong>Cobrado</strong> y <strong>Tasa de cobro</strong>. La tabla lista cada factura con su cliente, folio, vencimiento, días vencido, saldo y nivel. Filtra por nivel, estatus de pago o fechas.</p>
          <div className="nivel-legend">
            <span><i style={{ background: '#10b981' }}></i>Al día</span>
            <span><i style={{ background: '#3b82f6' }}></i>Preventivo</span>
            <span><i style={{ background: '#f59e0b' }}></i>Correctivo</span>
            <span><i style={{ background: '#ef4444' }}></i>Crítico</span>
          </div>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 4</span>
          <h3>Gestión de una factura</h3>
          <ul>
            <li><strong>Generar link SPEI:</strong> crea una CLABE única para esa factura y cópiala con un clic.</li>
            <li><strong>Enviar por WhatsApp:</strong> con una plantilla aprobada; las variables se pre-llenan solas.</li>
            <li><strong>Enviar por Email:</strong> con asunto y cuerpo pre-llenados.</li>
            <li><strong>Marcar como pagado manualmente:</strong> para pagos en efectivo o fuera de PULSO.</li>
          </ul>
          <p>Cada factura conserva su historial de links de pago y de envíos.</p>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 5</span>
          <h3>Campañas de cobranza</h3>
          <p>Una campaña envía recordatorios en lote a las facturas de un nivel. Configura nombre, nivel, rango de días vencido, canal (WhatsApp/Email/ambos) y la plantilla aprobada. Ejecuta con <strong>“Ejecutar ahora”</strong> o deja que corra sola si activas las campañas automáticas. PULSO omite una factura si ya recibió recordatorio en las últimas 24 horas.</p>
          <h4>Variables disponibles en las plantillas</h4>
          <div>
            <span className="var-chip">{'{nombre}'}</span>
            <span className="var-chip">{'{folio}'}</span>
            <span className="var-chip">{'{monto}'}</span>
            <span className="var-chip">{'{dias_vencido}'}</span>
            <span className="var-chip">{'{fecha_vencimiento}'}</span>
          </div>
          <div className="tip-box"><p>La plantilla de WhatsApp debe usar exactamente esos nombres de variable; si una no está en la lista, ese envío se marca como fallido y el resto de la campaña continúa.</p></div>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 6</span>
          <h3>Conciliación e integración CONTPAQi</h3>
          <p>Cuando tu cliente paga la CLABE SPEI, Conekta avisa a PULSO. PULSO marca el link como pagado, actualiza la factura (saldo y estatus) y notifica al cliente y al agente. Para pagos fuera de PULSO usa “Marcar como pagado manualmente”.</p>
          <h4>Aplicación en CONTPAQi (con Bridge)</h4>
          <ul>
            <li>El Bridge aplica el abono de vuelta en CONTPAQi automáticamente.</li>
            <li>Valida que no haya sobrepago y que el documento no esté ya pagado antes de aplicar.</li>
            <li>Requiere Bridge <strong>V1.0.6</strong> o superior con la cobranza activada.</li>
          </ul>
        </div>
      </div>
    </Seccion>
  )
}

// ============================================================================

function WhatsappConfiguracion() {
  return (
    <Seccion
      id="whatsapp-configuracion"
      titulo="Conecta tu número de WhatsApp Business a PULSO"
      intro="Con tu propio número, tus clientes ven los mensajes desde el número de tu empresa —no desde uno genérico compartido— y tienes control total de tus conversaciones. Es un proceso de 3 pasos que toma menos de 30 minutos."
    >
      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Antes de empezar</span>
          <h3>¿Por qué necesito mi propio número?</h3>
          <p>Cuando configuras tu número propio, tus clientes ven mensajes desde el número de <strong>TU empresa</strong>, no desde un número genérico compartido. Además tienes control total de tus conversaciones sin compartir línea con otros usuarios de PULSO.</p>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 1</span>
          <h3>Crea tu cuenta en Meta Business Manager <em>(~5 minutos)</em></h3>
          <ul>
            <li>Entra a <strong>business.facebook.com</strong></li>
            <li>Haz clic en <strong>“Crear cuenta”</strong></li>
            <li>Ingresa el nombre de tu empresa, tu nombre y tu email</li>
            <li>Sigue el proceso de verificación</li>
          </ul>
          <div className="tip-box"><p>Si ya tienes cuenta en Meta Business Manager, salta al Paso 2.</p></div>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 2</span>
          <h3>Solicita tu cuenta WhatsApp Business API <em>(~10 minutos + 1-3 días de aprobación de Meta)</em></h3>
          <ul>
            <li>Dentro de Meta Business Manager entra a: <strong>Configuración → Cuentas de WhatsApp → Agregar</strong></li>
            <li>Selecciona <strong>“WhatsApp Business API”</strong></li>
            <li>Ingresa el número de teléfono que quieres usar (puede ser fijo o celular, debe estar disponible para recibir una llamada o SMS de verificación)</li>
            <li>Verifica el número con el código que Meta te envía</li>
            <li>Meta revisa y aprueba la solicitud en <strong>1-3 días hábiles</strong></li>
          </ul>
          <div className="tip-box"><p>Recibirás un email de Meta cuando esté aprobado.</p></div>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Paso 3</span>
          <h3>Conecta tu número a PULSO <em>(~5 minutos, una vez aprobado por Meta)</em></h3>
          <ul>
            <li>Entra a <strong>PULSO → Configuración → Comunicación</strong>, sección <strong>Mis números de WhatsApp</strong></li>
            <li>Haz clic en <strong>“Agregar número de WhatsApp”</strong></li>
            <li>Inicia sesión con tu cuenta de Meta Business Manager</li>
            <li>Selecciona la cuenta de WhatsApp que creaste</li>
            <li>Autoriza los permisos que PULSO solicita</li>
            <li>Listo — tu <strong>Bandeja Unificada</strong> ya muestra tus conversaciones de WhatsApp en tiempo real</li>
          </ul>
        </div>
      </div>

      <div className="paso solo">
        <div className="paso-texto">
          <span className="paso-num">Preguntas frecuentes</span>
          <h3>Dudas comunes</h3>
          <h4>¿Puedo usar mi número personal de WhatsApp?</h4>
          <p>No directamente. El número que conectes a la API de WhatsApp Business no puede tener la app de WhatsApp instalada en un celular al mismo tiempo. Se recomienda usar un número dedicado para tu empresa.</p>
          <h4>¿Tiene costo?</h4>
          <p>Meta cobra por conversaciones iniciadas por la empresa (aproximadamente $0.05–0.08 USD cada una). Las conversaciones que inicia el cliente son gratuitas las primeras 24 horas. PULSO no cobra nada adicional por la integración.</p>
          <h4>¿Qué pasa con las conversaciones mientras espero la aprobación de Meta?</h4>
          <p>Puedes usar PULSO normalmente. WhatsApp quedará disponible en tu Bandeja en cuanto conectes tu número aprobado.</p>
          <h4>¿Necesitas ayuda?</h4>
          <p>Escríbenos a <strong>{EMAIL_SOPORTE}</strong> o desde el chat de soporte dentro de PULSO. También ofrecemos el servicio de configuración asistida en una sola sesión.</p>
        </div>
      </div>
    </Seccion>
  )
}

// ============================================================================
// TU CUENTA: PERIODO DE PRUEBA Y TÉRMINOS
// ============================================================================

function TuCuenta() {
  return (
    <Seccion
      id="tu-cuenta"
      titulo="Tu cuenta: periodo de prueba y términos"
      intro="Qué pasa cuando termina tu prueba gratis y por qué a veces te pedimos aceptar los Términos y el Aviso de privacidad al entrar."
    >
      <Bloque rotulo="Periodo de prueba" titulo="Avisos de fin de prueba">
        <ul>
          <li>La prueba gratis dura <strong>14 días</strong>.</li>
          <li>En el menú lateral verás cuántos días te quedan y el botón <strong>Actualizar plan</strong>.</li>
          <li>Según tu tipo de cuenta, también te avisamos por correo los días <strong>10, 12, 13 y 14</strong> de la prueba (“Te quedan 4 días…”, “Mañana termina…”, “Hoy termina…”), con la liga para hacer tu pago.</li>
        </ul>
        <h4>¿Qué pasa al terminar?</h4>
        <ul>
          <li>Al entrar verás <strong>“Tu periodo de prueba terminó”</strong>. Para seguir usando PULSO elige un plan con <strong>Ver planes</strong>.</li>
          <li><strong>Tu información se conserva 90 días</strong>: al contratar sigues con todo lo que ya capturaste.</li>
          <li>Si eres administrador, puedes usar <strong>Descargar toda mi información</strong>.</li>
        </ul>
        <Tip>Puedes contratar en cualquier momento, sin esperar a que termine la prueba, en <strong>Configuración → Mi suscripción</strong>.</Tip>
      </Bloque>

      <Bloque rotulo="Términos y privacidad" titulo="La ventana “Antes de continuar”">
        <p>Cuando actualizamos los <strong>Términos y Condiciones</strong> o el <strong>Aviso de privacidad</strong>, al entrar te aparece la ventana <strong>Antes de continuar</strong> con la versión nueva de cada documento.</p>
        <ul>
          <li>Ábrelos con <strong>Leer</strong>, marca <strong>“He leído y acepto…”</strong> y haz clic en <strong>Aceptar y continuar</strong>.</li>
          <li>Se pide a cada usuario una sola vez por versión. No vuelve a salir hasta que publiquemos otra.</li>
          <li>Para usar PULSO hay que aceptarlos. Si tienes dudas, usa <strong>¿Tienes dudas? Contacta a soporte</strong> o <strong>Cerrar sesión</strong>; mientras tanto tus conexiones (por ejemplo CONTPAQi) siguen trabajando.</li>
        </ul>
      </Bloque>
    </Seccion>
  )
}

// ============================================================================
// VENDEDORES
// ============================================================================

function Vendedores() {
  return (
    <Seccion
      id="vendedores"
      titulo="Vendedores: asigna la cartera"
      intro="Cada empresa puede tener un vendedor responsable. Asígnalo una por una, en bloque, o deja que se tome del agente de ventas de CONTPAQi."
    >
      <Bloque rotulo="Una empresa" titulo="Desde la ficha de la empresa">
        <p>Al crear o editar una empresa, elige al responsable en el campo <strong>Vendedor</strong> (o <strong>Sin asignar</strong>).</p>
      </Bloque>

      <Bloque rotulo="Varias empresas" titulo="Asignación masiva desde la lista">
        <ul>
          <li>En <strong>Empresas</strong>, marca las casillas de las que quieras asignar. Puedes marcar toda la página, o usar <strong>Seleccionar las N que cumplen el filtro</strong>.</li>
          <li>En <strong>Asignar a…</strong> elige al vendedor y haz clic en <strong>Asignar</strong>. Confirma en la ventana <strong>Asignar vendedor</strong>.</li>
          <li>El filtro <strong>Vendedor</strong> y la columna del mismo nombre te ayudan a ver qué falta: filtra por <strong>Sin asignar</strong>.</li>
        </ul>
        <Tip>La asignación masiva la hace un administrador.</Tip>
      </Bloque>

      <Bloque rotulo="Con CONTPAQi" titulo="Liga los agentes de ventas de CONTPAQi">
        <ul>
          <li>Entra a <strong>Configuración → Bridge CONTPAQi</strong>, paso <strong>Vendedores de CONTPAQi</strong>.</li>
          <li>Para cada <strong>Agente en CONTPAQi</strong>, elige el <strong>Usuario en PULSO</strong> que le corresponde.</li>
          <li>Las empresas que todavía no tienen vendedor en PULSO se le asignan a ese usuario, también las que lleguen después. Las que ya tienen vendedor en PULSO no cambian.</li>
        </ul>
        <Tip>Requiere Bridge <strong>1.12</strong> o posterior (Comercial Pro, Premium o Start). Los agentes aparecen en el siguiente ciclo después de actualizar.</Tip>
      </Bloque>

      <Bloque rotulo="Visibilidad" titulo="¿Quién ve qué?">
        <p>En <strong>Configuración → Mi equipo → ¿Quién ve qué?</strong> decides, por separado para <strong>Ventas</strong> y para <strong>Soporte</strong>, si <strong>Todos ven la información de todos</strong> o <strong>Cada quien ve solo lo suyo</strong>.</p>
        <ul>
          <li>Con “solo lo suyo”, el administrador ve todo y un gerente ve lo suyo y lo de quienes le reportan.</li>
          <li>Lo que no tiene responsable lo ven todos, para que alguien lo tome.</li>
        </ul>
      </Bloque>
    </Seccion>
  )
}

// ============================================================================
// BANDEJA
// ============================================================================

function Bandeja() {
  return (
    <Seccion
      id="bandeja"
      titulo="Bandeja: todas tus conversaciones"
      intro="WhatsApp, correo y redes en un solo lugar, ligados a la ficha de cada cliente."
    >
      <Bloque rotulo="Contactos" titulo="Asocia una conversación a un contacto">
        <p>Si una conversación todavía no está ligada a nadie, arriba verás dos botones:</p>
        <ul>
          <li><strong>Asociar a contacto</strong>: busca por nombre, correo o teléfono y haz clic en <strong>Asociar</strong>. Los mensajes de esa conversación, y los que lleguen después, pasan a ese contacto.</li>
          <li><strong>+ Crear contacto</strong>: si es alguien nuevo.</li>
        </ul>
      </Bloque>

      <Bloque rotulo="WhatsApp" titulo="Reacciones">
        <p>Cuando tu cliente reacciona a un mensaje con un emoji, lo ves en la conversación como <strong>“Reaccionó con 👍”</strong> (y a qué mensaje). También se leen bien las ubicaciones, los contactos y las respuestas con botones que te envían.</p>
      </Bloque>

      <Bloque rotulo="HelpDesk" titulo="Correo de un cliente conocido → ticket automático">
        <p>Si tienes el módulo HelpDesk y conectaste tu buzón de soporte de Microsoft 365, cuando escribe un <strong>contacto que ya está en PULSO</strong> se abre un ticket automáticamente.</p>
        <ul>
          <li>El correo también queda en la Bandeja.</li>
          <li>Los remitentes desconocidos (avisos, publicidad, gente nueva) no abren ticket solos: si lo amerita, usa <strong>Convertir a ticket</strong>.</li>
          <li>Los correos de personas de tu propia empresa no abren ticket.</li>
        </ul>
      </Bloque>

      <Bloque rotulo="WhatsApp" titulo={<>Palomitas de entrega <Etiqueta tipo="nuevo" /></>}>
        <p>Tus mensajes de WhatsApp muestran si llegaron:</p>
        <ul>
          <li><strong>✓</strong> enviado</li>
          <li><strong>✓✓</strong> entregado</li>
          <li><strong style={{ color: '#38bdf8' }}>✓✓</strong> en azul: leído</li>
        </ul>
        <p>Pasa el cursor sobre las palomitas para ver la hora de cada paso. Si un mensaje no se pudo entregar, lo verás marcado con <strong>“No se entregó.”</strong></p>
        <Tip>Disponible desde el 24 de octubre de 2026. Solo los mensajes enviados a partir de esa fecha llevan palomitas.</Tip>
      </Bloque>
    </Seccion>
  )
}

// ============================================================================
// SOPORTE REMOTO (TEAMVIEWER)
// ============================================================================

function SoporteRemoto() {
  return (
    <Seccion
      id="teamviewer"
      titulo="Soporte remoto con TeamViewer desde el ticket"
      etiqueta="solicitud"
      intro="Para equipos con PULSO HelpDesk: inicia la sesión remota desde el ticket y cada conexión queda registrada en él."
    >
      <Bloque rotulo="Antes de empezar" titulo="Cómo se activa">
        <ul>
          <li>Pídelo a <strong>{EMAIL_SOPORTE}</strong>. Necesitas el módulo HelpDesk y una cuenta de TeamViewer.</li>
          <li>Ya activado, un administrador entra a <strong>Configuración → HelpDesk → Soporte remoto</strong>, captura el <strong>Token de script de TeamViewer</strong> (se crea en la consola de TeamViewer: Editar perfil → Apps → Crear token de script) y hace clic en <strong>Guardar</strong> y <strong>Probar conexión</strong>.</li>
          <li>Opcional: marca <strong>Registrar las conexiones en los tickets</strong> y elige los <strong>Técnicos cuyas conexiones se registran</strong>.</li>
        </ul>
      </Bloque>

      <Bloque rotulo="Paso a paso" titulo="Iniciar la sesión desde el ticket">
        <ul>
          <li>Abre el ticket y haz clic en <strong>🖥️ Soporte remoto con TeamViewer</strong>.</li>
          <li>Aparece el panel <strong>Sesión de TeamViewer</strong> con el <strong>Código de sesión</strong> y hasta cuándo es válido.</li>
          <li>Copia la <strong>Liga para el cliente</strong> y compártela por el medio que prefieras (PULSO no la envía sola).</li>
          <li>Entra tú con <strong>Abrir TeamViewer (técnico)</strong>.</li>
        </ul>
        <p>Al terminar, la conexión aparece en el ticket, en <strong>Conexiones registradas en este ticket</strong>, y en su historial (se revisa cada 15 minutos).</p>
        <Tip>¿Te conectaste sin usar el botón? Escribe el folio del ticket (por ejemplo HD-2026-0012) en las notas de la conexión de TeamViewer y se liga a ese ticket.</Tip>
      </Bloque>
    </Seccion>
  )
}

// ============================================================================
// GOTO CONNECT
// ============================================================================

function GotoConnect() {
  return (
    <Seccion
      id="goto"
      titulo="Telefonía con GoTo Connect"
      intro="Conecta tu conmutador GoTo Connect y cada llamada queda en el CRM: sabes quién llama antes de contestar, registras llamadas y resúmenes, y marcas con un clic. Integración incluida, sin costo adicional."
    >
      <Bloque rotulo="Antes de empezar" titulo="Conecta tu cuenta">
        <ul>
          <li>Necesitas GoTo Connect plan <strong>Business</strong> o superior y ser administrador de esa cuenta de GoTo.</li>
          <li>En PULSO entra a <strong>Configuración → Telefonía (GoTo)</strong> y haz clic en <strong>Conectar GoTo</strong>.</li>
          <li>Cada usuario captura su extensión en <strong>Mi perfil → Extensión telefónica (GoTo)</strong>.</li>
        </ul>
        <Tip>¿No tienes conmutador? Pregúntanos por GoTo Connect.</Tip>
      </Bloque>

      <Bloque rotulo="Al contestar" titulo="La ficha del cliente aparece sola">
        <p>Cuando suena tu extensión (también si te pasan la llamada), aparece el aviso <strong>📞 Llamada entrante</strong> con el nombre, la empresa y su oportunidad abierta, y los botones <strong>Ver ficha</strong> y <strong>Ver oportunidad</strong>.</p>
      </Bloque>

      <Bloque rotulo="Registro" titulo="Registro y resumen de llamadas">
        <ul>
          <li>Cada llamada queda como actividad <strong>Llamada entrante</strong> o <strong>Llamada saliente</strong> en el historial del contacto y de la empresa, con quién la atendió. También las ves en <strong>Actividades</strong>.</li>
          <li>Unos minutos después se agrega la transcripción y un resumen: temas, ánimo del cliente, resultado, y los acuerdos y pendientes.</li>
        </ul>
        <Tip>Para transcripciones y resúmenes, tu cuenta de GoTo debe tener grabación de llamadas. Si falta un permiso, la pantalla te ofrece <strong>Reconectar para activar transcripciones</strong>.</Tip>
      </Bloque>

      <Bloque rotulo="Perdidas" titulo="Llamadas perdidas">
        <p>Al dueño de la extensión le llega a la campanita <strong>“📞 Llamada perdida de…”</strong>, o si dejaron mensaje en el buzón, para que regrese la llamada.</p>
      </Bloque>

      <Bloque rotulo="Números desconocidos" titulo="Agrega el número a un contacto">
        <p>Si llama un número que no está en el CRM, al administrador le llega el aviso <strong>“Llamada de … (no está en el CRM)”</strong>. Al abrirlo, PULSO pregunta <strong>¿De quién es el número?</strong>:</p>
        <ul>
          <li><strong>Crear contacto nuevo</strong>: abre el formulario con el teléfono ya capturado.</li>
          <li><strong>Agregar a un contacto existente</strong>: búscalo y haz clic en <strong>Agregar número</strong>. Las llamadas anteriores de ese número (con su transcripción y resumen) se pegan a su ficha.</li>
        </ul>
      </Bloque>

      <Bloque rotulo="Un clic" titulo="Llama con un clic">
        <ul>
          <li>Junto a cada teléfono en las fichas de empresas y contactos hay un botón de teléfono (<strong>Llamar a…</strong>).</li>
          <li>La primera vez te pregunta <strong>¿Desde dónde quieres llamar?</strong>: <strong>App de GoTo de esta computadora</strong>, o <strong>Que GoTo me marque primero</strong> (suena tu extensión y luego marca al cliente). Lo recuerda en esa computadora.</li>
        </ul>
      </Bloque>

      <Bloque rotulo="Reuniones" titulo={<>GoTo Meeting y GoTo Webinar <Etiqueta tipo="solicitud" /></>}>
        <ul>
          <li><strong>Meeting:</strong> tus reuniones aparecen en la ficha del cliente.</li>
          <li><strong>Webinar:</strong> los registrantes y asistentes llegan al CRM.</li>
        </ul>
        <p>Se activan juntos; pídelo a <strong>{EMAIL_SOPORTE}</strong>.</p>
      </Bloque>

      <Bloque rotulo="Varias empresas" titulo="Líneas por empresa">
        <p>Si varias empresas comparten una misma cuenta de GoTo, en <strong>Líneas de esta cuenta</strong> eliges qué números del conmutador son de esta empresa y haces clic en <strong>Guardar líneas</strong>. Las llamadas de otros números no se registran aquí. Si no eliges ninguno, se registran todas.</p>
      </Bloque>
    </Seccion>
  )
}

// ============================================================================
// MICROSOFT BOOKINGS
// ============================================================================

function Bookings() {
  return (
    <Seccion
      id="bookings"
      titulo="Citas de Microsoft Bookings"
      etiqueta="solicitud"
      intro="Las citas que tus clientes agendan en tu página de Microsoft Bookings llegan a PULSO como prospectos, sin capturarlas."
    >
      <Bloque rotulo="Antes de empezar" titulo="Cómo se activa">
        <p>Pídelo a <strong>{EMAIL_SOPORTE}</strong> con el correo de tu página de reservas (por ejemplo reservas@tuempresa.com). Se necesita tener Microsoft 365 conectado a PULSO.</p>
      </Bloque>

      <Bloque rotulo="Qué hace" titulo="Cada cita, un prospecto">
        <ul>
          <li>Reconoce al cliente por su correo o teléfono, o crea el contacto si es nuevo. Solo llena datos vacíos; no sobrescribe lo que ya tienes.</li>
          <li>Crea la oportunidad <strong>“Bookings: (servicio)”</strong> en la primera etapa, asignada a quien da la cita.</li>
          <li>Deja la nota <strong>📅 Reservó en Bookings</strong> en el historial, y también si cambia o cancela su cita.</li>
          <li>Te avisa con la notificación <strong>Nueva cita en Bookings</strong>.</li>
        </ul>
        <Tip>Las citas se revisan cada 15 minutos. Las citas se siguen agendando y administrando en Bookings; PULSO las recibe.</Tip>
      </Bloque>
    </Seccion>
  )
}

// ============================================================================
// INTEGRACIONES
// ============================================================================

function Integraciones() {
  const filas = [
    ['CONTPAQi Comercial Pro y Premium', 'Clientes, productos, existencias y saldos llegan solos; pedidos y pagos regresan a CONTPAQi.', 'Configuración → Bridge CONTPAQi', null],
    ['WhatsApp Business', 'Tus conversaciones en la Bandeja, plantillas, campañas y el historial en la ficha del cliente.', 'Configuración → Comunicación', null],
    ['Microsoft 365', 'Envía correo desde tu cuenta, recibe el buzón de soporte y sincroniza tu calendario de Outlook.', 'Configuración → Comunicación y Mi perfil', null],
    ['Microsoft Bookings', 'Las citas que agendan tus clientes llegan como prospectos.', 'Con soporte', 'solicitud'],
    ['Google Calendar', 'Las reuniones, llamadas y visitas de cada vendedor aparecen en su calendario.', 'Mi perfil', null],
    ['GoTo Connect', 'Ficha del cliente al contestar, registro y resumen de llamadas, llamadas perdidas y llamar con un clic. Sin costo adicional.', 'Configuración → Telefonía (GoTo)', null],
    ['GoTo Meeting y Webinar', 'Reuniones en la ficha del cliente; registrantes y asistentes al CRM.', 'Con soporte', 'solicitud'],
    ['TeamViewer', 'Sesión remota desde el ticket y cada conexión registrada en él.', 'Configuración → HelpDesk', 'solicitud'],
    ['Mercado Pago', 'Links de pago para tus facturas; el pago se registra solo y el dinero llega a tu cuenta.', 'Configuración → Cobranza', null],
    ['Conekta', 'Cobro por SPEI con PULSO Cobro.', 'Configuración → Cobranza', null],
    ['Facebook e Instagram', 'Mensajes de tus páginas en la Bandeja.', 'Configuración → Comunicación', null],
  ]
  return (
    <Seccion
      id="integraciones"
      titulo="Integraciones disponibles"
      intro="Lo que puedes conectar a PULSO y para qué sirve. Las marcadas “A solicitud” se activan escribiendo a soporte."
    >
      <div className="paso solo">
        <div className="paso-texto tabla-wrap">
          <table className="tabla-simple">
            <thead>
              <tr><th>Integración</th><th>Qué hace</th><th>Dónde se conecta</th></tr>
            </thead>
            <tbody>
              {filas.map(([nombre, que, donde, etiqueta]) => (
                <tr key={nombre}>
                  <td><strong>{nombre}</strong>{etiqueta && <Etiqueta tipo={etiqueta} />}</td>
                  <td>{que}</td>
                  <td>{donde}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Tip>¿Quieres activar una integración “A solicitud”? Escríbenos a <strong>{EMAIL_SOPORTE}</strong>.</Tip>
        </div>
      </div>
    </Seccion>
  )
}

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
            WhatsApp +52 1 443 980 0967
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

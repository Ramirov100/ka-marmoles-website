import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'

const TIPOS_PROYECTO = [
  { id: 'mueble', nombre: 'Mueble a medida' },
  { id: 'losas', nombre: 'Losas y láminas' },
  { id: 'arquitectonico', nombre: 'Proyecto arquitectónico' },
  { id: 'otro', nombre: 'Otro' },
]

interface Campos {
  nombre: string
  telefono: string
  correo: string
  proyecto: string
  interes: string
  mensaje: string
}

export default function Cotizar() {
  const [params] = useSearchParams()
  const [campos, setCampos] = useState<Campos>({
    nombre: '',
    telefono: '',
    correo: '',
    proyecto: TIPOS_PROYECTO.some(t => t.id === params.get('proyecto')) ? params.get('proyecto')! : '',
    interes: params.get('interes') ?? '',
    mensaje: '',
  })
  const [errores, setErrores] = useState<Partial<Record<keyof Campos, string>>>({})
  const [enviado, setEnviado] = useState(false)

  const cambiar = (campo: keyof Campos) => (e: { target: { value: string } }) =>
    setCampos(c => ({ ...c, [campo]: e.target.value }))

  function validar(): boolean {
    const err: Partial<Record<keyof Campos, string>> = {}
    if (campos.nombre.trim().length < 2) err.nombre = 'Cuéntanos tu nombre.'
    if (!/^[\d\s()+-]{8,}$/.test(campos.telefono.trim())) err.telefono = 'Necesitamos un teléfono válido.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.correo.trim())) err.correo = 'Necesitamos un correo válido.'
    if (!campos.proyecto) err.proyecto = 'Elige el tipo de proyecto.'
    if (campos.mensaje.trim().length < 10) err.mensaje = 'Cuéntanos un poco más de tu proyecto.'
    setErrores(err)
    return Object.keys(err).length === 0
  }

  function enviar(e: FormEvent) {
    e.preventDefault()
    if (!validar()) return
    // TODO: conectar el envío a Supabase (tabla `cotizaciones`) o a un servicio de correo.
    // Por ahora solo mostramos la confirmación; los datos no se persisten.
    setEnviado(true)
    window.scrollTo(0, 0)
  }

  if (enviado) {
    return (
      <section className="seccion" style={{ paddingTop: 140, minHeight: '70vh' }}>
        <SEO titulo="Solicitud enviada" descripcion="Tu solicitud de cotización fue recibida. Te respondemos el mismo día hábil." />
        <div className="container">
          <span className="eyebrow">Solicitud enviada</span>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 24px', maxWidth: '16ch' }}>
            Gracias, {campos.nombre.trim().split(' ')[0]}.
          </h2>
          <p className="prosa" style={{ color: 'var(--veta)', maxWidth: '48ch', marginBottom: 40 }}>
            Recibimos tu solicitud y la estamos revisando con el taller.
            Te respondemos el mismo día hábil al teléfono o correo que nos compartiste.
          </p>
          <div className="hero-acciones">
            <Link to="/coleccion" className="btn">Ver la colección</Link>
            <Link to="/materiales" className="btn">Explorar materiales</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="seccion" style={{ paddingTop: 140 }}>
      <SEO titulo="Cotizar" descripcion="Cotiza tu proyecto con K+A Mármoles: mobiliario a medida, losas y láminas de piedra natural. Te respondemos el mismo día hábil." />
      <div className="container">
        <span className="eyebrow">Cotización</span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 24px', maxWidth: '16ch' }}>
          Cotiza tu proyecto.
        </h2>
        <p className="prosa" style={{ color: 'var(--veta)', maxWidth: '52ch', marginBottom: 56 }}>
          Cuéntanos qué imaginas: la pieza, la piedra y las dimensiones.
          Te respondemos el mismo día hábil.
        </p>

        <form className="form-cotizar" onSubmit={enviar} noValidate>
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" type="text" autoComplete="name" value={campos.nombre}
              onChange={cambiar('nombre')} aria-invalid={!!errores.nombre} />
            {errores.nombre && <span className="campo-error" role="alert">{errores.nombre}</span>}
          </div>

          <div className="campo">
            <label htmlFor="telefono">Teléfono</label>
            <input id="telefono" type="tel" autoComplete="tel" value={campos.telefono}
              onChange={cambiar('telefono')} aria-invalid={!!errores.telefono} />
            {errores.telefono && <span className="campo-error" role="alert">{errores.telefono}</span>}
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo</label>
            <input id="correo" type="email" autoComplete="email" value={campos.correo}
              onChange={cambiar('correo')} aria-invalid={!!errores.correo} />
            {errores.correo && <span className="campo-error" role="alert">{errores.correo}</span>}
          </div>

          <div className="campo">
            <label htmlFor="proyecto">Tipo de proyecto</label>
            <select id="proyecto" value={campos.proyecto} onChange={cambiar('proyecto')} aria-invalid={!!errores.proyecto}>
              <option value="" disabled>Selecciona una opción</option>
              {TIPOS_PROYECTO.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
            {errores.proyecto && <span className="campo-error" role="alert">{errores.proyecto}</span>}
          </div>

          <div className="campo campo-ancho">
            <label htmlFor="interes">Pieza o material de interés <span className="opcional">Opcional</span></label>
            <input id="interes" type="text" value={campos.interes} onChange={cambiar('interes')}
              placeholder="Ej. Mesa Comedor Kim, Travertino Veracruz…" />
          </div>

          <div className="campo campo-ancho">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" rows={5} value={campos.mensaje}
              onChange={cambiar('mensaje')} aria-invalid={!!errores.mensaje}
              placeholder="Dimensiones, espacio, acabado, tiempos…" />
            {errores.mensaje && <span className="campo-error" role="alert">{errores.mensaje}</span>}
          </div>

          <div className="campo-ancho">
            <button type="submit" className="btn oro">Enviar solicitud</button>
          </div>
        </form>
      </div>
    </section>
  )
}

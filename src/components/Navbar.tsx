import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const enlaces = [
  { a: '/coleccion', t: 'Colección' },
  { a: '/nosotros', t: 'Nosotros' },
  { a: '/contacto', t: 'Contacto' },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setAbierto(false)}>
          <span className="mono">K+A</span>
          <span>Mármoles</span>
        </Link>
        <button className="nav-toggle" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} aria-label="Abrir menú">
          Menú
        </button>
        <nav className={`nav-links ${abierto ? 'abierto' : ''}`}>
          {enlaces.map(e => (
            <NavLink key={e.a} to={e.a} onClick={() => setAbierto(false)}
              className={({ isActive }) => (isActive ? 'activo' : '')}>
              {e.t}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

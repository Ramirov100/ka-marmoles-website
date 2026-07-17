export type Categoria = 'mesas-comedor' | 'mesas-centro' | 'escritorios' | 'estanterias'

export interface Producto {
  id: string
  slug: string
  nombre: string
  categoria: Categoria
  tipo_marmol: string
  tono: 'blanco' | 'negro' | 'travertino' | 'verde' | 'gris'
  dimensiones: string
  descripcion: string
  imagenes: string[]
  destacado: boolean
}

export const CATEGORIAS: { id: Categoria; nombre: string }[] = [
  { id: 'mesas-comedor', nombre: 'Mesas de Comedor' },
  { id: 'mesas-centro', nombre: 'Mesas de Centro' },
  { id: 'escritorios', nombre: 'Escritorios' },
  { id: 'estanterias', nombre: 'Estanterías' },
]

// Datos semilla — se reemplazan por Supabase cuando VITE_SUPABASE_URL está configurado.
// Dimensiones y mármoles por confirmar con cliente.
export const PRODUCTOS: Producto[] = [
  {
    id: '1', slug: 'mesa-comedor-kim', nombre: 'Mesa Comedor Kim', categoria: 'mesas-comedor',
    tipo_marmol: 'Calacatta', tono: 'blanco', dimensiones: '240 × 110 × 75 cm',
    descripcion: 'Mesa de comedor de líneas depuradas con cubierta de mármol Calacatta. Una pieza central que equilibra presencia escultórica y sobriedad.',
    imagenes: ['/productos/mesa-comedor-kim.jpg'], destacado: true,
  },
  {
    id: '2', slug: 'mesa-comedor-santito', nombre: 'Mesa Comedor Santito', categoria: 'mesas-comedor',
    tipo_marmol: 'Negro Marquina', tono: 'negro', dimensiones: '220 × 100 × 75 cm',
    descripcion: 'Comedor en mármol Negro Marquina con vetas blancas de alto contraste. Carácter y profundidad para espacios contemporáneos.',
    imagenes: ['/productos/mesa-comedor-santito.jpg'], destacado: true,
  },
  {
    id: '3', slug: 'mesa-comedor-nendo', nombre: 'Mesa Comedor Nendo', categoria: 'mesas-comedor',
    tipo_marmol: 'Travertino Fiorito', tono: 'travertino', dimensiones: '200 × 100 × 74 cm',
    descripcion: 'Inspirada en la geometría japonesa, la Nendo combina travertino con proporciones ligeras y una silueta flotante.',
    imagenes: ['/productos/mesa-comedor-nendo.jpg'], destacado: false,
  },
  {
    id: '4', slug: 'mesa-de-comedor-clasica', nombre: 'Mesa de Comedor K+A', categoria: 'mesas-comedor',
    tipo_marmol: 'Blanco Carrara', tono: 'blanco', dimensiones: 'Sobre pedido',
    descripcion: 'Nuestro comedor de línea clásica, fabricado a la medida en mármol Blanco Carrara. Cada pieza se produce sobre pedido.',
    imagenes: ['/productos/mesa-de-comedor-clasica.jpg'], destacado: false,
  },
  {
    id: '5', slug: 'mesa-centro-giratorio', nombre: 'Centro Giratorio', categoria: 'mesas-centro',
    tipo_marmol: 'Verde Tikal', tono: 'verde', dimensiones: 'Ø 120 × 35 cm',
    descripcion: 'Mesa de centro con mecanismo giratorio y cubierta en mármol Verde Tikal. Movimiento y materia en una sola pieza.',
    imagenes: ['/productos/mesa-centro-giratorio.jpg'], destacado: true,
  },
  {
    id: '6', slug: 'mesa-centro-olivia', nombre: 'Mesa Centro Olivia', categoria: 'mesas-centro',
    tipo_marmol: 'Calacatta Oro', tono: 'blanco', dimensiones: '130 × 70 × 38 cm',
    descripcion: 'La Olivia suaviza el mármol Calacatta Oro con cantos redondeados y una base baja de gran estabilidad visual.',
    imagenes: ['/productos/mesa-centro-olivia.jpg'], destacado: false,
  },
  {
    id: '7', slug: 'mesa-centro-serax', nombre: 'Mesa Centro Serax', categoria: 'mesas-centro',
    tipo_marmol: 'Gris Oriental', tono: 'gris', dimensiones: '120 × 60 × 40 cm',
    descripcion: 'Volúmenes puros en mármol Gris Oriental. La Serax funciona sola o en composición con módulos de distinta altura.',
    imagenes: ['/productos/mesa-centro-serax.jpg'], destacado: false,
  },
  {
    id: '8', slug: 'mesa-centro-catano', nombre: 'Mesa Centro Catano', categoria: 'mesas-centro',
    tipo_marmol: 'Travertino Romano', tono: 'travertino', dimensiones: '110 × 110 × 32 cm',
    descripcion: 'Cuadrada, baja y monolítica: la Catano celebra la textura porosa del travertino romano en su expresión más honesta.',
    imagenes: ['/productos/mesa-centro-catano.jpg'], destacado: false,
  },
  {
    id: '9', slug: 'escritorio-arcit', nombre: 'Escritorio Arcit', categoria: 'escritorios',
    tipo_marmol: 'Negro Monterrey', tono: 'negro', dimensiones: '160 × 75 × 76 cm',
    descripcion: 'Escritorio ejecutivo en mármol Negro Monterrey. Superficie de trabajo imponente con gestión de cables integrada.',
    imagenes: ['/productos/escritorio-arcit.jpg'], destacado: true,
  },
  {
    id: '10', slug: 'librero-sadel', nombre: 'Librero Sadel', categoria: 'estanterias',
    tipo_marmol: 'Blanco Carrara', tono: 'blanco', dimensiones: '180 × 35 × 200 cm',
    descripcion: 'Estantería modular con repisas de mármol Blanco Carrara y estructura metálica en acabado latón. Arquitectura para objetos.',
    imagenes: ['/productos/librero-sadel.jpg'], destacado: false,
  },
]

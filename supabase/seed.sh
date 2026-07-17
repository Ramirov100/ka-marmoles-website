#!/usr/bin/env bash
# Seed de los 10 productos de K+A Mármoles vía REST (service_role).
# Uso: SUPABASE_URL=... SUPABASE_SERVICE_ROLE=... bash supabase/seed.sh

set -euo pipefail
: "${SUPABASE_URL:?Define SUPABASE_URL}"
: "${SUPABASE_SERVICE_ROLE:?Define SUPABASE_SERVICE_ROLE}"

curl -sS -X POST "$SUPABASE_URL/rest/v1/productos" \
  -H "apikey: $SUPABASE_SERVICE_ROLE" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE" \
  -H "Content-Type: application/json" \
  -H "Prefer: resolution=merge-duplicates" \
  -d @- << 'JSON'
[
  {"slug":"mesa-comedor-kim","nombre":"Mesa Comedor Kim","categoria":"mesas-comedor","tipo_marmol":"Calacatta","tono":"blanco","dimensiones":"240 × 110 × 75 cm","descripcion":"Mesa de comedor de líneas depuradas con cubierta de mármol Calacatta. Una pieza central que equilibra presencia escultórica y sobriedad.","destacado":true},
  {"slug":"mesa-comedor-santito","nombre":"Mesa Comedor Santito","categoria":"mesas-comedor","tipo_marmol":"Negro Marquina","tono":"negro","dimensiones":"220 × 100 × 75 cm","descripcion":"Comedor en mármol Negro Marquina con vetas blancas de alto contraste. Carácter y profundidad para espacios contemporáneos.","destacado":true},
  {"slug":"mesa-comedor-nendo","nombre":"Mesa Comedor Nendo","categoria":"mesas-comedor","tipo_marmol":"Travertino Fiorito","tono":"travertino","dimensiones":"200 × 100 × 74 cm","descripcion":"Inspirada en la geometría japonesa, la Nendo combina travertino con proporciones ligeras y una silueta flotante.","destacado":false},
  {"slug":"mesa-de-comedor-clasica","nombre":"Mesa de Comedor K+A","categoria":"mesas-comedor","tipo_marmol":"Blanco Carrara","tono":"blanco","dimensiones":"Sobre pedido","descripcion":"Nuestro comedor de línea clásica, fabricado a la medida en mármol Blanco Carrara. Cada pieza se produce sobre pedido.","destacado":false},
  {"slug":"mesa-centro-giratorio","nombre":"Centro Giratorio","categoria":"mesas-centro","tipo_marmol":"Verde Tikal","tono":"verde","dimensiones":"Ø 120 × 35 cm","descripcion":"Mesa de centro con mecanismo giratorio y cubierta en mármol Verde Tikal. Movimiento y materia en una sola pieza.","destacado":true},
  {"slug":"mesa-centro-olivia","nombre":"Mesa Centro Olivia","categoria":"mesas-centro","tipo_marmol":"Calacatta Oro","tono":"blanco","dimensiones":"130 × 70 × 38 cm","descripcion":"La Olivia suaviza el mármol Calacatta Oro con cantos redondeados y una base baja de gran estabilidad visual.","destacado":false},
  {"slug":"mesa-centro-serax","nombre":"Mesa Centro Serax","categoria":"mesas-centro","tipo_marmol":"Gris Oriental","tono":"gris","dimensiones":"120 × 60 × 40 cm","descripcion":"Volúmenes puros en mármol Gris Oriental. La Serax funciona sola o en composición con módulos de distinta altura.","destacado":false},
  {"slug":"mesa-centro-catano","nombre":"Mesa Centro Catano","categoria":"mesas-centro","tipo_marmol":"Travertino Romano","tono":"travertino","dimensiones":"110 × 110 × 32 cm","descripcion":"Cuadrada, baja y monolítica: la Catano celebra la textura porosa del travertino romano en su expresión más honesta.","destacado":false},
  {"slug":"escritorio-arcit","nombre":"Escritorio Arcit","categoria":"escritorios","tipo_marmol":"Negro Monterrey","tono":"negro","dimensiones":"160 × 75 × 76 cm","descripcion":"Escritorio ejecutivo en mármol Negro Monterrey. Superficie de trabajo imponente con gestión de cables integrada.","destacado":true},
  {"slug":"librero-sadel","nombre":"Librero Sadel","categoria":"estanterias","tipo_marmol":"Blanco Carrara","tono":"blanco","dimensiones":"180 × 35 × 200 cm","descripcion":"Estantería modular con repisas de mármol Blanco Carrara y estructura metálica en acabado latón. Arquitectura para objetos.","destacado":false}
]
JSON
echo "Seed completado."

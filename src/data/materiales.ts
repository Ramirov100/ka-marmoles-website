export type CategoriaMaterial = 'marmol-nacional' | 'granito' | 'cantera' | 'basalto' | 'marmol-importado'

export interface Material {
  nombre: string
  slug: string
  categoria: CategoriaMaterial
  imagen: string | null  // null = sin foto: la UI muestra MarbleSwatch procedural como fallback
  descripcion: string
}

export const CATEGORIAS_MATERIAL: { id: CategoriaMaterial; nombre: string }[] = [
  { id: 'marmol-nacional', nombre: 'Mármoles Nacionales' },
  { id: 'marmol-importado', nombre: 'Mármoles Importados' },
  { id: 'granito', nombre: 'Granitos' },
  { id: 'cantera', nombre: 'Canteras' },
  { id: 'basalto', nombre: 'Basaltos' },
]

export const nombreCategoria = (id: CategoriaMaterial) =>
  CATEGORIAS_MATERIAL.find(c => c.id === id)?.nombre ?? id

// Descripciones editoriales propias: carácter visual, origen y aplicaciones.
// Sin especificaciones técnicas inventadas.
export const MATERIALES: Material[] = [
  {
    nombre: 'Travertino Veracruz Veta', slug: 'travertino-veracruz-veta', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/travertino-veracruz-veta.jpg',
    descripcion: 'Cortado a veta, el travertino de Veracruz revela bandas paralelas en tonos miel y arena que recorren la superficie con una serenidad casi textil. Es la piedra mexicana por excelencia para quien busca calidez sin estridencia. Su lectura lineal ordena muros y pisos de gran formato, y en cubiertas y mobiliario aporta una luz dorada que envejece con nobleza.',
  },
  {
    nombre: 'Travertino Veracruz Fiorito', slug: 'travertino-veracruz-fiorito', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/travertino-veracruz-fiorito.jpg',
    descripcion: 'El corte al contraveta —fiorito— abre el travertino veracruzano en nubes cremosas y remolinos suaves, como un paisaje visto desde arriba. Menos lineal y más orgánico que su hermano de veta, conserva la misma paleta cálida de cremas y beiges. Es un clásico para pisos interiores, baños completos y muros que piden textura sin contraste dramático.',
  },
  {
    nombre: 'Café Tabaco', slug: 'cafe-tabaco', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/cafe-tabaco.jpg',
    descripcion: 'Un mármol mexicano de fondo pardo profundo, moteado con destellos ocres y vetas discretas que recuerdan la hoja curada del tabaco. Su temperatura visual es única entre las piedras nacionales: envuelve el espacio en lugar de iluminarlo. Espléndido en cubiertas de bar, recepciones y muros de acento donde se busca intimidad, materia y un lujo callado.',
  },
  {
    nombre: 'Santo Tomás Lila', slug: 'santo-tomas-lila', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/santo-tomas-lila.jpg',
    descripcion: 'La variante más singular de la familia Santo Tomás: un gris pardo atravesado por finísimas vetas rojizas y lilas que aparecen como hilos de cobre sobre la piedra. Es un mármol nacional de carácter sutil, que se descubre de cerca. Funciona con elegancia en pisos y muros interiores, y da a las cubiertas un matiz cálido difícil de encontrar.',
  },
  {
    nombre: 'Travertino Puebla Fiorito', slug: 'travertino-puebla-fiorito', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/travertino-puebla-fiorito.jpg',
    descripcion: 'De los bancos poblanos, este travertino al contraveta despliega un moteado cremoso, denso y homogéneo, con la porosidad característica de la piedra volcánica de agua. Su tono marfil neutro lo vuelve un comodín del interiorismo: combina con maderas claras y oscuras por igual. Ideal para pisos de áreas amplias, fachadas interiores y baños de espíritu mediterráneo.',
  },
  {
    nombre: 'Travertino Puebla Veta', slug: 'travertino-puebla-veta', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/travertino-puebla-veta.jpg',
    descripcion: 'El corte a veta del travertino de Puebla dibuja estratos beige y dorados de ritmo constante, algo más contrastados que los de Veracruz. Cada tabla cuenta la sedimentación de la piedra línea por línea. Es un material agradecido en láminas de gran formato: muros de vestíbulo, escaleras y cubiertas donde la dirección de la veta guía la mirada.',
  },
  {
    nombre: 'Gris Tepeaca', slug: 'gris-tepeaca', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/gris-tepeaca.jpg',
    descripcion: 'De la región marmolera de Tepeaca, un gris granulado, sobrio y uniforme, con vetas apenas insinuadas. Es el neutro de trabajo de la piedra mexicana: disciplinado, disponible en buen formato y sin sorpresas de tono. Arquitectos lo eligen para pisos de alto tránsito, lambrines y proyectos donde la piedra debe acompañar sin protagonizar.',
  },
  {
    nombre: 'Negro Marquina Brillado', slug: 'negro-marquina-brillado', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/negro-marquina-brillado.jpg',
    descripcion: 'El negro clásico del mármol en su acabado más intenso: pulido a brillo, con vetas blancas que cruzan el fondo profundo como relámpagos detenidos. Pocas piedras dan tanto carácter con tan pocos elementos. Es la elección natural para cubiertas dramáticas, baños de lujo y mobiliario escultórico, donde cada veta funciona como una firma irrepetible.',
  },
  {
    nombre: 'Santo Tomás Claro', slug: 'santo-tomas-claro', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/santo-tomas-claro.jpg',
    descripcion: 'La cara luminosa de la familia Santo Tomás: un gris perla suave con movimiento nublado y vetas finas que se funden en el fondo. Mármol mexicano versátil y de temperamento tranquilo, aporta claridad sin la frialdad de los grises importados. Se luce en pisos interiores, muros de baño y cubiertas donde se busca luz natural y continuidad.',
  },
  {
    nombre: 'Santo Tomás Obscuro', slug: 'santo-tomas-obscuro', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/santo-tomas-obscuro.jpg',
    descripcion: 'La versión profunda del Santo Tomás: chocolate y pardo oscuro con nubes tenues que apenas rompen la superficie. Es una piedra nacional de presencia contenida, más atmósfera que dibujo. En lambrines, chimeneas y cubiertas de mobiliario crea fondos cálidos que hacen brillar el latón, la madera y la luz indirecta.',
  },
  {
    nombre: 'Dorado Tepeji', slug: 'dorado-tepeji', categoria: 'marmol-nacional',
    imagen: '/materiales/nacionales/dorado-tepeji.jpg',
    descripcion: 'De los bancos de la región de Tepeji, un mármol crema dorado con moteado cálido y vetas de miel que le dan un resplandor constante, como piedra bañada en luz de tarde. Es uno de los nacionales más queridos para hotelería: pisos de lobby, muros de baño y escaleras completas donde se busca amplitud, calidez y un dorado que no cansa.',
  },
  {
    nombre: 'Tunguska Brillado', slug: 'tunguska-brillado', categoria: 'granito',
    imagen: '/materiales/nacionales/tunguska-brillado.jpg',
    descripcion: 'Granito negro de fondo profundo salpicado por escamas doradas y cobrizas que chispean bajo el acabado brillado. De noche, con luz puntual, la superficie parece un cielo encendido. Su dureza lo vuelve ideal para cubiertas de cocina de uso intenso, barras y mesas de trabajo, donde suma un dramatismo que el mármol negro reserva para zonas más protegidas.',
  },
  {
    nombre: 'Santa Cecilia', slug: 'santa-cecilia', categoria: 'granito',
    imagen: '/materiales/nacionales/santa-cecilia.jpg',
    descripcion: 'El granito brasileño más celebrado de su generación: fondo beige dorado con granates y motas oscuras repartidas en un tejido denso y regular. Es un material de confianza absoluta para cocinas —cubiertas, islas, antecomedores— porque disimula el uso diario y combina con casi cualquier madera. Un clásico que sigue vigente por razones prácticas y visuales.',
  },
  {
    nombre: 'Blanco Dallas', slug: 'blanco-dallas', categoria: 'granito',
    imagen: '/materiales/nacionales/blanco-dallas.jpg',
    descripcion: 'Granito claro de grano fino, donde blancos, cremas y puntos grafito se mezclan en una superficie luminosa y pareja. Es la alternativa pétrea y resistente a los mármoles blancos: da claridad a cocinas y baños sin las precauciones que pide la caliza. En cubiertas de gran formato y lambrines mantiene un aspecto fresco por décadas.',
  },
  {
    nombre: 'Juparana', slug: 'juparana', categoria: 'granito',
    imagen: '/materiales/nacionales/juparana.jpg',
    descripcion: 'De la tradición granitera de Brasil, el Juparana ondula en corrientes beige, arena y pardo que atraviesan la tabla como un río lento. Es un granito con movimiento de mármol: cada lámina tiene dirección y narrativa. Rinde espléndido en barras largas, cubiertas continuas y muros donde la veta puede correr sin interrupciones.',
  },
  {
    nombre: 'Himalaya', slug: 'himalaya', categoria: 'granito',
    imagen: '/materiales/nacionales/himalaya.jpg',
    descripcion: 'Un granito de espectáculo: remolinos rojizos, vetas azul acero y cristales rosados girando en una misma tabla. Cada lámina es un mapa geológico en miniatura, imposible de repetir. Se reserva para gestos protagónicos —una isla de cocina, un muro de recepción, una barra— donde la piedra es la obra y el resto del espacio la enmarca.',
  },
  {
    nombre: 'Gris Oxford', slug: 'gris-oxford', categoria: 'granito',
    imagen: '/materiales/nacionales/gris-oxford.jpg',
    descripcion: 'Granito gris de grano fino y tono constante, sin dibujos que distraigan: pura materia mineral en su expresión más disciplinada. Es el material que los arquitectos especifican cuando el proyecto pide piedra real con comportamiento de superficie técnica. Excelente en pisos exteriores e interiores de alto tránsito, escalones, cubiertas de trabajo y zócalos urbanos.',
  },
  {
    nombre: 'Granito Viscount White', slug: 'granito-viscount-white', categoria: 'granito',
    imagen: '/materiales/nacionales/granito-viscount-white.jpg',
    descripcion: 'Granito de origen indio con oleaje gris y blanco en diagonales dramáticas, más cercano al gesto de un mármol veteado que al punteado clásico del granito. Sus ondas oscuras sobre fondo claro dan movimiento a cubiertas, islas y muros de acento. Una opción para quien quiere el dibujo del mármol con la resistencia del granito.',
  },
  {
    nombre: 'Blue Point', slug: 'blue-point', categoria: 'granito',
    imagen: '/materiales/nacionales/blue-point.jpg',
    descripcion: 'Granito de fondo gris azulado profundo, con un moteado denso que de lejos se lee casi uniforme y de cerca revela un universo de cristales. Ese azul mineral, poco común en piedra natural, enfría y eleva cualquier paleta. Funciona en cubiertas exteriores, barras y pisos donde se busca un neutro con temperamento propio.',
  },
  {
    nombre: 'Blanca Mexicana', slug: 'blanca-mexicana', categoria: 'cantera',
    imagen: '/materiales/nacionales/blanca-mexicana.jpg',
    descripcion: 'La cantera blanca de la tradición constructiva mexicana: superficie mate, granulada, con inclusiones minerales que le dan vida sin romper su claridad. Es piedra de arquitectura más que de decoración: fachadas, marcos, cornisas y muros completos que respiran y envejecen con dignidad. En interiores aporta una textura artesanal que el mármol pulido no puede imitar.',
  },
  {
    nombre: 'Blanca Huixquilucan', slug: 'blanca-huixquilucan', categoria: 'cantera',
    imagen: '/materiales/nacionales/blanca-huixquilucan.jpg',
    descripcion: 'Extraída en la región de Huixquilucan —la casa de K+A—, esta cantera clara de grano abierto y matices grises es piedra local en el sentido más literal. Su textura porosa toma la luz de manera suave, sin reflejos. Ideal para fachadas, celosías, recubrimientos exteriores y muros interiores que buscan arraigo y materialidad honesta.',
  },
  {
    nombre: 'Cantera Conchuela', slug: 'cantera-conchuela', categoria: 'cantera',
    imagen: '/materiales/nacionales/cantera-conchuela.jpg',
    descripcion: 'Una piedra sedimentaria sembrada de conchas y fósiles marinos que aparecen en la superficie como grabados naturales. Cada lámina es un fragmento de fondo marino detenido en el tiempo. La Conchuela da carácter a fachadas, muros de patio y baños tipo spa; pulida, sus fósiles se leen con nitidez de lámina de historia natural.',
  },
  {
    nombre: 'Cantera Naranja', slug: 'cantera-naranja', categoria: 'cantera',
    imagen: '/materiales/nacionales/cantera-naranja.jpg',
    descripcion: 'Cantera mexicana de tono terracota encendido, con inclusiones volcánicas que puntúan el fondo naranja como ceniza atrapada. Es color de arquitectura mexicana en estado puro: cálido, terroso, vibrante bajo el sol. Se emplea en fachadas, marcos de vanos, muros de acento y patios donde se quiere continuidad con la tradición constructiva del país.',
  },
  {
    nombre: 'Negra América', slug: 'negra-america', categoria: 'cantera',
    imagen: '/materiales/nacionales/negra-america.jpg',
    descripcion: 'Piedra volcánica de fondo gris carbón con inclusiones claras dispersas, densa y de textura cerrada. Su oscuridad mate absorbe la luz y da profundidad a los planos arquitectónicos. Es un material de exteriores por vocación —fachadas, pisos de patio, escalones— que en interiores contemporáneos funciona como contrapunto sobrio de maderas y latones.',
  },
  {
    nombre: 'Galarza Blanca', slug: 'galarza-blanca', categoria: 'cantera',
    imagen: '/materiales/nacionales/galarza-blanca.jpg',
    descripcion: 'Cantera clara de superficie rugosa y tono hueso, con el tacto franco de la piedra recién labrada. Su acabado natural, casi escultórico, captura sombras pequeñas que cambian con la hora del día. Es ideal para muros texturizados, fachadas y recubrimientos donde la piedra debe verse trabajada a mano, no procesada a máquina.',
  },
  {
    nombre: 'Estriado Pulido Mate', slug: 'estriado-pulido-mate', categoria: 'basalto',
    imagen: '/materiales/nacionales/estriado-pulido-mate.jpg',
    descripcion: 'Basalto —recinto— trabajado con estrías paralelas y acabado pulido mate: la piedra volcánica mexicana convertida en superficie rítmica. Las líneas talladas generan sombra y relieve, y la porosidad natural del basalto queda enmarcada en un orden casi textil. Espléndido en muros de agua, fachadas y lambrines exteriores de arquitectura contemporánea.',
  },
  {
    nombre: 'Cepillado', slug: 'cepillado', categoria: 'basalto',
    imagen: '/materiales/nacionales/cepillado.jpg',
    descripcion: 'El basalto en su expresión más directa: superficie cepillada que suaviza el poro volcánico sin ocultarlo, dejando una textura pareja, grisácea y profundamente mineral. Es el recinto de las plazas y los conventos, puesto al día. Se usa en pisos interiores y exteriores, escalones y muros donde se busca sobriedad volcánica con tacto amable.',
  },
  {
    nombre: 'Black Levadía', slug: 'black-levadia', categoria: 'marmol-importado',
    imagen: '/materiales/importados/black-levadia.jpg',
    descripcion: 'Mármol negro de importación con un velo de cristales plateados que recorre el fondo como escarcha nocturna. No depende de vetas dramáticas: su riqueza está en la textura fina que revela la luz rasante. En cubiertas, lambrines de baño y mobiliario aporta una oscuridad sofisticada, menos gráfica y más atmosférica que los negros veteados.',
  },
  {
    nombre: 'Galaxy Brillado', slug: 'galaxy-brillado', categoria: 'marmol-importado',
    imagen: '/materiales/importados/galaxy-brillado.jpg',
    descripcion: 'Fondo negro absoluto sembrado de destellos metálicos: el célebre efecto galaxia que dio nombre a esta piedra. Pulida a brillo, cada punto refleja la luz como una estrella fija. Es un material de gesto nocturno para barras, cubiertas de tocador y detalles de mobiliario donde el negro debe tener profundidad y no solo color.',
  },
  {
    nombre: 'Graffiti', slug: 'graffiti', categoria: 'marmol-importado',
    imagen: '/materiales/importados/graffiti.jpg',
    descripcion: 'Un mármol de importación con trazos minerales que cruzan la tabla en gestos rápidos y superpuestos, como escritura sobre piedra. Su dibujo enérgico pide protagonismo: muros de acento, cabeceras de baño, frentes de barra. En formatos amplios, el patrón se despliega con la fuerza de un mural natural que ningún artista podría repetir.',
  },
  {
    nombre: 'Static Jade', slug: 'static-jade', categoria: 'marmol-importado',
    imagen: '/materiales/importados/static-jade.jpg',
    descripcion: 'Piedra de importación con interferencias verdosas y grises que vibran sobre el fondo claro, como estática detenida en pantalla de piedra. Su matiz jade, frío y contemporáneo, la separa de los blancos tradicionales. Funciona en baños de autor, cubiertas de tocador y muros donde se busca un blanco con acento mineral inesperado.',
  },
  {
    nombre: 'Paonazzo', slug: 'paonazzo', categoria: 'marmol-importado',
    imagen: '/materiales/importados/paonazzo.jpg',
    descripcion: 'De la gran tradición italiana, el Paonazzo combina un fondo marfil con vetas violáceas y doradas que se ramifican con dramatismo controlado. Es un mármol de historia, presente en la arquitectura clásica europea. Hoy corona cubiertas de baño, chimeneas y piezas de mobiliario que buscan la elegancia italiana en su registro más ornamental.',
  },
  {
    nombre: 'Imperial White', slug: 'imperial-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/imperial-white.jpg',
    descripcion: 'Blanco imperial de veta abierta: fondo níveo atravesado por corrientes grises y doradas de amplitud generosa. Su dibujo, más caudaloso que el de los blancos discretos, llena espacios grandes sin perder finura. Se especifica para muros de vestíbulo, baños principales y cubiertas de isla donde el blanco debe tener autoridad.',
  },
  {
    nombre: 'Arabescato Blue', slug: 'arabescato-blue', categoria: 'marmol-importado',
    imagen: '/materiales/importados/arabescato-blue.jpg',
    descripcion: 'Variación azulada de la familia arabescato: fondo claro con redes de veta gris azulada que forman los característicos medallones entrelazados. El matiz frío le da un aire contemporáneo y sereno. En lambrines de baño, cubiertas y book-match de muros, su patrón simétrico despliega la geometría natural que hizo célebres a los arabescatos.',
  },
  {
    nombre: 'Star Galaxy Avejentado', slug: 'star-galaxy-avejentado', categoria: 'marmol-importado',
    imagen: '/materiales/importados/star-galaxy-avejentado.jpg',
    descripcion: 'La piedra negra india del efecto estelar, aquí en acabado avejentado: la superficie mate suaviza los destellos dorados y los vuelve brasas en lugar de estrellas. El tacto sedoso del acabado invita a tocar. Ideal para pisos interiores, cubiertas de uso diario y muros donde el negro debe ser cálido, táctil y sin reflejos.',
  },
  {
    nombre: 'Arabescato Corchia', slug: 'arabescato-corchia', categoria: 'marmol-importado',
    imagen: '/materiales/importados/arabescato-corchia.jpg',
    descripcion: 'De los Alpes Apuanos, en Italia, el Arabescato Corchia es uno de los grandes mármoles ornamentales: medallones blancos rodeados de vetas gris profundo en composiciones que parecen diseñadas. Cada tabla es candidata a book-match. Se reserva para muros protagonistas, baños de mármol completo y cubiertas donde la piedra es el argumento del espacio.',
  },
  {
    nombre: 'Bianco Panno', slug: 'bianco-panno', categoria: 'marmol-importado',
    imagen: '/materiales/importados/bianco-panno.jpg',
    descripcion: 'Un blanco de importación suave como su nombre: paño de piedra con nubes grises apenas insinuadas sobre fondo cálido. Es el mármol para quien busca serenidad absoluta, sin dibujos que compitan con el mobiliario. En pisos, muros de baño y cubiertas crea superficies continuas de calma luminosa que amplifican la luz natural.',
  },
  {
    nombre: 'Grey Light', slug: 'grey-light', categoria: 'marmol-importado',
    imagen: '/materiales/importados/grey-light.jpg',
    descripcion: 'Gris claro de importación con veta fina y movimiento discreto, pensado para acompañar más que para protagonizar. Su neutralidad luminosa lo convierte en fondo perfecto de maderas, textiles y metales. Arquitectos lo usan en pisos corridos, muros de baño y cubiertas secundarias donde se necesita piedra real con voz baja.',
  },
  {
    nombre: 'Blue Stalion', slug: 'blue-stalion', categoria: 'marmol-importado',
    imagen: '/materiales/importados/blue-stalion.jpg',
    descripcion: 'Piedra de importación con corrientes azul grisáceas que cruzan el fondo claro en diagonales de energía contenida. El matiz azul, raro en mármol, le da un temperamento fresco y señorial a la vez. En muros de acento, cubiertas de tocador y chimeneas aporta un color que no existe en la paleta nacional.',
  },
  {
    nombre: 'Tiger White', slug: 'tiger-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/tiger-white.jpg',
    descripcion: 'Blanco rayado de importación: bandas grises onduladas recorren el fondo claro con el ritmo de un pelaje mineral. Su dibujo direccional ordena los espacios y pide instalación cuidadosa, con la veta corriendo en un solo sentido. Espléndido en muros de regadera, frentes de vanidad y cubiertas donde el movimiento es bienvenido.',
  },
  {
    nombre: 'Bulgary', slug: 'bulgary', categoria: 'marmol-importado',
    imagen: '/materiales/importados/bulgary.jpg',
    descripcion: 'Mármol de importación de porte joyero, como sugiere su nombre: fondo claro con vetas finas en oro viejo y gris que se entrelazan con delicadeza. Es piedra de detalles: tocadores, cubiertas de baño de visitas, nichos y mesas auxiliares donde se aprecia de cerca. Su elegancia está en la miniatura, no en el gesto grande.',
  },
  {
    nombre: 'Imperial Coffee', slug: 'imperial-coffee', categoria: 'marmol-importado',
    imagen: '/materiales/importados/imperial-coffee.jpg',
    descripcion: 'Café profundo con vetas cremosas que atraviesan la tabla como leche vertida en espresso. Es un mármol de calidez envolvente, ideal para interiores que buscan gravedad sin recurrir al negro. En lambrines, chimeneas, barras y mobiliario de comedor crea atmósferas de club clásico, perfectas para el latón y la madera oscura.',
  },
  {
    nombre: 'Cloudy Grey', slug: 'cloudy-grey', categoria: 'marmol-importado',
    imagen: '/materiales/importados/cloudy-grey.jpg',
    descripcion: 'Un gris nublado de importación: masas de vapor mineral que se desplazan por la tabla sin líneas duras ni contrastes bruscos. Es el mármol del cielo antes de la lluvia, sereno y envolvente. Se emplea en baños completos, pisos interiores y muros donde se busca atmósfera continua más que dibujo protagonista.',
  },
  {
    nombre: 'Blanco Spider', slug: 'blanco-spider', categoria: 'marmol-importado',
    imagen: '/materiales/importados/blanco-spider.jpg',
    descripcion: 'Blanco de importación con una red fina de vetas grises que se extiende por la superficie como telaraña iluminada. El patrón, delicado pero omnipresente, da textura visual sin oscurecer el fondo. Funciona en pisos, muros de baño y cubiertas donde se quiere un blanco con incidente, más interesante que un liso absoluto.',
  },
  {
    nombre: 'Mediterranean Sea', slug: 'mediterranean-sea', categoria: 'marmol-importado',
    imagen: '/materiales/importados/mediterranean-sea.jpg',
    descripcion: 'Corrientes gris azuladas sobre fondo claro que ondulan como agua profunda vista desde un acantilado. Es un mármol de movimiento amplio y romántico, que pide formatos grandes para desplegar su oleaje. En muros de regadera, book-match de recámaras y cubiertas de isla lleva el Mediterráneo al interior, sin literalidad.',
  },
  {
    nombre: 'Calacatta Supreme', slug: 'calacatta-supreme', categoria: 'marmol-importado',
    imagen: '/materiales/importados/calacatta-supreme.jpg',
    descripcion: 'En la tradición de los grandes calacattas italianos: fondo blanco luminoso y vetas anchas en gris y oro que cruzan la tabla con gesto seguro. Es el mármol aspiracional por excelencia, protagonista de cocinas de autor y baños principales. Cada lámina se elige como una obra: la veta decide dónde va la isla, no al revés.',
  },
  {
    nombre: 'Barbarian Grey', slug: 'barbarian-grey', categoria: 'marmol-importado',
    imagen: '/materiales/importados/barbarian-grey.jpg',
    descripcion: 'Gris de importación con vetas diagonales blancas y grafito que barren la tabla en ráfagas paralelas, enérgicas y consistentes. Su dibujo direccional, casi de brochazo, da dinamismo a superficies grandes. Excelente para muros de acento, frentes de chimenea y pisos donde el gris debe tener movimiento y no solo tono.',
  },
  {
    nombre: 'Sparta', slug: 'sparta', categoria: 'marmol-importado',
    imagen: '/materiales/importados/sparta.jpg',
    descripcion: 'Mármol de importación de carácter austero y noble, como su nombre promete: fondo claro con vetas sobrias que estructuran la superficie sin ornamentarla. Es piedra de líneas más que de nubes, disciplinada y arquitectónica. En pisos, escaleras y muros de vestíbulo aporta una elegancia contenida que envejece sin pasar de moda.',
  },
  {
    nombre: 'Electro White', slug: 'electro-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/electro-white.jpg',
    descripcion: 'Blanco eléctrico: vetas delgadas y quebradas que recorren el fondo claro como descargas detenidas. Su energía gráfica lo distingue de los blancos serenos; es piedra con pulso. Ideal para frentes de barra, muros de baño y cubiertas donde se busca un blanco contemporáneo, nervioso, que dialogue con interiores minimalistas.',
  },
  {
    nombre: 'Gattara Jade', slug: 'gattara-jade', categoria: 'marmol-importado',
    imagen: '/materiales/importados/gattara-jade.jpg',
    descripcion: 'Piedra de importación con matices jade y humo que se difuminan sobre fondo claro, en transiciones suaves más pictóricas que lineales. Su verdor apenas insinuado la vuelve rara y deseable. En cubiertas de tocador, nichos y muros de acento aporta un acento oriental discreto, precioso bajo luz cálida.',
  },
  {
    nombre: 'Bianco Panno', slug: 'bianco-panno-2', categoria: 'marmol-importado',
    imagen: '/materiales/importados/bianco-panno-2.jpg',
    descripcion: 'Segunda selección del Bianco Panno, con el mismo espíritu de calma: fondo blanco cálido y nubes grises de transición suave, aquí con un velo ligeramente más presente. Ideal cuando el proyecto pide continuidad con carácter propio en cada tabla. Pisos, muros de baño y cubiertas se benefician de su serenidad luminosa.',
  },
  {
    nombre: 'Black Wave', slug: 'black-wave', categoria: 'marmol-importado',
    imagen: '/materiales/importados/black-wave.jpg',
    descripcion: 'Negro de importación surcado por ondas claras que atraviesan la tabla como olas nocturnas bajo luna llena. Su movimiento fluido lo separa de los negros estáticos: aquí la piedra parece avanzar. En barras, muros de acento y cubiertas dramáticas despliega un dinamismo que convierte cada lámina en marea detenida.',
  },
  {
    nombre: 'Portoro Silver', slug: 'portoro-silver', categoria: 'marmol-importado',
    imagen: '/materiales/importados/portoro-silver.jpg',
    descripcion: 'En el espíritu del portoro clásico, esta versión plateada enlaza cadenas de veta clara sobre fondo negro profundo, con reflejos de plata vieja en lugar del oro tradicional. Es un mármol de noche y de gala. Chimeneas, tocadores y mesas de centro lo convierten en la pieza que ancla todo el espacio.',
  },
  {
    nombre: 'Bianco Magari', slug: 'bianco-magari', categoria: 'marmol-importado',
    imagen: '/materiales/importados/bianco-magari.jpg',
    descripcion: 'Blanco de importación con vetas grises dispersas y un fondo levemente marfil que le quita frialdad al conjunto. Es un blanco amable, de convivencia fácil, que no exige protagonismo ni lo rehúye. En baños, cocinas y pisos interiores entrega la elegancia del mármol claro sin el dramatismo de los calacattas.',
  },
  {
    nombre: 'Royal Green', slug: 'royal-green', categoria: 'marmol-importado',
    imagen: '/materiales/importados/royal-green.jpg',
    descripcion: 'Verde de importación con ríos oscuros que serpentean sobre un fondo gris verdoso de movimiento horizontal. Es la respuesta contemporánea a la nostalgia por los verdes clásicos: menos saturado, más mineral. En cubiertas de baño, mesas y muros de acento aporta el color más codiciado del mármol actual, con porte sereno.',
  },
  {
    nombre: 'Statuario', slug: 'statuario', categoria: 'marmol-importado',
    imagen: '/materiales/importados/statuario.jpg',
    descripcion: 'El mármol de las estatuas: blanco puro de Carrara con vetas grises audaces, el mismo linaje que trabajaron los grandes escultores. Su luminosidad interior es inconfundible; ninguna piedra refleja la luz de esa manera. Se reserva para los gestos mayores del proyecto: el muro del vestíbulo, el baño principal, la pieza de mobiliario irrepetible.',
  },
  {
    nombre: 'ThunderWhite', slug: 'thunderwhite', categoria: 'marmol-importado',
    imagen: '/materiales/importados/thunderwhite.jpg',
    descripcion: 'Blanco tormenta: descargas de veta gris que cruzan el fondo claro con energía eléctrica, más densas que en los blancos tranquilos. El resultado es un mármol expresivo que llena la superficie de acontecimientos. Funciona en muros protagonistas, frentes de vanidad y cubiertas donde el blanco necesita drama sin volverse oscuro.',
  },
  {
    nombre: 'Forest Gray', slug: 'forest-gray', categoria: 'marmol-importado',
    imagen: '/materiales/importados/forest-gray.jpg',
    descripcion: 'Gris bosque: fondo profundo con vetas claras que se ramifican como niebla entre troncos. Es un gris con narrativa orgánica, menos urbano que sus pares. En lambrines, pisos y muros de baño crea atmósferas envolventes que combinan de manera natural con madera, lino y vegetación interior.',
  },
  {
    nombre: 'Augusta Grey', slug: 'augusta-grey', categoria: 'marmol-importado',
    imagen: '/materiales/importados/augusta-grey.jpg',
    descripcion: 'Un gris augusto, de porte institucional: veta ordenada, contraste medido y presencia que impone sin gritar. Es la piedra de los despachos serios y los vestíbulos que quieren transmitir permanencia. En pisos de gran formato, escaleras y muros corporativos entrega solidez visual con la nobleza del mármol verdadero.',
  },
  {
    nombre: 'Yougoslavian White', slug: 'yougoslavian-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/yougoslavian-white.jpg',
    descripcion: 'Blanco balcánico de tradición europea: fondo claro y homogéneo con veta discreta, apreciado durante décadas por su comportamiento noble en obra. Es un mármol de fondo, confiable y luminoso, que deja hablar a la arquitectura. Pisos continuos, muros de baño y recubrimientos completos son su territorio natural.',
  },
  {
    nombre: 'Chavalier Brown', slug: 'chavalier-brown', categoria: 'marmol-importado',
    imagen: '/materiales/importados/chavalier-brown.jpg',
    descripcion: 'Marrón caballeresco de importación: fondo castaño con matices que van del cuero al chocolate, atravesado por vetas suaves. Es un mármol masculino y cálido, de biblioteca y whisky. En muros de estudio, chimeneas y cubiertas de bar envuelve el espacio con una gravedad acogedora difícil de lograr con otros materiales.',
  },
  {
    nombre: 'Lilac', slug: 'lilac', categoria: 'marmol-importado',
    imagen: '/materiales/importados/lilac.jpg',
    descripcion: 'Uno de los mármoles más singulares del catálogo: fondo claro con vetas lilas y violáceas que tejen un dibujo delicado, casi floral. El matiz lavanda, rarísimo en piedra natural, lo convierte en pieza de colección. Se luce en tocadores, baños de visitas y detalles de mobiliario donde su color puede admirarse de cerca.',
  },
  {
    nombre: 'Blue Vein Serpentino', slug: 'blue-vein-serpentino', categoria: 'marmol-importado',
    imagen: '/materiales/importados/blue-vein-serpentino.jpg',
    descripcion: 'Vetas azules serpenteantes sobre fondo claro: corrientes minerales que zigzaguean por la tabla con vida propia. El azul, infrecuente y codiciado en piedra natural, define todo el carácter del material. En muros de acento, frentes de vanidad y piezas book-match crea composiciones de un dinamismo casi cartográfico.',
  },
  {
    nombre: 'Romantic Grey', slug: 'romantic-grey', categoria: 'marmol-importado',
    imagen: '/materiales/importados/romantic-grey.jpg',
    descripcion: 'Gris romántico: nubes suaves, transiciones lentas y una veta que sugiere más de lo que afirma. Es el gris para interiores que buscan intimidad —recámaras, baños principales, salas de estar— donde la piedra debe acompañar la luz tenue. Su temperamento evocador lo distingue de los grises técnicos y fríos.',
  },
  {
    nombre: 'Cloud Sea White', slug: 'cloud-sea-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/cloud-sea-white.jpg',
    descripcion: 'Mar de nubes: blanco con masas grises que flotan por la superficie en capas superpuestas, como cielo visto desde arriba. Su profundidad atmosférica da a los muros una tercera dimensión. Ideal para regaderas de mármol completo, cabeceras de baño y cubiertas donde el blanco debe tener paisaje interior.',
  },
  {
    nombre: 'Latzza Grey', slug: 'latzza-grey', categoria: 'marmol-importado',
    imagen: '/materiales/importados/latzza-grey.jpg',
    descripcion: 'Gris de importación con veta compacta y textura pareja, pensado para superficies continuas de gran formato. Su uniformidad controlada es su virtud: permite unir tablas sin saltos visuales. Arquitectos lo especifican para pisos corridos, escaleras completas y muros donde la piedra debe leerse como un solo plano.',
  },
  {
    nombre: 'Statuario Jade', slug: 'statuario-jade', categoria: 'marmol-importado',
    imagen: '/materiales/importados/statuario-jade.jpg',
    descripcion: 'La silueta del statuario con un matiz inesperado: vetas grises con reflejos jade sobre fondo blanco luminoso. Ese acento verde suave le da contemporaneidad a un dibujo clásico. En baños principales, cubiertas y muros book-match combina el prestigio del blanco veteado con un color propio que lo distingue de sus pares.',
  },
  {
    nombre: 'Titanium Blue', slug: 'titanium-blue', categoria: 'marmol-importado',
    imagen: '/materiales/importados/titanium-blue.jpg',
    descripcion: 'Piedra de importación de dramatismo metálico: oleajes gris titanio y azul acero que se pliegan sobre sí mismos con blancos incandescentes. Cada tabla parece metal fundido detenido en frío. Es material de gesto único —un muro, una barra, una chimenea— donde su energía puede desplegarse sin competencia.',
  },
  {
    nombre: 'Kavala White', slug: 'kavala-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/kavala-white.jpg',
    descripcion: 'De la región griega de Kavala, un blanco semiclásico con vetas grises finas y paralelas, heredero de la tradición marmolera del Egeo. Es piedra mediterránea en estado puro: luminosa, ordenada, serena. En pisos, muros de baño y fachadas interiores aporta esa claridad griega que ha definido la arquitectura desde la antigüedad.',
  },
  {
    nombre: 'Calacatta Gold', slug: 'calacatta-gold', categoria: 'marmol-importado',
    imagen: '/materiales/importados/calacatta-gold.jpg',
    descripcion: 'El más codiciado de los blancos: fondo luminoso con vetas anchas donde el gris se entrelaza con oro viejo, en la gran tradición de los calacattas italianos. Es sinónimo de lujo en cocinas y baños de autor. Cada tabla se selecciona individualmente; la veta dorada decide la composición del espacio entero.',
  },
  {
    nombre: 'Royal White', slug: 'royal-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/royal-white.jpg',
    descripcion: 'Blanco real: fondo claro de porte solemne con vetas grises que estructuran la tabla en composiciones equilibradas. Ni dramático ni tímido, ocupa el centro justo de los blancos veteados. Es una elección segura y elegante para baños principales, pisos de vestíbulo y cubiertas que deben verse impecables por décadas.',
  },
  {
    nombre: 'Travertine Rosso', slug: 'travertine-rosso', categoria: 'marmol-importado',
    imagen: '/materiales/importados/travertine-rosso.jpg',
    descripcion: 'De la tradición de los travertinos persas, el Rosso despliega bandas encendidas en rojo, naranja y ámbar: fuego sedimentado capa por capa. Es el travertino más audaz del catálogo, piedra de temperamento. En muros de acento, frentes de recepción y detalles de mobiliario convierte el color en argumento arquitectónico.',
  },
  {
    nombre: 'Volakas White', slug: 'volakas-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/volakas-white.jpg',
    descripcion: 'El gran blanco griego: fondo níveo con vetas grises y ocasionales hilos violáceos, extraído en la región de Drama. Su equilibrio entre pureza y dibujo lo hizo favorito de la hotelería internacional. En baños completos, pisos y muros book-match entrega elegancia mediterránea con disponibilidad de gran formato.',
  },
  {
    nombre: 'Hermes Gray', slug: 'hermes-gray', categoria: 'marmol-importado',
    imagen: '/materiales/importados/hermes-gray.jpg',
    descripcion: 'Gris de importación con veta fluida y matices cálidos que evitan la frialdad habitual de su familia. Hay algo de gamuza en su superficie: un gris que se toca con la mirada. En muros de recámara, baños y cubiertas de tocador crea fondos sofisticados para interiores de lujo silencioso.',
  },
  {
    nombre: 'Victory White', slug: 'victory-white', categoria: 'marmol-importado',
    imagen: '/materiales/importados/victory-white.jpg',
    descripcion: 'Blanco victoria: fondo claro y veta gris de trazo firme, un mármol que celebra la luz sin excesos ornamentales. Su dibujo abierto y optimista funciona en espacios contemporáneos que buscan piedra clásica sin solemnidad. Pisos, muros de baño y cubiertas de cocina son su terreno; el gran formato, su mejor versión.',
  },
]

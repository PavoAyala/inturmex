import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getRequestListener } from '@hono/node-server'
import { onRequest } from 'firebase-functions/v2/https'

const app = new Hono()
app.use('/*', cors())

// Mock data based on the new schema
const mockDestinos = [
  { id: 'peru', nombre: 'Perú', slug: 'peru', imagenUrl: 'https://inturmex.com/images/peru.jpg', descripcion: 'Tierra de los Incas' },
  { id: 'europa', nombre: 'Europa', slug: 'europa', imagenUrl: 'https://inturmex.com/images/europa.jpg', descripcion: 'El viejo continente' },
  { id: 'asia', nombre: 'Asia', slug: 'asia', imagenUrl: 'https://inturmex.com/images/asia.jpg', descripcion: 'Misterios de oriente' },
];

const mockCircuitos = [
  { 
    id: 'vive-magia-peru', 
    nombre: 'Vive la Magia del Perú', 
    destinoId: 'peru', 
    precioUsd: 1299, 
    duracionDias: 8,
    paises: 'Perú',
    ciudades: 'Lima, Cusco, Machu Picchu',
    imagenUrl: 'https://inturmex.com/images/circuitos/peru.jpg'
  }
];

app.get('/', (c) => {
  return c.text('Inturmex API v1')
})

app.get('/api/destinos', (c) => {
  return c.json(mockDestinos)
})

app.get('/api/circuitos', (c) => {
  const destinoId = c.req.query('destinoId')
  if (destinoId) {
    return c.json(mockCircuitos.filter(circ => circ.destinoId === destinoId))
  }
  return c.json(mockCircuitos)
})

app.get('/api/circuitos/:id', (c) => {
  const id = c.req.param('id')
  const circ = mockCircuitos.find(circ => circ.id === id)
  if (!circ) return c.notFound()
  
  // Dynamic detail response
  return c.json({
    ...circ,
    itinerario: [
      { dia: 1, titulo: 'Llegada a Lima', descripcion: 'Trámite a hotel' },
      { dia: 2, titulo: 'Cusco Imperial', descripcion: 'Tour por la ciudad' }
    ],
    tarifas: [
      { tipo: 'DBL', precioUsd: 1299 },
      { tipo: 'SGL', precioUsd: 1699 }
    ],
    incluye: [
      { tipo: 'incluye', descripcion: 'Desayunos diarios' },
      { tipo: 'incluye', descripcion: 'Traslados aeropuerto-hotel' }
    ],
    hoteles: [
      { nombre: 'Hotel Peru Plaza', ciudad: 'Lima', tipo: 'Primera' }
    ]
  })
})

export const api = onRequest(getRequestListener(app.fetch))
export default app

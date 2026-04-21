import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getRequestListener } from '@hono/node-server'
import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'
import { getDataConnect } from 'firebase-admin/data-connect'

process.env.DATA_CONNECT_EMULATOR_HOST = '127.0.0.1:9399';

const firebaseApp = initializeApp({ 
  projectId: 'inturmex-c511a',
  credential: {
    getAccessToken: () => Promise.resolve({
      access_token: 'dummy-token',
      expires_in: 3600
    })
  }
});
const dc = getDataConnect({
  serviceId: 'inturmex-c511a-service',
  location: 'us-east4'
});

const app = new Hono()
app.use('/*', cors())

app.get('/', (c) => {
  return c.text('Inturmex API v1 - Connected via Admin SDK')
})

// Queries definitions (mapped from your .gql files)
const GetDestinosQuery = `
  query GetDestinos {
    destinos(where: { activo: { eq: true } }, orderBy: [{ orden: ASC }]) {
      id nombre slug imagenUrl descripcion
    }
  }
`;

const GetCircuitosQuery = `
  query GetCircuitos($destinoId: String) {
    circuitos(where: { 
      activo: { eq: true },
      destino: { id: { eq: $destinoId } }
    }) {
      id nombre paises ciudades duracionDias precioUsd impuestosUsd imagenUrl destacado
    }
  }
`;

const GetCircuitoDetailQuery = `
  query GetCircuitoDetail($id: UUID!) {
    circuito(id: $id) {
      id nombre paises ciudades duracionDias precioUsd impuestosUsd tipoHabitacion imagenUrl descripcion
      itinerarios_on_circuito { dia titulo descripcion }
      hotels_on_circuito { nombre ciudad tipo }
      tarifas_on_circuito { tipo precioUsd }
    }
  }
`;

// Get Real Destinations
app.get('/api/destinos', async (c) => {
  try {
    const result = await dc.executeGraphql(GetDestinosQuery);
    return c.json((result.data as any).destinos);
  } catch (err) {
    console.error('Error in /api/destinos:', err);
    return c.json({ error: 'Failed to fetch destinations' }, 500);
  }
})

// Get Real Circuits
app.get('/api/circuitos', async (c) => {
  try {
    const destinoId = c.req.query('destinoId');
    const result = await dc.executeGraphql(GetCircuitosQuery, { variables: { destinoId } });
    return c.json((result.data as any).circuitos);
  } catch (err) {
    console.error('Error in /api/circuitos:', err);
    return c.json({ error: 'Failed to fetch circuits' }, 500);
  }
})

// Get Real Circuit Detail
app.get('/api/circuitos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await dc.executeGraphql(GetCircuitoDetailQuery, { variables: { id } });
    const circ = (result.data as any).circuito;
    
    if (!circ) return c.notFound();

    return c.json({
      ...circ,
      itinerario: circ.itinerarios_on_circuito || [],
      tarifas: circ.tarifas_on_circuito || [],
      hoteles: circ.hotels_on_circuito || []
    });
  } catch (err) {
    console.error('Error in /api/circuitos/:id:', err);
    return c.json({ error: 'Failed to fetch circuit detail' }, 500);
  }
})

export const api = onRequest(getRequestListener(app.fetch))
export default app

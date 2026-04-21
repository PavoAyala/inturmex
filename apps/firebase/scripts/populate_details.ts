import { execSync } from 'child_process';

const circuitsDetails = {
  "El Triángulo Centroamericano.": {
    "itinerary": [
      { "day": 1, "title": "MÉXICO – GUATEMALA", "description": "Llegada al Aeropuerto Internacional La Aurora, recepción y traslado hacia el hotel." },
      { "day": 2, "title": "GUATEMALA - Visita de Ciudad – COPÁN (HONDURAS)", "description": "Recorrido panorámico por la ciudad de Guatemala y viaje a Copán." },
      { "day": 3, "title": "COPÁN – SAN SALVADOR", "description": "Visita al Sitio Arqueológico de Copán y partida hacia San Salvador." },
      { "day": 4, "title": "SAN SALVADOR - El Boquerón", "description": "Visita al Parque Nacional El Boquerón y recorrido por el centro histórico." },
      { "day": 5, "title": "SAN SALVADOR – SANTA ANA – ANTIGUA", "description": "Visita al Lago de Coatepeque y traslado a Antigua." },
      { "day": 6, "title": "ANTIGUA DE GUATEMALA – PANAJACHEL", "description": "Navegación por el Lago de Atitlán visitando poblados indígenas." },
      { "day": 7, "title": "ANTIGUA DE GUATEMALA - Visita de Ciudad", "description": "Exploración de la Iglesia de La Merced y la Catedral." },
      { "day": 8, "title": "ANTIGUA DE GUATEMALA – MÉXICO", "description": "Traslado al Aeropuerto de La Aurora para el vuelo de regreso." }
    ],
    "hotels": [
      { "name": "Hotel Biltmore", "city": "Guatemala", "type": "4 Estrellas" },
      { "name": "Hotel Camino Maya", "city": "Copán", "type": "4 Estrellas" },
      { "name": "Beverly Hills", "city": "San Salvador", "type": "3 Estrellas" },
      { "name": "Ciel - Luxe", "city": "Antigua", "type": "4 Estrellas" }
    ],
    "rates": [
      { "type": "Doble", "priceUsd": 799.0 },
      { "type": "Triple", "priceUsd": 759.0 },
      { "type": "Sencilla", "priceUsd": 1189.0 }
    ]
  },
  "Vive la Magia del Perú.": {
    "itinerary": [
      { "day": 1, "title": "MÉXICO – LIMA", "description": "Llegada y traslado al hotel." },
      { "day": 9, "title": "LIMA – MÉXICO", "description": "Traslado al aeropuerto para el vuelo de regreso." }
    ],
    "hotels": [
      { "name": "Hotel Jose Antonio", "city": "Lima", "type": "4 Estrellas" }
    ],
    "rates": [
      { "type": "Doble", "priceUsd": 999.0 }
    ]
  },
  "Estrellas de Europa.": {
    "itinerary": [
      { "day": 1, "title": "MÉXICO – MADRID", "description": "Vuelo con destino a Madrid." },
      { "day": 22, "title": "MADRID – MÉXICO", "description": "Traslado al aeropuerto para el vuelo de regreso." }
    ],
    "hotels": [
      { "name": "Hotel Zentral Castellana Norte", "city": "Madrid", "type": "Primera" }
    ],
    "rates": [
      { "type": "Doble", "priceUsd": 2699.0 }
    ]
  }
};

function runMutation(name: string, vars: any) {
  const jsonVars = JSON.stringify(vars);
  try {
    const cmd = `firebase dataconnect:execute "${name}" --variables '${jsonVars}'`;
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Error in ${name}:`, e.message);
  }
}

async function main() {
  // Get existing circuits to find UUIDs
  const output = execSync('firebase dataconnect:execute "GetCircuitos"', { encoding: 'utf-8' });
  const data = JSON.parse(output);
  const circuitos = data.data.circuitos;

  for (const c of circuitos) {
    const detail = circuitsDetails[c.nombre as keyof typeof circuitsDetails];
    if (detail) {
      console.log(`Populating details for ${c.nombre} (${c.id})...`);
      
      // Itineraries
      for (const it of detail.itinerary) {
        runMutation('CreateItinerario', {
          circuitoId: c.id,
          dia: it.day,
          titulo: it.title,
          descripcion: it.description
        });
      }

      // Hotels
      for (const h of detail.hotels) {
        runMutation('CreateHotel', {
          circuitoId: c.id,
          nombre: h.name,
          ciudad: h.city,
          tipo: h.type
        });
      }

      // Rates
      for (const r of detail.rates) {
        runMutation('CreateTarifa', {
          circuitoId: c.id,
          tipo: r.type,
          precioUsd: r.priceUsd
        });
      }
    }
  }
}

main();

import { execSync } from 'child_process';

const destinos = [
  { id: 'peru', nombre: 'Perú', slug: 'peru', activo: true, descripcion: 'La tierra de los Incas' },
  { id: 'centroamerica', nombre: 'Centroamérica', slug: 'centroamerica', activo: true, descripcion: 'Cultura y naturaleza' },
  { id: 'europa', nombre: 'Europa', slug: 'europa', activo: true, descripcion: 'Historia y arte' },
  { id: 'colombia', nombre: 'Colombia', slug: 'colombia', activo: true, descripcion: 'Sabor y color' },
  { id: 'asia', nombre: 'Asia', slug: 'asia', activo: true, descripcion: 'Milenaria y moderna' },
  { id: 'sudamerica', nombre: 'Sudamérica', slug: 'sudamerica', activo: true, descripcion: 'Aventura al fin del mundo' },
  { id: 'balcanes', nombre: 'Balcanes', slug: 'balcanes', activo: true, descripcion: 'Europa del Este' }
];

// Simplified circuits for seeding
const batch1 = [
  { id: '52103', name: 'Vive la Magia del Perú.', destino: 'peru', duracion: 9, precio: 999, impuestos: 499, description: 'Viaje inolvidable por el corazón del imperio Inca.' },
  { id: '50500', name: 'El Triángulo Centroamericano.', destino: 'centroamerica', duracion: 8, precio: 799, impuestos: 299, description: 'Descubre la riqueza cultural de Centroamérica.' },
  { id: '16100', name: 'Estrellas de Europa.', destino: 'europa', duracion: 22, precio: 2699, impuestos: 799, description: 'Tour completo por las capitales europeas.' },
  { id: '16200', name: 'Bellezas de Europa.', destino: 'europa', duracion: 19, precio: 2399, impuestos: 799, description: 'Recorrido escénico por Europa Central.' },
  { id: '52179', name: 'Con Sabor a Colombia.', destino: 'colombia', duracion: 8, precio: 899, impuestos: 399, description: 'Disfruta de Medellín y Cartagena.' },
  { id: '30208', name: 'Japón, El Camino del Samurái.', destino: 'asia', duracion: 12, precio: 1999, impuestos: 999, description: 'Inmersión en la cultura japonesa.' },
  { id: '52555', name: 'Viaje al Fin del Mundo.', destino: 'sudamerica', duracion: 14, precio: 1999, impuestos: 799, description: 'Aventura en la Patagonia y Ushuaia.' },
  { id: '12494', name: 'Mega Balcanes.', destino: 'balcanes', duracion: 15, precio: 999, impuestos: 999, description: 'Secretos de Europa del Este.' },
  { id: '30232', name: 'Tailandia: Naturaleza y Cultura.', destino: 'asia', duracion: 17, precio: 1599, impuestos: 999, description: 'Lo mejor del Reino de Siam.' },
  { id: '12117', name: 'Viviendo Europa.', destino: 'europa', duracion: 17, precio: 1699, impuestos: 799, description: 'Viaje esencial por el occidente europeo.' }
];

function runMutation(name: string, vars: any) {
  const jsonVars = JSON.stringify(vars);
  console.log(`Executing operation ${name}...`);
  try {
    const cmd = `firebase dataconnect:execute "${name}" --variables '${jsonVars}'`;
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Error in ${name}:`, e.message);
  }
}

async function main() {
  // 1. Destinos
  for (const d of destinos) {
    runMutation('CreateDestino', { 
      id: d.id, 
      nombre: d.nombre, 
      slug: d.slug, 
      activo: d.activo, 
      descripcion: d.descripcion,
      orden: 0
    });
  }

  // 2. Circuitos
  for (const c of batch1) {
    runMutation('CreateCircuito', {
      nombre: c.name,
      destinoId: c.destino,
      duracionDias: c.duracion,
      precioUsd: c.precio,
      impuestosUsd: c.impuestos,
      activo: true,
      destacado: true,
      descripcion: c.description
    });
  }

  console.log('Seed finished.');
}

main();

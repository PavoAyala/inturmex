import { execSync } from 'child_process';

/**
 * Script de ayuda para actualizar imágenes
 * Instrucciones:
 * 1. Modifica la lista 'updates' con el ID del circuito y la nueva URL.
 * 2. Ejecuta: npx -y tsx apps/firebase/scripts/update_images.ts
 */

const updates = [
  {
    id: "f83464d1069643f48933db27b472e967",
    imagenUrl: "https://one.cdnmega.com/images/viajes/covers/16300-europa-clasica-1024x575_67f5b2870900c.webp"
  }
];

function runMutation(name: string, vars: any) {
  const jsonVars = JSON.stringify(vars);
  console.log(`Actualizando ${vars.id}...`);
  try {
    const cmd = `firebase dataconnect:execute "${name}" --variables '${jsonVars}'`;
    execSync(cmd, { stdio: 'inherit' });
    console.log('✓ Actualizado');
  } catch (e) {
    console.error(`Error actualizando ${vars.id}:`, e.message);
  }
}

async function main() {
  for (const u of updates) {
    runMutation('UpdateCircuito', u);
  }
}

main();

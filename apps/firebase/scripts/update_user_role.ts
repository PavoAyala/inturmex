import { execSync } from 'child_process';

/**
 * Script de ayuda para actualizar roles de usuario
 * Instrucciones:
 * 1. Modifica la lista 'updates' con el ID del usuario (UID de Firebase) y el nuevo rol.
 * 2. Ejecuta: npx -y tsx apps/firebase/scripts/update_user_role.ts
 */

const updates = [
  {
    id: "IM1KMDPzkqTMOcU1so45OiNTnYp2", // Reemplaza con el UID del usuario
    role: "admin"
  }
];

function runMutation(name: string, vars: any) {
  const jsonVars = JSON.stringify(vars);
  console.log(`Actualizando rol de ${vars.id} a "${vars.role}"...`);
  try {
    // Para upsert, necesitamos enviar todos los campos obligatorios si es un registro nuevo,
    // pero si ya existe, Data Connect actualizará solo lo enviado en algunos casos.
    // Usamos UpsertUser que definimos previamente.
    const cmd = `firebase dataconnect:execute "${name}" --variables '${jsonVars}'`;
    execSync(cmd, { stdio: 'inherit' });
    console.log('✓ Rol actualizado correctamente');
  } catch (e: any) {
    console.error(`Error actualizando ${vars.id}:`, e.message);
  }
}

async function main() {
  for (const u of updates) {
    runMutation('UpdateUserRole', u);
  }
}

main();

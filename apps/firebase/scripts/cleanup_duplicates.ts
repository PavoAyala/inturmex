import { execSync } from 'child_process';

const ID_L = "lM1KMDPzkqTMOcU1so45OiNTnYp2";
const ID_I = "IM1KMDPzkqTMOcU1so45OiNTnYp2";

function runMutation(name: string, vars: any) {
  const jsonVars = JSON.stringify(vars);
  console.log(`Ejecutando ${name} para ID: ${vars.id}...`);
  try {
    const cmd = `firebase dataconnect:execute "${name}" --variables '${jsonVars}'`;
    execSync(cmd, { stdio: 'inherit' });
    console.log(`✓ ${name} completado`);
  } catch (e: any) {
    console.error(`Error en ${name}:`, e.message);
  }
}

async function main() {
  console.log("--- INICIANDO LIMPIEZA DEFINITIVA ---");
  
  // 1. Borramos ambos rastro (ambas versiones del ID)
  // Al borrar por ID, si hay duplicados con el mismo ID exacto, Data Connect debería limpiarlos.
  console.log("Paso 1: Borrando todas las variaciones de ID...");
  runMutation('DeleteUser', { id: ID_L });
  runMutation('DeleteUser', { id: ID_I });

  // 2. Esperamos un poco para asegurar que la DB procese
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 3. Re-insertamos UNA SOLA VEZ con el ID que usa Firebase Auth (el de 'I' mayúscula)
  console.log("\nPaso 2: Re-insertando el perfil de administrador único...");
  runMutation('UpsertUser', {
    id: ID_I,
    displayName: "itsMarlon",
    email: "mdanielcarvallo@gmail.com",
    photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocL6Ws_B6wvLIDd2sqkwLKpbslhCuOj1m2g61SolBbK6WShFl87B=s96-c",
    role: "admin"
  });

  console.log("\n--- LIMPIEZA COMPLETADA ---");
}

main();

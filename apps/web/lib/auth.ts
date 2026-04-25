import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  User as FirebaseUser,
  updateProfile
} from "firebase/auth";
import { auth, dataconnect } from "./firebase";
import { upsertUser, getUserById } from "../src/dataconnect-generated";

const googleProvider = new GoogleAuthProvider();

export const syncUserToDataConnect = async (user: FirebaseUser) => {
  try {
    // 1. Check if user already exists to preserve their role
    const { data } = await getUserById(dataconnect, { id: user.uid });
    const existingRole = data.user?.role;

    // 2. Upsert user but keep existing role if it exists
    await upsertUser(dataconnect, {
      id: user.uid,
      displayName: user.displayName || user.email?.split('@')[0] || "Usuario",
      email: user.email,
      photoUrl: user.photoURL,
      role: existingRole || "usuario" // Preserve role if found, else default
    });
  } catch (error) {
    console.error("Error syncing user to Data Connect:", error);
  }
};

export const signInWithEmail = async (email: string, pass: string) => {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  await syncUserToDataConnect(result.user);
  return result;
};

export const signUpWithEmail = async (email: string, pass: string, name: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(result.user, { displayName: name });
  await syncUserToDataConnect({ ...result.user, displayName: name } as FirebaseUser);
  return result;
};

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  await syncUserToDataConnect(result.user);
  return result;
};

export const signOutUser = async () => {
  return await signOut(auth);
};

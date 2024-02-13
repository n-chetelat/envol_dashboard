"use server";

import { auth } from "@/libs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

auth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();

export async function signup(email: string, password: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user) return true;
  } catch (error) {
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result.user) return true;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { message: "Logged out" };
  } catch (error) {
    throw error;
  }
}

export async function forgotPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
}

export async function googleLogin() {
  try {
    await signInWithRedirect(auth, googleProvider);
    const result = await getRedirectResult(auth);
    if (result?.user) return true;
  } catch (error) {
    throw error;
  }
}

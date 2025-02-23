import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
};

export const doSignOut = async () => {
    return auth.signOut();
};
import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const userRegsistrationRef = collection(db, 'UserRegistration');
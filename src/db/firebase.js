import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAlSf2-UN4Iyf4THpJne-fxGS9oZeoFVZU",
  authDomain: "todo-c17b1.firebaseapp.com",
  projectId: "todo-c17b1",
  storageBucket: "todo-c17b1.appspot.com",
  messagingSenderId: "697582500033",
  appId: "1:697582500033:web:93c42d24836fea21433c40"
  };

  
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export default app;
export const db= getFirestore(app);
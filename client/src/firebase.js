import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAfqlx1hcok6TqcPEOFVYHUbu7B_vPdg_g",
  authDomain: "fir-52916.firebaseapp.com",
  projectId: "fir-52916",
  storageBucket: "fir-52916.appspot.com",
  messagingSenderId: "684475430140",
  appId: "1:684475430140:web:1078d0cf24e96e36f75379",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

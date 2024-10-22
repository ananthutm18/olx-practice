
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {getStorage} from "firebase/storage"

import { getAuth } from "firebase/auth";
import 'firebase/storage';








// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIZGAhgt-0BCDhFleXt5cIqrXXxhE1R-w",
  authDomain: "olx-demo-9e624.firebaseapp.com",
  projectId: "olx-demo-9e624",
  storageBucket: "olx-demo-9e624.appspot.com",
  messagingSenderId: "995525491366",
  appId: "1:995525491366:web:3c5c558e24e9aea0459267"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
export const store=firebase.firestore(app)
export const auth = getAuth();
export const storage=getStorage(app)

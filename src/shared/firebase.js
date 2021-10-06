import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const apiKey = process.env.REACT_APP_apiKey;
const firestore = firebase.firestore();

export { auth, apiKey, firestore };

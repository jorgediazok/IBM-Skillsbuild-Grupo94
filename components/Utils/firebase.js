import firebase from "firebase";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDYCF77B2cFsagdLxXKxhhJfplB_hRt23w",
    authDomain: "climaapp-50e72.firebaseapp.com",
    projectId: "climaapp-50e72",
    storageBucket: "climaapp-50e72.appspot.com",
    messagingSenderId: "1091331027738",
    appId: "1:1091331027738:web:4e4c4cae40e6050c51f2a3",
    measurementId: "G-V0P0HTRZFQ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};


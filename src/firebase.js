import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCxAaqQXBagl9GPabMflkhcFgPd6LQ7kk8",
  authDomain: "projms-c7e3a.firebaseapp.com",
  projectId: "projms-c7e3a",
  storageBucket: "projms-c7e3a.appspot.com",
  messagingSenderId: "662074058700",
  appId: "1:662074058700:web:35f67ef9078ce083c45f69",
};

firebase.initializeApp(config)

const db = firebase.firestore();

export default db;
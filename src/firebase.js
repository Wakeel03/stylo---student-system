import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAQpEgS4wQZ8f55-oe2lOg2Z3BMtAw8fcs",
    authDomain: "stylo-52869.firebaseapp.com",
    projectId: "stylo-52869",
    storageBucket: "stylo-52869.appspot.com",
    messagingSenderId: "681497559635",
    appId: "1:681497559635:web:37df8d7defc7d9cbd23ca6",
    measurementId: "G-X7W6DKTY0X"
});

const db = firebaseApp.firestore();

export default db;
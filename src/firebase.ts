import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCi5m6hYjh00Bg3aHbQ49aFFCt4En45ZpI",
    authDomain: "to-do-f4da2.firebaseapp.com",
    databaseURL: "https://to-do-f4da2.firebaseio.com",
    projectId: "to-do-f4da2",
    storageBucket: "to-do-f4da2.appspot.com",
    messagingSenderId: "459079348233",
    appId: "1:459079348233:web:09620da831b56af08488d8",
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();

export const toDosRef = databaseRef.child("toDos");

import firebase from 'firebase/app';
import config from '../config';
import "firebase/auth";
import "firebase/database";

export const firebaseService = firebase.initializeApp(config);
const databaseRef = firebase.database().ref();

export const toDosRef = databaseRef.child("toDos");

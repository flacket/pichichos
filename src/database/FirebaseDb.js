import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './config'

// Initialize Firebase
const firebaseDb = firebase.initializeApp(firebaseConfig);
export default firebaseDb.firestore();
/*
const App = firebase.initializeApp(firebaseConfig);
export const FirebaseApp = App;
export const FirebaseDb = App.firestore();
*/
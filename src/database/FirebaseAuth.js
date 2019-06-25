import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig  from './config'

// Initialize Firebase
const firebaseAuth = firebase.initializeApp(firebaseConfig);
export default firebaseAuth;
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig  from './config'

// Initialize Firebase
const firebaseAuth = firebase.initializeApp(firebaseConfig);
export default firebaseAuth.auth();
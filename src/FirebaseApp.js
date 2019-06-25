import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTcIPxC5KhHivHqECbxKNL7PRdMmkKAv0",
  authDomain: "pichichos-app.firebaseapp.com",
  databaseURL: "https://pichichos-app.firebaseio.com",
  projectId: "pichichos-app",
  storageBucket: "pichichos-app.appspot.com",
  messagingSenderId: "850217745951",
  appId: "1:850217745951:web:01d737951896412f"
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
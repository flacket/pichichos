import firebase from 'firebase/app'
import 'firebase/firestore'
//Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyASu4xCjyfCEJtyjAimsjZAR4nGQAkH8AM",
    authDomain: "fgphotos-2a70e.firebaseapp.com",
    databaseURL: "https://fgphotos-2a70e.firebaseio.com",
    projectId: "fgphotos-2a70e",
    storageBucket: "fgphotos-2a70e.appspot.com",
    messagingSenderId: "876909314387",
    appId: "1:876909314387:web:515e8b92d81310aa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  export default db;


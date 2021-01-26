import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAh3xCQ9XmXpntXrIK0z70A1DoykhkQQqc",
  authDomain: "react-app-cursos-e6a60.firebaseapp.com",
  projectId: "react-app-cursos-e6a60",
  storageBucket: "react-app-cursos-e6a60.appspot.com",
  messagingSenderId: "863711370082",
  appId: "1:863711370082:web:001821bd6f811356dfaa3b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);//servidor remoto

const db = firebase.firestore();//referencias a base de datos
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{ 
  db,
  googleAuthProvider,
  firebase
}

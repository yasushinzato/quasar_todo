// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
// import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCT3sLRb82AHb04kpjkL-Or574w9WqyCEs",
  authDomain: "awesome-todo-7b83c.firebaseapp.com",
  databaseURL: "https://awesome-todo-7b83c.firebaseio.com",
  projectId: "awesome-todo-7b83c",
  storageBucket: "awesome-todo-7b83c.appspot.com",
  messagingSenderId: "729272041436",
  appId: "1:729272041436:web:48e2d6ca7d0c418b629919"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()

export { firebaseAuth }

import * as firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyApLHcLg9HbbGHfOLrzIyl5KQBXHdcr3vQ",
    authDomain: "photoeditor-8010c.firebaseapp.com",
    projectId: "photoeditor-8010c",
    storageBucket: "photoeditor-8010c.appspot.com",
    messagingSenderId: "959244070450",
    appId: "1:959244070450:web:d5beb91db7990aded9162b"
  };
  
  // Initialize Firebase
  export const firebaseapp = firebase.initializeApp(firebaseConfig);
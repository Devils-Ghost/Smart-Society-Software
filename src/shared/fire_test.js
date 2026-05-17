import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const {
  REACT_APP_FIREBASE_TEST_API_KEY,
  REACT_APP_FIREBASE_TEST_AUTH_DOMAIN,
  REACT_APP_FIREBASE_TEST_DB_URL,
  REACT_APP_FIREBASE_TEST_PROJ_ID,
  REACT_APP_FIREBASE_TEST_STORAGE_BUCKET,
  REACT_APP_FIREBASE_TEST_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_TEST_APP_ID,
} = process.env;

var firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_TEST_API_KEY,
  authDomain: REACT_APP_FIREBASE_TEST_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_TEST_DB_URL,
  projectId: REACT_APP_FIREBASE_TEST_PROJ_ID,
  storageBucket: REACT_APP_FIREBASE_TEST_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_TEST_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_TEST_APP_ID,
};

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const dbref = firebase.database().ref();
export default firebase;

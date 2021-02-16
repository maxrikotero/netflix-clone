import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC38ctgcnFDE4CWcXjdjUNfc7ydQQXgkyw",
  authDomain: "netflix-clone-7fc1d.firebaseapp.com",
  projectId: "netflix-clone-7fc1d",
  storageBucket: "netflix-clone-7fc1d.appspot.com",
  messagingSenderId: "705050636746",
  appId: "1:705050636746:web:ea777cd322100dd6dd9f33",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;

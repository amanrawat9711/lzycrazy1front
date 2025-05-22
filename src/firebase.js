import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8jBHjWDp4RKuee1FI2RLxh5XSqMt98u4",
  authDomain: "lzycrazy-2d5f6.firebaseapp.com",
  projectId: "lzycrazy-2d5f6",
  storageBucket: "lzycrazy-2d5f6.firebasestorage.app",  
  messagingSenderId: "446034920054",
  appId: "1:446034920054:web:0386fdf01b0594f8bad557",
  measurementId: "G-F35QJ0D2JX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
const signInWithGithub = () => signInWithPopup(auth, githubProvider);

export { auth, signInWithGoogle, signInWithGithub };

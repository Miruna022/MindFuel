import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {initializeAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDpeA7Y_eOTCfVXC0IpjjimYCm_l3aK6A4",
    authDomain: "mindfuel-dd636.firebaseapp.com",
    projectId: "mindfuel-dd636",
    storageBucket: "mindfuel-dd636.firebasestorage.app",
    messagingSenderId: "1032210950205",
    appId: "1:1032210950205:web:3ebd273d6a93b03a9e6254"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app);
const firestore = getFirestore(app)
const storage = getStorage(app);

export {auth, firestore, storage}
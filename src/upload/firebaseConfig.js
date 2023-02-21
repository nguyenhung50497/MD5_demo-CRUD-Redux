import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBJafUJjASy5LsK-fE3QmndufTDq9PK9IE",
    authDomain: "products-6d310.firebaseapp.com",
    projectId: "products-6d310",
    storageBucket: "products-6d310.appspot.com",
    messagingSenderId: "61055493386",
    appId: "1:61055493386:web:96ac4e7c0b96fd51cd06f3",
    measurementId: "G-P4N19ZMJPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
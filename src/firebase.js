// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";


const firebaseConfig = {
    apiKey: "AIzaSyAJcNW50Gn21Riec2Z0FdqU5ScQHbyX8hU",
    authDomain: "medical-records-on-blockchain.firebaseapp.com",
    projectId: "medical-records-on-blockchain",
    storageBucket: "medical-records-on-blockchain.appspot.com",
    messagingSenderId: "637586770640",
    appId: "1:637586770640:web:7ea71adb4a055dcc082cd5",
    measurementId: "G-GEXERGZN5M"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();

export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const useAuth = () => {

    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, []);
    return currentUser;
};

export const logout = () => {
    return signOut(auth);
}


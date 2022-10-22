import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';
import { ToastContainer, toast } from 'react-toastify';

export const AuthContext = createContext()
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    /* Login user with google */
    const signInWithGoole = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    /* Create user with github */
    const signInWithGitHub = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    /* Create user with email and password */
    const registerWithEmailAndPassword = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    /* Update user */
    const userProfileUpdate = (useDetails) => {
        setLoading(true)
        return updateProfile(auth.currentUser, useDetails)
    }

    /* Login with email and password */
    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userEmailVerify = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }


    const logOut = () => {
        setLoading(true)
        setUser({})
        return signOut(auth)
    }

    /* User observer */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser == null || currentUser.emailVerified) {
                setUser(currentUser)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])












    const authInfo = { user, signInWithGoole, signInWithGitHub, registerWithEmailAndPassword, userEmailVerify, loginWithEmailAndPassword, logOut, userProfileUpdate, ToastContainer, toast, loading, setLoading }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
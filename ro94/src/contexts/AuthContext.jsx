import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../firebase"; // Import db
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null); // [NEW] Store the role here
    const [loading, setLoading] = useState(true);

    // Sign Up Function (Modified to create user document)
    async function signup(email, password, role = 'client') {
        // 1. Create Auth User
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Create Database Document
        // By default, new signups via the login page are 'client'
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            role: role,
            createdAt: new Date()
        });

        return userCredential;
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // [NEW] If user is logged in, fetch their role from database
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserRole(docSnap.data().role || 'client');
                    } else {
                        // Fallback: If no doc exists, assume they are a client
                        setUserRole('client');
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUserRole('client');
                }
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole, // [NEW] Export the role
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
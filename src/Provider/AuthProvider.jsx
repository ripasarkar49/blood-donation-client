import React, { createContext, use, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] = useState("");
  // console.log(loading, user);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  const logout = () => {
    return signOut(auth);
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      //   console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/users/role/${user.email}`).then((res) => {
      //   console.log(res.data.role);
      setRole(res.data.role);
      setRoleLoading(false)
      //   setLoading(false);
    });
  }, [user]);
//   console.log(role);
  
  const authData = {
    user,
    setUser,
    createUser,
    logout,
    signIn,
    loading,
    setLoading,
    updateUser,
    googleLogin,
    resetPassword,
    role,
    roleLoading
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;

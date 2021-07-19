import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA7lUJPuQ7Y_7Rdk6ZQBbF2Yq07-olGPh8",
  authDomain: "crwn-clothing-db-5a2f5.firebaseapp.com",
  projectId: "crwn-clothing-db-5a2f5",
  storageBucket: "crwn-clothing-db-5a2f5.appspot.com",
  messagingSenderId: "502129473266",
  appId: "1:502129473266:web:44bc2cb32e9a9c94ab826b",
  measurementId: "G-ZZFMKTC6Y8",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyCFdOPrduV-cGPi8xuYtjNMtQARLcf3cug",
	authDomain: "ztm-ecomerce-db.firebaseapp.com",
	projectId: "ztm-ecomerce-db",
	storageBucket: "ztm-ecomerce-db.appspot.com",
	messagingSenderId: "183776296883",
	appId: "1:183776296883:web:ca1092a4dc34901b6255c6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(userDocRef)
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot.exists())
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			})
		} catch (error) {
			console.log('error creating the user', error.message)
		}
	}
	return userDocRef;
}
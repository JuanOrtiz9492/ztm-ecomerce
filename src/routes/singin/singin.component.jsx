import {
	auth,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInWithGoogleRedirect
} from "../../utils/firebase/firebase.utils"

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";


const Signin = () => {
	useEffect(() => {
		const checkRedirect = async () => {
			const result = await getRedirectResult(auth)
			if (result) {
				createUserDocumentFromAuth(result.user)
			}
			console.log(result)
		}
		checkRedirect()
	}, [])

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	}

	return (
		<div>
			<h1>
				SIGN IN PAGE
			</h1>
			<button onClick={logGoogleUser}>Sign in with google Popup</button>
			<button onClick={signInWithGoogleRedirect}>Sign in with google Redirect Popup</button>
		</div>
	)
}

export default Signin
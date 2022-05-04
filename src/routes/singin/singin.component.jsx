import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"

import SignUpForm from "../../componets/sign-up-form/sign-up-form.component";


const Signin = () => {
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
			<SignUpForm />
		</div>
	)
}

export default Signin
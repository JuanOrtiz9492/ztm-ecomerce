
import { async } from "@firebase/util"
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"


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
		</div>
	)
}

export default Signin
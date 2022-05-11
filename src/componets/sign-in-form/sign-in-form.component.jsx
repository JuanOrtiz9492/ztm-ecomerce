import { useState } from "react"
import { signInWithGooglePopup, signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import './sign-in-form.styles.scss'


const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {

	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields;
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { user } = await signInAuthWithEmailAndPassword(email, password)
			resetForm();
		} catch (error) {
			if (error.code === 'auth/user-not-found') {
				alert("user does not exist")
			} else if (error.code === 'auth/wrong-password') {
				alert("invalid user data")
			}
			console.log('error login', error)
		}
	}

	const handleChange = ({ target: { value, name } }) => {
		setFormFields({ ...formFields, [name]: value })
	}

	const resetForm = () => {
		setFormFields(defaultFormFields);
	}

	const signWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
	}
	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
				<FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType="google" onClick={signWithGoogle}>Google sign in</Button>
				</div>
			</form>
		</div >

	)
}

export default SignInForm
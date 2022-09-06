import { useState, FormEvent, ChangeEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";

import { AuthError, AuthErrorCodes } from "firebase/auth";

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";


import { SignInContainer, ButtonsContainer } from "./sign-in-form.style";



const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch ((error as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('Incorrect password for the given email');
                    break;
                case AuthErrorCodes.USER_DELETED:
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
            console.log(error);
        }
    };
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    
    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type='email' required onChange={handleChange} 
                       name="email" value={email} />

                <FormInput label="Password" type='password' required onChange={handleChange} 
                       name="password" value={password} />
                <ButtonsContainer>
                    <Button type='submit' onClick={handleSubmit}>Sign In</Button>
                    {
                    /*Important!!! type='button' is required, because if not indicated explicitly, 
                     it's assumed to be a 'submit' button and it'd trigger onSubmit event */
                    }
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} 
                           onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;
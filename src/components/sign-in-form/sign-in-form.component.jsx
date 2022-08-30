import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import './sign-in-form.style.scss';



const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();
    //const  [formFields, setFormFields] = useState(defaultFormFields);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert('Incorrect password for the given email');
                    break;
                case "auth/user-not-found":
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
            console.log(error);
        }
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    
    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type='email' required onChange={handleChange} 
                       name="email" value={email} />

                <FormInput label="Password" type='password' required onChange={handleChange} 
                       name="password" value={password} />
                <div className="buttons-container">
                    <Button type='submit' onClick={handleSubmit}>Sign In</Button>
                    {
                    /*Important!!! type='button' is required, because if not indicated explicitly, 
                     it's assumed to be a 'submit' button and it'd trigger onSubmit event */
                    }
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} 
                           onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
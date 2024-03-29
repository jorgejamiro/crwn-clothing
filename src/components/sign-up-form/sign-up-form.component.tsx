import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { AuthError, AuthErrorCodes } from "firebase/auth";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';

import { SignUpContainer } from "./sign-up-form.style";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const  [formFields, setFormFieds] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const { t } = useTranslation();

    const resetFormFields = () => {
        setFormFieds(defaultFormFields);
    } 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert(t('msgPwdNotMatch'));
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS)
                alert(t('msgEmailUsed'));
            else {
                console.log('user creation encountered an error', error);
            }
        }
    }
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFieds({...formFields, [name]: value});
    };
    
    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Signup with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="DisplayName" type='text' required onChange={handleChange} 
                       name="displayName" value={displayName} />

                <FormInput label="Email" type='email' required onChange={handleChange} 
                       name="email" value={email} />

                <FormInput label="Password" type='password' required onChange={handleChange} 
                       name="password" value={password} />

                <FormInput label="Confirm Password" type='password' required onChange={handleChange} 
                       name="confirmPassword" value={confirmPassword} />

                <Button>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;
import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import AppInput from "../inputs/AppInput";
import {useAtom} from "jotai";
import {AppAtom, AuthAtom} from "../../store";
import {useNavigate} from "react-router-dom";
import HttpService from "../services/Http.service";
import LocalstorageService from "../services/Localstorage.service";

const LoginForm = () => {
    const navigate = useNavigate();
    const [{isLoading}] = useAtom(AppAtom)
    const [state, setState] = useAtom(AuthAtom)
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        if (form.checkValidity()) {
            event.preventDefault();
            setValidated(true);
            const response = await HttpService.post<{token:string}>('/auth/login', {username: email, password})

            if (response.statusText === 'OK') {
                const token = response.data.token
                LocalstorageService.setItem('token', token)
                setState({...state, isAuthenticated: true, token})
                navigate('/')
            }
        } else {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <AppInput required
                      value={email}
                      setValue={setEmail}
                      id={'login'}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      invalidFeedback={"Please provide a valid email."}
                      type="email"
                      placeholder="Login"
            />
            <AppInput required
                      value={password}
                      setValue={setPassword}
                      id={'password'}
                      minLength={8}
                      invalidFeedback={"Must be at least 8 characters long."}
                      type="password"
                      placeholder="Password"
            />
            <Button disabled={isLoading} variant="success" className="mt-4 mb-2 w-100" type="submit">Login</Button>
        </Form>
    )
}

export default LoginForm

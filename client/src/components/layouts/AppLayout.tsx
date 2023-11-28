import React, {FC} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {Button, Navbar} from "react-bootstrap";
import AppError from "../AppError";
import {useAtom} from "jotai";
import {AppAtom, AuthAtom} from "../../store";
import HttpService from "../services/Http.service";
import LocalstorageService from "../services/Localstorage.service";

type Props = {
    isAuthenticated: boolean;
}

const AppLayout: FC<Props> = ({isAuthenticated}) => {
    const navigate = useNavigate();
    const [{error}] = useAtom(AppAtom)
    const [state, setState] = useAtom(AuthAtom)

    if (!isAuthenticated) return <Navigate to="/auth/login"/>

    const logout = async () => {
        LocalstorageService.removeItem('token')
        setState({...state, isAuthenticated: false, token: ''})
        navigate('/auth/login')
    }

    return (
        <div>

            <Navbar className={'justify-content-between p-2 bg-dark'}>
                <Navbar.Brand className={'text-white'} href="/">Navbar</Navbar.Brand>
                <Button variant="danger" onClick={logout}>Logout</Button>
            </Navbar>
            <AppError error={error}/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default AppLayout

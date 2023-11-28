import React, {FC, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {useAtom} from "jotai";
import {AuthAtom} from "../store";
import AppLayout from "../components/layouts/AppLayout";
import Home from "../components/views/Home";
import AuthLayout from "../components/layouts/AuthLayout";
import Login from "../components/views/Login";
import PageNotFound from "../components/views/PageNotFound";
import LocalstorageService from "../components/services/Localstorage.service";

const token = LocalstorageService.getItem('token')

const AppRouter: FC = () => {
    const [state,setState] = useAtom(AuthAtom)

    useEffect(() => {
        if (token) {
            //@ts-ignore
            setState({...state, isAuthenticated: true, token})
        }
    }, [])

    return (
        <Routes>
            <Route path="/" element={<AppLayout isAuthenticated={state.isAuthenticated}/>}>
                <Route index path="/" element={<Home/>}/>
            </Route>
            <Route path="/auth" element={<AuthLayout isAuthenticated={state.isAuthenticated}/>}>
                <Route index path="login" element={<Login/>}/>
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRouter;

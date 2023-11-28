import {atom} from "jotai";

export type appError = {
    message: string
    status: number
} | null

export type AppState = {
    error: appError
    isLoading: boolean
}

export type AuthState = {
    isAuthenticated: boolean
    token: string
}

export const initialAuthState = {
    isAuthenticated: false,
    token: ''
}

export const initialAppState = {
    error: null,
    isLoading: false
}

export const AuthAtom = atom<AuthState>(initialAuthState)
export const AppAtom = atom<AppState>(initialAppState)

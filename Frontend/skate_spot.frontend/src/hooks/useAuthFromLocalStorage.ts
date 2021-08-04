import { useEffect } from "react";
import { localStorageJWTKey, setAuthStateFromLocalStorage } from '../state/actions/authActions';
import { useAppDispatch } from '../state/store';
import { JWTPayload } from "../types/types";

export const useAuthFromLocalStorage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem(localStorageJWTKey)
        if (token) {
            try {
                const JWTPayload: JWTPayload = JSON.parse(atob(token.split(".")[1]))
                if (!isTokenExpired(JWTPayload))
                    dispatch(setAuthStateFromLocalStorage({
                        id: JWTPayload.uid,
                        userName: JWTPayload.sub,
                        email: JWTPayload.email,
                        roles: JWTPayload.roles,
                        // TODO is this needed? If yes place this information in the token (on backend side)
                        // this says if user email is verified
                        isVerified: false,
                        jwToken: token,
                        issuedOn: new Date(JWTPayload.nbf * 1000),
                        expiresOn: new Date(JWTPayload.exp * 1000)
                    }))
            }
            catch (e) {
                console.log("Can't set auth state from local storage. Malformed state", e)
            }
        }
    }, [])
}

const isTokenExpired = (token: JWTPayload) => {
    return (new Date()).getTime() > token.exp * 1000
}
import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

import {COLLECTION_USER} from '../configs/database';

import {api} from "../services/api";

type User = {
    id: string,
    username: string;
    firstname: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User,
    loading: boolean,
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    async function loadUserStorageData(){
        setLoading(true);
        const storage = await AsyncStorage.getItem(COLLECTION_USER);

        if(storage){
            const userLogged = JSON.parse(storage) as User;
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

            setUser(userLogged);
        }

        setLoading(false);
    }

    useEffect(() => {

        loadUserStorageData();

    }, []);

    async function signIn() {
        setLoading(true);
        try {

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            console.log(process,'teste');
            const {type, params} = await AuthSession.
            startAsync({authUrl}) as AuthorizationResponse;

            if(type === 'success' && !params.error){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;

                const userInfo = await api.get('/users/@me');

                const firstname = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

                const userData = {
                    ...userInfo.data,
                    firstname,
                    token: params.access_token
                };

                await AsyncStorage.setItem(COLLECTION_USER,JSON.stringify(userData));
                setUser(userData);
            }
        } catch{

            throw new Error('Não foi possível autenticar');

        } finally {

            setLoading(false);

        }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USER);
    }

    return (
        <AuthContext.Provider value={{user, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}

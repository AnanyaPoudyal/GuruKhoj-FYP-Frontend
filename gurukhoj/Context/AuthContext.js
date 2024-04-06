import React, {creatContext, useState, useEffect} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

//context
const AuthContext = creatContext()

//provider 
const AuthProvider = ({children}) => {
    //global state
    const [state, setState] = userState({
        user: null,
        token: '',
    });

    //initial local storage data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({...state, user:loginData?.user, token: loginData?.token})
        }
        loadLocalStorageData()
    }, []);

    return(
        <AuthContext.Provider value={state, setState}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthProvider};
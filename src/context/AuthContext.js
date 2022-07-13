import React, { useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";

//Creamos el contexto
const AuthContext = React.createContext();

//hook para acceder al context
const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState();
    const [cargando, setCargando] = useState(true);


    //ESTE ES EL EFECTO PARA VERIFICAR SI TIENE UNA SESSIÓN ACTIVA
    useEffect(() => {
        const cancelarSubs = onAuthStateChanged(auth, (usuario) => {
            setUsuario(usuario);
            setCargando(false)
        });

        return cancelarSubs;
    }, [])

    return (
        <AuthContext.Provider value={{ usuario: usuario }}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext, useAuth };
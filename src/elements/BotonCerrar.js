import React from "react";
import { auth } from "../firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconoCerrar } from './../images/log-out.svg';
import Boton from "./Boton";


const BotonCerrar = () => {
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        try {
            await signOut(auth);
            console.log('SESIÓN TERMINADA...');
            navigate('/login')

        } catch (error) {
            console.log("ERROR AL MOMENTO DE CERRAR SESION===>", error);
        }

    }

    return (
        <Boton iconoGrande as="button" onClick={cerrarSesion}>
            <IconoCerrar />
        </Boton>
    );
}

export default BotonCerrar;
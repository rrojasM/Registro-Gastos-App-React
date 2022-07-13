import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FirebaseConfig";
import { Header, Titulo, ContenedorHeader } from './../elements/Header';
import Boton from './../elements/Boton';
import { Formulario, Input, ContenedorBoton } from './../elements/ElementosFormulario';
import { ReactComponent as SvgLogin } from './../images/registro.svg';
import Alerta from "../elements/Alerta";


const Svg = styled(SvgLogin)`
	width: 100%;
	max-height: 6.25rem; 
	margin-bottom: 1.25rem;  
    
    //width: 100%;
    //max-height: 12.5rem;/* 200px */
    //margin-bottom: 1.25rem;/* 20px */
`;

const Registro = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [stateAlert, setStateAlert] = useState(false);
    const [alerta, setAlerta] = useState({})


    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                setCorreo(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStateAlert(false);
        setAlerta({});

        /* Comprobamos que el correo es correcto */
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

        if (!expresionRegular.test(correo)) {
            setStateAlert(true);
            setAlerta({
                tipo: "error",
                mensaje: "INGRESE UN CORREO ELECTRONICO VALIDO..."
            })
            return;
        }

        if (correo === '' || password === '' || password2 === '') {
            setStateAlert(true);
            setAlerta({
                tipo: "error",
                mensaje: "INGRESE TODOS LOS DATOS DEL FORMULARIO"
            })
            return;
        }

        if (password !== password2) {
            setStateAlert(true);
            setAlerta({
                tipo: "error",
                mensaje: "LAS CONTRASEÑAS NO SON IGUALES"
            })
            return;
        }

        try {
            //await auth.createUserWithEmailAndPassword(correo, password);
            await createUserWithEmailAndPassword(auth, correo, password)
            navigate('/')

        } catch (error) {
            setStateAlert(true);
            let mensaje;
            switch (error.code) {
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            }
            setAlerta({ tipo: 'error', mensaje: mensaje });
        }
    }

    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/Login">Iniciar Sesión</Boton>

                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password2"
                    placeholder="Repetir Contraseña"
                    value={password2}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                stateAlert={stateAlert}
                changeStateAlert={setStateAlert}
            />
        </>

    );
}

export default Registro; 
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { Header, Titulo, ContenedorHeader } from './../elements/Header';
import Boton from './../elements/Boton';
import { Formulario, Input, ContenedorBoton } from './../elements/ElementosFormulario';
import { ReactComponent as SvgLogin } from './../images/login.svg';
import Alerta from "../elements/Alerta";


const Login = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [stateAlert, setStateAlert] = useState(false);
    const [alerta, setAlerta] = useState({});

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setCorreo(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
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
                mensaje: "INGRESE UN CORREO ELECTRONICO."
            })
            return;
        }

        if (correo === '' || password === '') {
            setStateAlert(true);
            setAlerta({
                tipo: "error",
                mensaje: "INGRESE CORREO Y CONTRASEÑA."
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, correo, password);
            console.log("LOGIN CORRECTO");
            navigate('/')

        } catch (error) {
            setStateAlert(true);
            let mensaje;
            console.log('CODIGO DE ERROR ===>', error.code);
            switch (error.code) {
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No se encontro ninguna cuenta con estes correo electronico.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar acceder a la cuenta.'
                    break;
            }
            setAlerta({ tipo: 'error', mensaje: mensaje });
        }
    }

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to="/registro">Registrarse</Boton>
                    </div>
                </ContenedorHeader>

            </Header>
            <Formulario onSubmit={handleSubmit} style={{ alignItems: "center" }}>
                <SvgLogin />
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
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Iniciar Sesión</Boton>
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

export default Login; 
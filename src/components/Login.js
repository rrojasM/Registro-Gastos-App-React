import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Header, Titulo, ContenedorHeader } from './../elements/Header';
import Boton from './../elements/Boton';
import { Formulario, Input, ContenedorBoton } from './../elements/ElementosFormulario';
import { ReactComponent as SvgLogin } from './../images/login.svg';

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem;/* 200px */
    margin-bottom: 1.25rem;/* 20px */

`;
const Login = () => {
    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to="/Registro">Registrarse</Boton>

                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario>
                <Svg />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
        </>
    );
}

export default Login; 
import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Header, Titulo, ContenedorHeader } from './../elements/Header';
import Boton from './../elements/Boton';
import { Formulario, Input, ContenedorBoton } from './../elements/ElementosFormulario';
import { ReactComponent as SvgLogin } from './../images/registro.svg';


const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem;/* 100px */
    margin-bottom: 1.25rem;/* 20px */

`;
const Registro = () => {
    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="Login">Iniciar Sesión</Boton>

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
                <Input
                    type="password"
                    name="password2"
                    placeholder="Repetir Contraseña"
                />
                <ContenedorBoton>
                    <Boton as="button" primario type="submit">Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>
        </>

    );
}

export default Registro; 
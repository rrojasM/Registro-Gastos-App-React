import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "./../elements/Header";
import BtnRegresar from './../elements/BtnRegresar';
const GastosCategoria = () => {
    return (
        <>
            <Helmet>
                <title>Gastos por Gasto!</title>
            </Helmet>
            <Header>
                <BtnRegresar />
                <Titulo>Gastos por Categoria</Titulo>
            </Header>


            
        </>
    );
}

export default GastosCategoria; 
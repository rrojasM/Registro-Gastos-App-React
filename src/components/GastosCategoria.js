import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "./../elements/Header";
import BtnRegresar from './../elements/BtnRegresar';
import BarraTotal from "./BarraTotal";

const GastosCategoria = () => {
    return (
        <>
            <Helmet>
                <title>Gastos por Categoria</title>
            </Helmet>
            <Header>
                <BtnRegresar />
                <Titulo>Gastos por Categoria</Titulo>
            </Header>
            <BarraTotal />
        </>
    );
}

export default GastosCategoria; 
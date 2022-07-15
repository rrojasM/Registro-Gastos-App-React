import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "./../elements/Header";
import BtnRegresar from './../elements/BtnRegresar';
import BarraTotal from "./BarraTotal";
import UseObtenerGastosPorCategoria from "../hooks/UseObtenerGastosPorCategoria";

const GastosCategoria = () => {

    const gastosPorCategoria = UseObtenerGastosPorCategoria();
    console.log(gastosPorCategoria);

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
import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "./../elements/Header";
import BtnRegresar from './../elements/BtnRegresar';
import BarraTotal from "./BarraTotal";

const ListaGastos = () => {
    return (
        <>
            <Helmet>
                <title>Lista de Gastos!</title>
            </Helmet>
            <Header>
                <BtnRegresar />
                <Titulo>Lista de Gastos</Titulo>
            </Header>
            <BarraTotal />
        </>
    );
}

export default ListaGastos; 
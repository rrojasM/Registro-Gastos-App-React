import React from "react";
import BarraTotal from "./BarraTotal";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "../elements/Header";
import BtnRegresar from "../elements/BtnRegresar";
import FormularioGasto from './FormularioGasto';
import { useParams } from "react-router-dom";
import UseObtenerGasto from "../hooks/UseObtenerGasto";
const EditarGasto = () => {
    const { id } = useParams();
    const [gasto] = UseObtenerGasto(id);

    return (
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>
            <Header>
                <BtnRegresar ruta="/lista"/>
                <Titulo>Editar Gasto</Titulo>
            </Header>

            <FormularioGasto 
                gasto={gasto}
            />
            <BarraTotal />
        </>

    );
}

export default EditarGasto; 
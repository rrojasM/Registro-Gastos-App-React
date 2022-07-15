import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "./../elements/Header";
import BtnRegresar from './../elements/BtnRegresar';
import BarraTotal from "./BarraTotal";
import UseObtenerGastosPorCategoria from "../hooks/UseObtenerGastosPorCategoria";
import { ListaDeCategorias, Categoria, Valor, ElementoListaCategorias } from '../elements/ElementosList';
import IconoCategoria from '../elements/IconCategoria';
import FormatearCantidad from '../func/ConvertirMoneda';

const GastosCategoria = () => {

    const gastosPorCategoria = UseObtenerGastosPorCategoria();
    //console.log(gastosPorCategoria);
    return (
        <>
            <Helmet>
                <title>Gastos por Categoria</title>
            </Helmet>
            <Header>
                <BtnRegresar />
                <Titulo>Gastos por Categoria</Titulo>
            </Header>

            <ListaDeCategorias>
                {gastosPorCategoria.map((item, index) => {
                    return (
                        <ElementoListaCategorias key={index}>
                            <Categoria>
                                <IconoCategoria nombre={item.categoria} />
                                {item.categoria}
                            </Categoria>
                            <Valor>{FormatearCantidad(item.cantidad)}</Valor>
                        </ElementoListaCategorias>
                    )
                })}
            </ListaDeCategorias>
            <BarraTotal />
        </>
    );
}

export default GastosCategoria; 
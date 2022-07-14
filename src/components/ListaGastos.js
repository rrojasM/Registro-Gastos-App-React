import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo } from "./../elements/Header";
import BtnRegresar from './../elements/BtnRegresar';
import BarraTotal from "./BarraTotal";
import UseObtenerGastos from "../hooks/UseObtenerGastos";
import {
    Lista,
    ElementoLista,
    ListaDeCategorias,
    ElementoListaCategorias,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from "../elements/ElementosList";
import IconoCategoria from '../elements/IconCategoria';
import FormatearCantidad from "../func/ConvertirMoneda";
import { ReactComponent as IconoEditar } from '../images/editar.svg';
import { ReactComponent as IconoBorrar } from '../images/borrar.svg';
import { Link } from "react-router-dom";
import Boton from '../elements/Boton';
import { fromUnixTime, format } from "date-fns";
import { es } from "date-fns/locale";


const ListaGastos = () => {
    const [gastos] = UseObtenerGastos();

    const formatFecha = (fecha) => {
        return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es });
    }

    const fechaIgual = (gastos, index, gasto) => {

        if (index !==0 ) {
            const fechaActual = formatFecha(gasto.fecha);
            const fechaGastoAnterior = formatFecha(gastos[index -1].fecha);
            
            if(fechaActual === fechaGastoAnterior){
                return true
            }else{
                return false
            }
        } 
    }

    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>
            <Header>
                <BtnRegresar />
                <Titulo>Lista de Gastos</Titulo>
            </Header>
            <Lista>
                {gastos.map((gasto, i) => {
                    return (
                        <div key={gasto.id}>
                            {!fechaIgual(gastos, i, gasto) && <Fecha>{formatFecha(gasto.fecha)}</Fecha> }
                            <ElementoLista key={gasto.id}>
                                <Categoria>
                                    <IconoCategoria nombre={gasto.categoria} />
                                    {gasto.categoria}
                                </Categoria>
                                <Descripcion>
                                    {gasto.descripcion}
                                </Descripcion>
                                <Valor>{FormatearCantidad(gasto.cantidad)}</Valor>
                                <ContenedorBotones>
                                    <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                                        <IconoEditar />
                                    </BotonAccion>
                                    <BotonAccion>
                                        <IconoBorrar />
                                    </BotonAccion>

                                </ContenedorBotones>
                            </ElementoLista>
                        </div>
                    );
                })}

                <ContenedorBotonCentral>
                    <BotonCargarMas>Cargar más</BotonCargarMas>
                </ContenedorBotonCentral>

                {gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos por mostrar</Subtitulo>
                        <Boton as={Link} to="/">Agregar Gasto</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>
            <BarraTotal />
        </>
    );
}

export default ListaGastos; 
import React, { useState } from "react";
import { ContenedorFiltros, Formulario, ContenedorBoton, Input, InputGrande } from "../elements/ElementosFormulario";
import Boton from "../elements/Boton";
import { ReactComponent as IconPlus } from './../images/plus.svg';
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import AgregarGasto from "../firebase/AgregarGasto";
import fromUnixTime from "date-fns/fromUnixTime";
import getUnixTime from "date-fns/getUnixTime";
import { useAuth } from '../context/AuthContext';
import Alerta from '../elements/Alerta';


const FormularioGasto = () => {

    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());
    const [estadoAlert, setEstadoAlert] = useState(false);
    const [alerta, setAlerta] = useState({})
    const { usuario } = useAuth();


    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            setDescripcion(e.target.value);
        } else if (e.target.name === 'cantidad') {
            setCantidad(e.target.value.replace(/[^0-9]/g, ''))
        }
    }

    const handleSubmit = (e) => {
        console.log('SE EJECUTO HANDLE SUBMIT');
        e.preventDefault();
        let cantidadParse = parseFloat(cantidad).toFixed(2);

        if (descripcion !== '' && cantidad !== '') {
            AgregarGasto({
                categoria: categoria,
                descripcion: descripcion,
                cantidad: cantidadParse,
                fecha: getUnixTime(fecha),
                uidUsuario: usuario.uid
            });
        }else{
            console.log('AGREGA TODOS LOS VALORES');
            setEstadoAlert(true)
            setAlerta({tipo:'error', mensaje:'Rellena todos los campos'})
        }
    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria={categoria}
                    setCategoria={setCategoria}
                />
                <DatePicker
                    fecha={fecha}
                    setFecha={setFecha}
                />
            </ContenedorFiltros>

            <div>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={handleChange}
                />

                <InputGrande
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    placeholder="$0.00"
                    value={cantidad}
                    onChange={handleChange}
                />

                <ContenedorBoton>
                    <Boton as="button" primario conIcono type="submit">
                        Agregar Gasto <IconPlus />
                    </Boton>
                </ContenedorBoton>
            </div>
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                stateAlert={estadoAlert}
                changeStateAlert={setEstadoAlert}
            />
        </Formulario>
    );
}

export default FormularioGasto;
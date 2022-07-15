import React, { useState, useEffect } from "react";
import { ContenedorFiltros, Formulario, ContenedorBoton, Input, InputGrande } from "../elements/ElementosFormulario";
import Boton from "../elements/Boton";
import { ReactComponent as IconPlus } from './../images/plus.svg';
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import AgregarGasto from "../firebase/AgregarGasto";
import getUnixTime from "date-fns/getUnixTime";
import fromUnixTime from "date-fns/fromUnixTime";
import { useAuth } from '../context/AuthContext';
import Alerta from '../elements/Alerta';
import { useNavigate } from "react-router-dom";
import EditarGasto from "../firebase/EditarGasto";

const FormularioGasto = ({ gasto }) => {
    const history = useNavigate();

    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState(new Date());
    const [estadoAlert, setEstadoAlert] = useState(false);
    const [alerta, setAlerta] = useState({})
    const { usuario } = useAuth();


    useEffect(() => {
        //Comprobamos si ya hay algun gasto
        if (gasto) {
            if (gasto.data().uidUsuario === usuario.uid) {
                setCategoria(gasto.data().categoria);
                setFecha(fromUnixTime(gasto.data().fecha));
                setDescripcion(gasto.data().descripcion);
                setCantidad(gasto.data().cantidad);
            } else {
                history("/lista")
            }
        }
    }, [gasto, usuario, history]);



    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            setDescripcion(e.target.value);
        } else if (e.target.name === 'cantidad') {
            setCantidad(e.target.value.replace(/[^0-9]/g, ''))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let cantidadParse = parseFloat(cantidad).toFixed(2);

        if (descripcion !== '' && cantidad !== '') {
            if (cantidad) {

                if (gasto) {
                    EditarGasto({
                        id: gasto.id,
                        descripcion: categoria,
                        cantidad: cantidad,
                        fecha: getUnixTime(fecha),
                        categoria: categoria
                    }).then(() => {
                        history('/lista')
                    }).catch((err) => console.log('ERROR EN EDITAR', err))
                } else {
                    AgregarGasto({
                        categoria: categoria,
                        descripcion: descripcion,
                        cantidad: cantidadParse,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid
                    }).then(() => {
                        setEstadoAlert(true);
                        setCategoria('hogar');
                        setFecha(new Date());
                        setDescripcion('');
                        setCantidad('');
                        setAlerta({ tipo: 'exito', mensaje: 'Gasto agrgado correctamente.' });

                    }).catch((error) => {
                        setEstadoAlert(true);
                        setAlerta({ tipo: 'exito', mensaje: 'Hubo un error al agregar el gasto a la db.' })
                    })
                }

            } else {
                setEstadoAlert(true);
                setAlerta({ tipo: 'error', mensaje: 'El valor que ingresaste no es valido.' });
            }

        } else {
            setEstadoAlert(true);
            setAlerta({ tipo: 'error', mensaje: 'Rellena todos los campos.' });
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
                        {gasto ? 'Actualizar Gasto': 'Agregar Gasto'} <IconPlus />
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
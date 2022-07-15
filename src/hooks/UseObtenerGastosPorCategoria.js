import { useState, useEffect } from "react";
import UseObtenerGastosPorMes from "./UseObtenerGastosPorMes";


const UseObtenerGastosPorCategoria = () => {
    const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
    const gastos = UseObtenerGastosPorMes();
    //console.log(gastos);

    useEffect(() => {
        const sumaDegastos = gastos.reduce((objectResult, objectActual) => {
            const categoriaActual = objectActual.categoria;
            const cantidadActual = objectActual.cantidad;
            objectResult[categoriaActual] += cantidadActual;

            return objectResult;
        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0,

        });

        setGastosPorCategoria(Object.keys(sumaDegastos).map((item) => {
            return { categoria: item, cantidad: sumaDegastos[item] }
        }));
    }, [setGastosPorCategoria, gastos]);

    return gastosPorCategoria;
}

export default UseObtenerGastosPorCategoria;
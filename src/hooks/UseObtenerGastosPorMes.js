import { useState, useEffect } from "react";
import { db } from "../firebase/FirebaseConfig";
import { collection, orderBy, onSnapshot, where, query } from "firebase/firestore";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { useAuth } from '../context/AuthContext'

const UseObtenerGastosPorMes = () => {

    const [gastos, setGastos] = useState([]);
    const { usuario } = useAuth();

    useEffect(() => {
        const inicioMes = getUnixTime(startOfMonth(new Date()));
        const finMes = getUnixTime(endOfMonth(new Date()));

        if (usuario) {
            const consulta = query(
                collection(db, 'gastos'),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioMes),
                where('fecha', '<=', finMes),
                where('uidUsuario', '==', usuario.uid)
            );

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                setGastos(snapshot.docs.map((document) => {
                    return { ...document.data(), id: document.id }
                }))
            }, (err) => console.log(err));
            
            //use effect tiene que retornar una funcion que se va a ejecutar cuando se desmonte el componente
            return unsuscribe;
        }

    }, [usuario])

    return gastos;
}

export default UseObtenerGastosPorMes;
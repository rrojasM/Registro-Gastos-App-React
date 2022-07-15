import { useEffect, useState } from "react";
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const UseObtenerGasto = (id) => {
    const history = useNavigate();
    const [gasto, setGasto] = useState('');

    useEffect(() => {
        const obtenerGasto = async () => {
            const document = await getDoc(doc(db, 'gastos', id));

            if(document.exists){
                setGasto(document);
            } else{
                history('/lista');
            }
        }

        obtenerGasto();

    }, [history, id])


return [gasto]
}

export default UseObtenerGasto;
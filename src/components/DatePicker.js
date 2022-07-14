import React from "react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DatePicker = ({fecha, setFecha}) => {
    return ( 
        <div>
            <input type="text" readOnly value={fecha}/>
            <DayPicker 
                mode="single"
                selected={fecha}
                onSelect={setFecha}   
            />
        </div>
     );
}
 
export default DatePicker;
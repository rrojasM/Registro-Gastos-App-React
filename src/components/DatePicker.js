import React from "react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DatePicker = () => {
    return ( 
        <div>
            <DayPicker 
                mode="single"   
            />
        </div>
     );
}
 
export default DatePicker;
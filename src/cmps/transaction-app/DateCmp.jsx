import React, {useState } from 'react';
import { useEffectUpdate } from '../../hooks/useEffectUpdate';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const DateCmp = ({ date,  setDate}) => {
    const [startDate, setStartDate] = useState(new Date(date));

    useEffectUpdate(() => {
        setDate(startDate)
    }, [startDate])

    return (
        <DatePicker selected={startDate} dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartDate(date)}
            wrapperClassName="date-picker"
        />
    );
};
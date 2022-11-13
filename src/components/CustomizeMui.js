import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Switch from '@mui/material/Switch';
import { DatePicker } from "antd";
import calendar from "../assets/img/icons/calendar.svg";

export function OutlinedInput1({ value, setValue, label, placeholder, helper, warning, error }) {
    return (
        <div className="outlined-input-1">
            <div className="label">{label}</div>
            <TextField
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
                variant="outlined" />
            {helper && <div className="helper" dangerouslySetInnerHTML={{ __html: helper }} />}
            {warning && <div className="warning" dangerouslySetInnerHTML={{ __html: warning }} />}
            {error && <div className="error" dangerouslySetInnerHTML={{ __html: error }} />}
        </div>
    )
}

export function OutlinedInput2({ value, setValue, label, placeholder, helper, warning, error }) {
    return (
        <div className="outlined-input-2">
            <TextField
                fullWidth
                label={label}
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                variant="outlined" />
            {helper && <div className="helper" dangerouslySetInnerHTML={{ __html: helper }} />}
            {warning && <div className="warning" dangerouslySetInnerHTML={{ __html: warning }} />}
            {error && <div className="error" dangerouslySetInnerHTML={{ __html: error }} />}
        </div>
    )
}

export function MultilineInput({ value, setValue, label, placeholder, helper, warning, error }) {
    return (
        <div className="multiline-input">
            <TextField
                fullWidth
                multiline
                minRows={3}
                label={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                variant="outlined" />
            {helper && <div className="helper" dangerouslySetInnerHTML={{ __html: helper }} />}
            {warning && <div className="warning" dangerouslySetInnerHTML={{ __html: warning }} />}
            {error && <div className="error" dangerouslySetInnerHTML={{ __html: error }} />}
        </div>
    )
}

export function OutlinedSelect({ value, setValue, label, options, helper, warning, error }) {
    return (
        <div className="outlined-select">
            <div className="label">{label}</div>
            <TextField
                fullWidth
                select
                // label="Select"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            // helperText="Please select your currency"
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            {helper && <div className="helper" dangerouslySetInnerHTML={{ __html: helper }} />}
            {warning && <div className="warning" dangerouslySetInnerHTML={{ __html: warning }} />}
            {error && <div className="error" dangerouslySetInnerHTML={{ __html: error }} />}
        </div>
    )
}

// export function DateTimeInput({ value, setValue, label, helper, warning, error }) {
//     return (
//         <div className="date-time-input">
//             <div className="label">{label}</div>
//             <LocalizationProvider dateAdapter={AdapterMoment}>
//                 <DateTimePicker
//                     // label="Date&Time picker"
//                     value={value}
//                     onChange={(e) => setValue(e)}
//                     openTo = "minutes"
//                     views={['year', 'month', 'day', 'hours', 'minutes']}
//                     renderInput={(params) => <TextField {...params} />}
//                 />
//             </LocalizationProvider>
//             {helper && <div className="helper">{helper}</div>}
//             {warning && <div className="warning">{warning}</div>}
//             {error && <div className="error">{error}</div>}
//         </div>
//     )
// }

export function DateTimeInput({ value, setValue, setTime, label, helper, warning, error }) {
    return (
        <div className="date-time-input">
            <div className="label">{label}</div>
            <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={true} minuteStep={30} secondStep={60} value={value} onChange={(date, dateString) => { setValue(date);}} suffixIcon={<img src={calendar} />} />
            {helper && <div className="helper" dangerouslySetInnerHTML={{ __html: helper }} />}
            {warning && <div className="warning" dangerouslySetInnerHTML={{ __html: warning }} />}
            {error && <div className="error" dangerouslySetInnerHTML={{ __html: error }} />}
        </div>
    )
}
export function Switcher({ label, value, setValue }) {
    return (
        <div className="switch">
            <Switch value={value} onChange={(e) => setValue(e.target.checked)} />
            <span>{label}</span>
        </div>
    )
}
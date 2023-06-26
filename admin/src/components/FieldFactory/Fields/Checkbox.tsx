import React from "react"
import Field from "../../../models/Field"
import css from './Fields.module.scss';

const Checkbox: React.FC<{ field:Field, value?:string }> = (props) => {

    const label = props.value ? props.value : props.field.label; 

    return (
        <label className={`${css.label} ${props.value ? css['label--option'] : ''}`} htmlFor={props.field.id}>            
            <input
                className={`${css.input} ${css['input--checkbox']}`}
                id={props.field.id}
                type="checkbox" 
                name={props.field.label}
                value={props.value}
                disabled />
            {label}
        </label>
    );
}

export default Checkbox;
import React from "react"
import Field from "../../../models/Field"
import css from './Fields.module.scss';

const Radio: React.FC<{ field:Field, value?:string }> = (props) => {

    const label = props.value ? props.value : props.field.label; 

    return (
        <label className={`${css.label} ${props.value ? css['label--option'] : ''}`} htmlFor={props.field.id}>
            <input
                className={`${css.input} ${css['input--radio']}`}
                id={props.field.id}
                type="radio" 
                name={props.field.label}
                value={props.value}
                disabled />
            {label}
        </label>
    );
}

export default Radio;
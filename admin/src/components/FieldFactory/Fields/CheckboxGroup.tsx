import React from "react"
import Field from "../../../models/Field"
import css from './Fields.module.scss';
import Checkbox from "./Checkbox";

const CheckboxGroup: React.FC<{ field:Field }> = (props) => {

    const options = props.field.options.map( opt => <Checkbox field={props.field} value={opt} />)

    return (
        <>
            <label className={css.label} htmlFor={props.field.id}>{props.field.label}</label>
            {options}
        </>
    );
}

export default CheckboxGroup;
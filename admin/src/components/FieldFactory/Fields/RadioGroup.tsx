import React from "react"
import Field from "../../../models/Field"
import css from './Fields.module.scss';
import Radio from "./Radio";

const RadioGroup: React.FC<{ field:Field }> = (props) => {

    const options = props.field.options.map( (opt, i) => <Radio key={i} field={props.field} value={opt} />)

    return (
        <>
            <label className={css.label} htmlFor={props.field.id}>{props.field.label}</label>
            {options}
        </>
    );
}

export default RadioGroup;
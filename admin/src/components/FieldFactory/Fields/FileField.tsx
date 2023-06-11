import React from "react"
import Field from "../../../models/Field"
import css from './Fields.module.scss';

const FileField: React.FC<{ field:Field }> = (props) => {
    return <>
        { props.field.label && <label className={css.label} htmlFor={props.field.id}>{props.field.label}</label> }
        <input
            className={css.input}
            id={props.field.id}
            type="file" 
            name={props.field.label}
            disabled />
    </>
}

export default FileField;
import React from "react"
import Field from "../../../models/Field"

const TextArea: React.FC<{ field:Field }> = (props) => {
    return <>
        { props.field.label && <label htmlFor={props.field.id}>{props.field.label}</label> }
        <textarea 
            id={props.field.id}
            name={props.field.label} />
    </>
}

export default TextArea;
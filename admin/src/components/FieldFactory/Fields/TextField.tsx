import React from "react"
import Field from "../../../models/Field"

const TextField: React.FC<{ field:Field }> = (props) => {
    return <>
        { props.field.label && <label htmlFor={props.field.id}>{props.field.label}</label> }
        <input 
            id={props.field.id}
            type="text" 
            name={props.field.label} />
    </>
}

export default TextField;
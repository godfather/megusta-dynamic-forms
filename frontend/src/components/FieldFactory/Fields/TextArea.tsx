import { ChangeEvent, useContext } from "react";
import useValidation from "../../../hooks/use-validation";
import { APIFieldLoad, FormRegistrationFields } from "../../../types";
import FieldContainer from "./FieldContainer";
import { FormContext } from "../../../store/form-context";

const TextArea: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const formContext = useContext(FormContext);
    
    const changeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
        formContext.add({
            field_id:field.id,
            field_value: event.target.value,
        }, field.field_validations);
    }

    const fieldValue:FormRegistrationFields|undefined = formContext.get(field.id);

    return (
        <FieldContainer>
            <label htmlFor={htmlId}>{ field.field_label }</label>
            <textarea 
                id={htmlId}
                name={field.field_name}
                value={fieldValue?.field_value}
                onChange={changeHandler}                               
                />
                { !fieldValue?.validation?.valid && <p>{ fieldValue?.validation?.errors[0] }</p> }
        </FieldContainer>
    )
}

export default TextArea;
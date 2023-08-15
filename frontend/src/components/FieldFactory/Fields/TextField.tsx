import { ChangeEvent, useContext } from "react";
import useValidation from "../../../hooks/use-validation";
import { APIFieldLoad, FormRegistrationFields } from "../../../types";
import FieldContainer from "./FieldContainer";
import { FormContext } from "../../../store/form-context";

const TextField: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const formContext = useContext(FormContext);

    const changeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        formContext.add({ 
            field_id:field.id, 
            field_value: event.target.value
        }, field.field_validations);
    }

    const fieldValue:FormRegistrationFields|undefined = formContext.get(field.id);

    return (
        <FieldContainer>
            <label htmlFor={htmlId}>{ field.field_label } </label>
            <input
                id={htmlId}
                type={field.field_type} 
                name={field.field_name}
                value={fieldValue?.field_value}
                onChange={changeHandler} />
            { !fieldValue?.validation?.valid && <p>{ fieldValue?.validation?.errors[0] }</p> }
        </FieldContainer>
    )
}

export default TextField;
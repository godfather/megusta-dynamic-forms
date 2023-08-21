import { ChangeEvent, useContext } from "react";
import useValidation from "../../../hooks/use-validation";
import { APIFieldLoad, FormRegistrationFields } from "../../../types";
import FieldContainer from "./FieldContainer";
import { FormContext } from "../../../store/form-context";

import css from './Field.module.scss';
import Label from "./Label";

const TextArea: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const formContext = useContext(FormContext);
    
    const changeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
        formContext.add({
            field_id:field.id,
            field_value: event.target.value,
        }, field.field_validations);
    }

    const fieldValue:FormRegistrationFields|undefined = formContext.get(field.id);
    const isRequired = /required/.test(field.field_validations);
    const valid = fieldValue?.validation?.valid || false;

    return (
        <FieldContainer>
            <Label text={field.field_label} htmlId={htmlId} required={isRequired} />
            <textarea 
                className={css['mdf__textarea']}
                id={htmlId}
                name={field.field_name}
                placeholder={field.field_tip}
                value={fieldValue?.field_value || ''}
                required={isRequired}
                onChange={changeHandler}
                />
                { !valid && <p className={css['mdf__error']}>{ fieldValue?.validation?.errors[0] }</p> }
        </FieldContainer>
    )
}

export default TextArea;
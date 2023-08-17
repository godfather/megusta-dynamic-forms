import { ChangeEvent, useContext } from "react";
import useValidation from "../../../hooks/use-validation";
import { APIFieldLoad, FormRegistrationFields } from "../../../types";
import FieldContainer from "./FieldContainer";
import { FormContext } from "../../../store/form-context";

import css from './Field.module.scss';

const TextArea: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const formContext = useContext(FormContext);
    
    const changeHandler = (event:ChangeEvent<HTMLTextAreaElement>) => {
        formContext.add({
            field_id:field.id,
            field_value: event.target.value,
        }, field.field_validations);
    }

    const fieldValue:FormRegistrationFields|undefined = formContext.get(field.id);
    const valid = fieldValue?.validation?.valid || false;

    return (
        <FieldContainer>
            <label className={css['mdf__label']} htmlFor={htmlId}>{ field.field_label }</label>
            <textarea 
                className={css['mdf__textarea']}
                id={htmlId}
                name={field.field_name}
                placeholder={field.field_tip}
                value={fieldValue?.field_value || ''}
                onChange={changeHandler}
                />
                { !valid && <p className={css['mdf__error']}>{ fieldValue?.validation?.errors[0] }</p> }
        </FieldContainer>
    )
}

export default TextArea;
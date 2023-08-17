import { ChangeEvent, useContext } from "react";
import useValidation from "../../../hooks/use-validation";
import { APIFieldLoad, FormRegistrationFields } from "../../../types";
import FieldContainer from "./FieldContainer";
import { FormContext } from "../../../store/form-context";

import css from './Field.module.scss';

const TextField: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const formContext = useContext(FormContext);

    const changeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        formContext.add({ 
            field_id:field.id, 
            field_value: event.target.value
        }, field.field_validations);
    }

    const fieldValue:FormRegistrationFields|undefined = formContext.get(field.id);
    const valid = (fieldValue?.validation?.valid || false);
    console.log(field);
    
    return (
        <FieldContainer>
            <label className={css['mdf__label']} htmlFor={htmlId}>{ field.field_label } </label>
            <input
                className={css['mdf__textfield']}
                id={htmlId}
                type={field.field_type} 
                name={field.field_name}
                placeholder={field.field_tip}
                value={fieldValue?.field_value || ''}
                onChange={changeHandler} />
            { !valid && fieldValue?.validation?.errors && <p className={css['mdf__error']}>{ fieldValue?.validation?.errors[0] }</p> }
        </FieldContainer>
    )
}

export default TextField;
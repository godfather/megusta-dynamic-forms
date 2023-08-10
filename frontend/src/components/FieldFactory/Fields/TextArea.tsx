import useValidation from "../../../hooks/use-validation";
import { APIFieldLoad } from "../../../types";
import FieldContainer from "./FieldContainer";

const TextArea: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const { 
        value, 
        isValid, 
        hasErrors, 
        errors, 
        onChangeHandler, 
        onBlurHandler, 
        reset } = useValidation('', field.field_validations);

    return (
        <FieldContainer>
            <label htmlFor={htmlId}>{ field.field_label }</label>
            <textarea 
                id={htmlId}
                name={field.field_name}
                value={value}
                defaultValue=''
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                />
                { !isValid && <p>{ errors[0] }</p> }
        </FieldContainer>
    )
}

export default TextArea;
import { useContext, useEffect, useState } from "react";
import { APIFieldLoad } from "../../../types";
import Checkbox from "./Checkbox";
import FieldContainer from "./FieldContainer";
import Label from "./Label";
import { FormContext } from "../../../store/form-context";


const CheckboxGroup: React.FC<{ field:APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const [ checkedOptions, setCheckedOptions ] = useState<string[]>([]);
    const fieldOptions = field.field_options?.split(';') || [];
    const formContext = useContext(FormContext);
    
    const onCheckHandler = (checked:boolean, value: string): void => {
        setCheckedOptions(state => {
            const newState = [...state.filter(item => item != value.trim())];
            if(checked) newState.push(value.trim());
            return newState;
        });
    }

    useEffect(() => {
        formContext.add({ 
            field_id:field.id, 
            field_value: checkedOptions.join(';')
        }, field.field_validations);
    }, [checkedOptions]);

    const options = fieldOptions.map( (opt, i) => <Checkbox key={i} field={field} value={opt} htmlId={`${htmlId}-${i}`} onChange={onCheckHandler} />)

    return (
        <FieldContainer>
            <Label htmlId={htmlId} text={field.field_label} required={field.required}/>
            {options}
        </FieldContainer>
    );
}

export default CheckboxGroup;
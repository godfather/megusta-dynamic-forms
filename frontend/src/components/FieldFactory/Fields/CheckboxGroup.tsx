import { APIFieldLoad } from "../../../types";
import Checkbox from "./Checkbox";
import FieldContainer from "./FieldContainer";
import css from './Field.module.scss';
import Label from "./Label";

const CheckboxGroup: React.FC<{ field:APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const fieldOptions = field.field_options?.split(';') || [];
    
    const options = fieldOptions.map( (opt, i) => <Checkbox key={i} field={field} value={opt} htmlId={`${htmlId}-${i}`} />)

    return (
        <FieldContainer>
            <Label htmlId={htmlId} text={field.field_label} required={field.required}/>
            {options}
        </FieldContainer>
    );
}

export default CheckboxGroup;
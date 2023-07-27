import { APIFieldLoad } from "../../../types";
import Checkbox from "./Checkbox";
import FieldContainer from "./FieldContainer";

const CheckboxGroup: React.FC<{ field:APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    const fieldOptions = field.field_options?.split(';') || [];
    
    const options = fieldOptions.map( (opt, i) => <Checkbox key={i} field={field} value={opt} htmlId={htmlId} />)

    return (
        <FieldContainer>
            <label htmlFor={htmlId}>{field.field_label}</label>
            {options}
        </FieldContainer>
    );
}

export default CheckboxGroup;
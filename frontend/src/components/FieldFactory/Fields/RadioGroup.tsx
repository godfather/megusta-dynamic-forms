import { APIFieldLoad } from "../../../types";
import Radio from "./Radio";
import FieldContainer from "./FieldContainer";

import Label from "./Label";

const RadioGroup: React.FC<{ field:APIFieldLoad, htmlId:string }> = ({ field, htmlId }) => {
    const fieldOptions = field.field_options?.split(';') || [];
    const options = fieldOptions.map( (opt, i) => <Radio key={i} field={field} value={opt} htmlId={`${htmlId}-${i}`} />)
    const isRequired = /required/.test(field.field_validations);

    return (
        <FieldContainer>
            <Label htmlId={htmlId} text={field.field_label} required={isRequired}/>
            {options}
        </FieldContainer>
    );
}

export default RadioGroup;
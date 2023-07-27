import { APIFieldLoad } from "../../../types";
import Radio from "./Radio";
import FieldContainer from "./FieldContainer";

const RadioGroup: React.FC<{ field:APIFieldLoad, htmlId:string }> = ({ field, htmlId }) => {
    const fieldOptions = field.field_options?.split(';') || [];
    const options = fieldOptions.map( (opt, i) => <Radio key={i} field={field} value={opt} htmlId={htmlId} />)

    return (
        <FieldContainer>
            <label>{field.field_label}</label>
            {options}
        </FieldContainer>
    );
}

export default RadioGroup;
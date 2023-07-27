import { APIFieldLoad } from "../../../types";
import FieldContainer from "./FieldContainer";

const TextField: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    

    return (
        <FieldContainer>
            <label htmlFor={htmlId}>{ field.field_label } </label>
            <input type={field.field_type} name={field.field_name} />
        </FieldContainer>
    )
}

export default TextField;
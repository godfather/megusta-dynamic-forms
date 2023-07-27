import { APIFieldLoad } from "../../../types";
import FieldContainer from "./FieldContainer";

const TextArea: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    return (
        <FieldContainer>
            <label htmlFor={htmlId}>{ field.field_label }</label>
            <textarea name={field.field_name} />
        </FieldContainer>
    )
}

export default TextArea;
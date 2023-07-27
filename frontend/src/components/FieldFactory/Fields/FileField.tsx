import { APIFieldLoad } from "../../../types";
import FieldContainer from "./FieldContainer";

const FileField: React.FC<{ field:APIFieldLoad, htmlId:string }> = ({ field, htmlId }) => {
    return (
        <FieldContainer>
            { field.field_label && <label htmlFor={htmlId}>{field.field_label}</label> }
            <input
                id={htmlId}
                type="file" 
                name={field.field_name} />
        </FieldContainer>
    );
}

export default FileField;
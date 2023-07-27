import { APIFieldLoad } from "../../../types";

const TextArea: React.FC<{ field: APIFieldLoad }> = ({ field }) => {
    const htmlId = `${field.form_id}-${field.field_name}`;

    return (
        <div className='field-container'>
            <label htmlFor={htmlId}>{ field.field_label }</label>
            <textarea name={field.field_name} />
        </div>
    )
}

export default TextArea;
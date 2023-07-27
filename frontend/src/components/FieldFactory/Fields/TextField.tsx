import { APIFieldLoad } from "../../../types";

const TextField: React.FC<{ field: APIFieldLoad }> = ({ field }) => {
    const htmlId = `${field.form_id}-${field.field_name}`;

    return (
        <div className='field-container'>
            <label htmlFor={htmlId}>{ field.field_label } </label>
            <input type={field.field_type} name={field.field_name} />
        </div>
    )
}

export default TextField;
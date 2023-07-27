import { APIFieldLoad } from "../../../types";

const TextField: React.FC<{ field: APIFieldLoad, htmlId: string }> = ({ field, htmlId }) => {
    

    return (
        <div className='field-container'>
            <label htmlFor={htmlId}>{ field.field_label } </label>
            <input type={field.field_type} name={field.field_name} />
        </div>
    )
}

export default TextField;
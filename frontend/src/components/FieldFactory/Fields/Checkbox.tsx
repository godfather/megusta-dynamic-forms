import { APIFieldLoad } from "../../../types";

const Checkbox: React.FC<{ field:APIFieldLoad, value?:string, htmlId: string }> = ({ field, value, htmlId }) => {

    const label = value ? value : field.field_label; 

    return (
        <label htmlFor={htmlId}>
            <input
                id={htmlId}
                type="checkbox" 
                name={field.field_name}
                value={value} />
            {label}
        </label>
    );
}

export default Checkbox;
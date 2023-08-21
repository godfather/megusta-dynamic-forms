import { ChangeEvent } from "react";
import { APIFieldLoad } from "../../../types";

const Checkbox: React.FC<{ 
    field:APIFieldLoad, 
    value?:string, 
    htmlId: string 
    onChange?: (checked: boolean, value:string) => void
}> = ({ field, value, htmlId, onChange }) => {
    const label = value ? value : field.field_label; 
    
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>): void => {
        if(onChange) onChange(event.target.checked, event.target.value);
    }

    return (
        <label htmlFor={htmlId}>
            <input
                id={htmlId}
                type="checkbox" 
                name={field.field_name}
                value={value}
                onChange={onChangeHandler} />
            {label}
        </label>
    );
}

export default Checkbox;
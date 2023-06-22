import { ChangeEvent } from "react";
import css from './FieldEditionForm.module.scss';

export type FieldEditionInputProps = {
    className?: string;
    type: string;
    id: string;
    name: string;
    label:string;
    value:string;
    onBlur:() => void;
    onChange:(event:ChangeEvent<HTMLInputElement>) => void;
    hasError:boolean;
    errorMessage:string;
}

const FieldEditionInput: React.FC<FieldEditionInputProps> = (props) => {
    return (
        <div className={props.className}>
                <label htmlFor={props.id}>{props.label}</label>
                <input 
                    className={`${props.hasError && css.inputError}`}
                    type={props.type} 
                    id={props.id} 
                    name={props.name} 
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}/>
                { props.hasError && <p className="error">{props.errorMessage}</p> }
        </div>
    )
}

export default FieldEditionInput;



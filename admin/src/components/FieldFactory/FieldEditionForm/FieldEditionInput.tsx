type FieldEditionInputProps = {
    className?: string;
    type: string;
    id: string;
    name: string;
    label:string;
    value:string;
}

const FieldEditionInput: React.FC<FieldEditionInputProps> = (props) => {
    return (
        <div className={props.className}>
                <label htmlFor={props.id}>{props.label}</label>
                <input type={props.type} id={props.id} name={props.name} value={props.value}/>
        </div>
    )
}

export default FieldEditionInput;



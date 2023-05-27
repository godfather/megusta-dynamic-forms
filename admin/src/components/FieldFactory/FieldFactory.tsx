import { PropsWithChildren } from "react";
import TextField from "./Fields/TextField";
import Field from "../../models/Field";
import TextArea from "./Fields/TextArea";

export enum FieldTypesEnum {
    TEXT_FIELD = 'TEXT_FIELD',
    TEXTAREA = 'TEXTAREA',
}

type FieldFactoryProps = { 
    fieldType:FieldTypesEnum;
    editionMode?:boolean;
    additionalProps?:{ field:Field, className?:string };
}




export const FieldEditionContainer: React.FC<PropsWithChildren> = (props) => {
    return (
        <div>
            <div>
                <button>Edit</button> | <button>remove</button>
            </div>            
            { props.children }
        </div>
    )
}


const FieldFactory: React.FC<PropsWithChildren<FieldFactoryProps>> = (props) => {

    let element = <TextField field={props.additionalProps!.field} />;

    if(props.fieldType === FieldTypesEnum.TEXTAREA) {
        element = <TextArea field={props.additionalProps!.field} />;
    }

    if(props.editionMode) {
        element = <FieldEditionContainer>{element}</FieldEditionContainer>
    }

    return element;
}

export default FieldFactory;
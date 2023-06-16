import { PropsWithChildren } from "react";
import TextField from "./Fields/TextField";
import Field from "../../models/Field";
import TextArea from "./Fields/TextArea";
import Checkbox from "./Fields/Checkbox";
import CheckboxGroup from "./Fields/CheckboxGroup";
import FileField from "./Fields/FileField";
import RadioGroup from "./Fields/RadioGroup";

export enum FieldTypesEnum {
    TEXT_FIELD = 'TEXT_FIELD',
    TEXTAREA = 'TEXTAREA',
    CHECKBOX = 'CHECKBOX',
    CHECKBOX_GROUP = 'CHECKBOX_GROUP',
    RADIO_GROUP = 'RADIO_GROUP',
    FILE = 'FILE',
    EMAIL = 'EMAIL',
}

type FieldFactoryProps = { 
    fieldType:FieldTypesEnum;
    editionMode?:boolean;
    additionalProps?:{ field:Field, className?:string };
}


const FieldFactory: React.FC<PropsWithChildren<FieldFactoryProps>> = (props) => {

    let element = <TextField field={props.additionalProps!.field} />;

    if(props.fieldType === FieldTypesEnum.TEXTAREA) {
        element = <TextArea field={props.additionalProps!.field} />;
    }

    if(props.fieldType === FieldTypesEnum.CHECKBOX) {
        element = <Checkbox field={props.additionalProps!.field} />
    }

    if(props.fieldType === FieldTypesEnum.CHECKBOX_GROUP) {
        element = <CheckboxGroup field={props.additionalProps!.field} />
    }

    if(props.fieldType === FieldTypesEnum.RADIO_GROUP) {
        element = <RadioGroup field={props.additionalProps!.field} />
    }

    if(props.fieldType === FieldTypesEnum.FILE) {
        element = <FileField field={props.additionalProps!.field} />
    }

    return element;
}

export default FieldFactory;
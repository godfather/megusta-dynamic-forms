import { APIFieldLoad, FieldTypesEnum } from '../../types';
import TextField from './Fields/TextField';
import TextArea from './Fields/TextArea';
import CheckboxGroup from './Fields/CheckboxGroup';

const FieldFactory: React.FC<{ field:APIFieldLoad }> = ({ field }) => {
    const htmlId = `${field.form_id}-${field.field_name}`;
    const type = field.field_type.toUpperCase();

    let compField = <TextField field={field} htmlId={htmlId} />

    if(type === FieldTypesEnum.TEXTAREA) compField = <TextArea field={field} />;
    if(type === FieldTypesEnum.CHECKBOX_GROUP) compField = <CheckboxGroup field={field} htmlId={htmlId} />;

    return compField;
}

export default FieldFactory;
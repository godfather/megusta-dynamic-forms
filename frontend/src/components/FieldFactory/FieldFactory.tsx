import { APIFieldLoad, FieldTypesEnum } from '../../types';
import TextField from './Fields/TextField';
import TextArea from './Fields/TextArea';

const FieldFactory: React.FC<{ field:APIFieldLoad }> = ({ field }) => {
    const type = field.field_type.toUpperCase();

    let compField = <TextField field={field} />

    if(type === FieldTypesEnum.TEXTAREA) {
        compField = <TextArea field={field} />;
    }

    return compField;
}

export default FieldFactory;
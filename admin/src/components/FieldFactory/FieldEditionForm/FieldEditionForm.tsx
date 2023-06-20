import { MouseEvent, ReactElement } from "react";
import Box from "../../ui/Box/Box";
import Field from "../../../models/Field";
import { FieldTypesEnum } from "../FieldFactory";

import css from './FieldEditionForm.module.scss';
import SwitchButton from "../Fields/Switch";
import FieldEditionInput from "./FieldEditionInput";

type FieldEditionFormProps = {
    field: Field;
    onClose: (event: MouseEvent<HTMLButtonElement>) => void;
    onUpdate: (field:Field) => void;
}


const FieldEditionForm: React.FC<FieldEditionFormProps> = (props) => {
    let optionsField:ReactElement | undefined = undefined;

    
    const saveFieldHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.onUpdate(props.field);
    }

    const formEditionStructure = [
        { id: 'fieldLabel', name:'field_label', label:'Label', type:'text', value:props.field.label },
        { id: 'fieldName', name:'field_name', label:'Name', type:'text', value:props.field.name },
        { id: 'fieldTip', name:'field_tip', label:'Tip', type:'text', value:props.field.tip },
    ]

    if(props.field.type === FieldTypesEnum.CHECKBOX_GROUP || props.field.type === FieldTypesEnum.RADIO_GROUP) {
        optionsField = <FieldEditionInput 
            type='text'
            id='fieldOptions' 
            name='field_options'
            label='Options'
            value=''
            className={css['field-group']} />
    } else {
        optionsField = <div className={`${css['field-group']} ${css['field-group-row']}`}>
            <FieldEditionInput 
                type='text'
                id='fieldMin' 
                name='field_min'
                label='Min'
                value=''
                className={css['validation-field']} />

            <FieldEditionInput 
                type='text'
                id='fieldMax' 
                name='field_max'
                label='Max'
                value=''
                className={css['validation-field']} />
        </div>
    }

    return <Box className={css['edition-form']} title='edition'>
        <form>            
            <div className={css['field-group']}>
                <label htmlFor="fieldRequered">Required</label>
                <SwitchButton name="required" id="fieldRequered" />
            </div>

            { formEditionStructure.map( field => <FieldEditionInput 
                type={field.type} 
                id={field.id} 
                name={field.name} 
                label={field.label} 
                value={field.value} 
                className={css['field-group']} />
            )}

            { optionsField }

            <div className={`${css['field-group-row']} ${css.actions}`}>
                <button className={css.button} onClick={saveFieldHandler}>Save</button>
                <button className={`${css.button} ${css['button--secondary']}`} onClick={props.onClose}>Cancel</button>
            </div>
        </form>
    </Box>;
}

export default FieldEditionForm;
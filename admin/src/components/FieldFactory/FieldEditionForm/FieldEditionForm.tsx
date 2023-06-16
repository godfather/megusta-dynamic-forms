import { MouseEvent, ReactElement } from "react";
import Box from "../../ui/Box/Box";
import Field from "../../../models/Field";
import { FieldTypesEnum } from "../FieldFactory";

import css from './FieldEditionForm.module.scss';

const FieldEditionForm: React.FC<{ field:Field, onClose:(event: MouseEvent<HTMLButtonElement>) => void }> = (props) => {

    let optionsField:ReactElement | undefined = undefined;


    const saveFieldHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }


    if(props.field.type === FieldTypesEnum.CHECKBOX_GROUP || props.field.type === FieldTypesEnum.RADIO_GROUP) {
        optionsField = <div className={css['field-group']}>
            <label htmlFor="fieldName">Options</label>
            <input type="text" id="fieldOptions" name="field_name" value={props.field.options }/>
        </div>
    } else {
        optionsField = <div className={`${css['field-group']} ${css['field-group-row']}`}>
            <div className={css['validation-field']}>
                <label htmlFor="fieldMin">Min</label>
                <input type="text" id="fieldMin" name="field_min" />
            </div>
            <div className={css['validation-field']}>
                <label htmlFor="fieldMax">Max</label>
                <input type="text" id="fieldMax" name="field_max" />
            </div>
        </div>
    }

    return <Box className={css['edition-form']} title='edition'>
        <form>
            <div className={css['field-group']}>
                <label htmlFor="fieldLabel">Label</label>
                <input type="text" id="fieldLabel" name="field_label" value={props.field.label}/>
            </div>
            <div className={css['field-group']}>
                <label htmlFor="fieldName">Name</label>
                <input type="text" id="fieldName" name="field_name" value={props.field.name}/>
            </div>
            <div className={css['field-group']}>
                <label htmlFor="fieldTip">Tip</label>
                <input type="text" id="fieldTip" name="field_tip" />
            </div>

            { optionsField }

            <div className={css['field-group-row']}>
                <button className={`${css.button} ${css['button-default']}`} onClick={saveFieldHandler}>Save</button>
                <button className={`${css.button} ${css['button-danger']}`} onClick={props.onClose}>Cancel</button>
            </div>
        </form>
    </Box>;
}

export default FieldEditionForm;
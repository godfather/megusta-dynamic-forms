import { MouseEvent, ReactElement } from "react";
import Box from "../../ui/Box/Box";
import Field from "../../../models/Field";
import { FieldTypesEnum } from "../FieldFactory";

import css from './FieldEditionForm.module.scss';
import SwitchButton from "../Fields/Switch";
import FieldEditionInput, { FieldEditionInputProps } from "./FieldEditionInput";
import useValidationHook from "../../../hooks/validation-hook";
import validator from "validator";

type FieldEditionFormProps = {
    field: Field;
    onClose: (event: MouseEvent<HTMLButtonElement>) => void;
    onUpdate: (field:Field) => void;
}

const FieldEditionForm: React.FC<FieldEditionFormProps> = (props) => {
    const {
        value: labelValue,
        isValid: labelIsValid,
        hasError: labelHasError,
        onChangeHandler: labelOnChangeHandler,
        onBlurHandler: labelOnBlurHandler,
        reset: labelReset
    } = useValidationHook(props.field.label, (value) => {
        return !validator.isEmpty(value);
    });

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        onChangeHandler: nameOnChangeHandler,
        onBlurHandler: nameOnBlurHandler,
        reset: nameReset
    } = useValidationHook(props.field.name, (value) => {
        return !validator.isEmpty(value);
    });

    const {
        value: tipValue,
        isValid: tipIsValid,
        hasError: tipHasError,
        onChangeHandler: tipOnChangeHandler,
        onBlurHandler: tipOnBlurHandler,
        reset: tipReset
    } = useValidationHook(props.field.tip, (value) => {
        return !validator.isEmpty(value);
    });
    
    const saveFieldHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(labelIsValid && nameIsValid && tipIsValid) props.onUpdate(props.field);

        labelReset();
        nameReset();
        tipReset();
    }

    const formEditionStructure = [
        {   
            id: 'fieldLabel', 
            name:'field_label', 
            label:'Label', 
            type:'text', 
            value:labelValue, 
            onChange:labelOnChangeHandler, 
            onBlur: labelOnBlurHandler, 
            hasError:labelHasError,
            errorMessage:'Label cannot be empty.'
        },
        { 
            id: 'fieldName', 
            name:'field_name', 
            label:'Name', 
            type:'text', 
            value:nameValue, 
            onChange:nameOnChangeHandler, 
            onBlur: nameOnBlurHandler, 
            hasError:nameHasError,
            errorMessage: 'Name can have only letters, numbers and underline symbols and cannot be empty.'
        },
        { 
            id: 'fieldTip', 
            name:'field_tip', 
            label:'Tip', 
            type:'text', 
            value:tipValue, 
            onChange:tipOnChangeHandler, 
            onBlur: tipOnBlurHandler, 
            hasError:tipHasError,
            errorMessage:''
        },
        { 
            id: 'fieldOptions', 
            name:'field_options', 
            label:'Options', 
            type:'text', 
            value:props.field.options.join(','), 
            onChange:labelOnChangeHandler, 
            onBlur: labelOnBlurHandler, 
            hasError:labelHasError,
            errorMessage:'Options cannot be empty.'
        },
        { 
            id: 'fieldMin', 
            name:'field_min', 
            label:'Min', 
            type:'text', 
            value:'', 
            onChange:labelOnChangeHandler, 
            onBlur: labelOnBlurHandler, 
            hasError:labelHasError,
            errorMessage:''
        },
        { 
            id: 'fieldMax', 
            name:'field_max', 
            label:'Max', 
            type:'text', 
            value:'', 
            onChange:labelOnChangeHandler, 
            onBlur: labelOnBlurHandler, 
            hasError:labelHasError,
            errorMessage:''
        },
    ];

    let finalFields = formEditionStructure;
    
    if(props.field.type === FieldTypesEnum.CHECKBOX_GROUP || props.field.type === FieldTypesEnum.RADIO_GROUP) {
        finalFields = formEditionStructure.filter( field => (field.id !== 'fieldMin' && field.id !== 'fieldMax' ));
    } else finalFields = formEditionStructure.filter( field => field.id !== 'fieldOptions');


    return <Box className={css['edition-form']} title='edition'>
        <div>            
            <div className={`${css['field-group']} ${css['required-field-group']}`}>
                <label htmlFor="fieldRequered">Required</label>
                <SwitchButton name="required" id="fieldRequered" />
            </div>

            { 
                finalFields.map(field => <FieldEditionInput
                    key={field.id}
                    type={field.type} 
                    id={field.id} 
                    name={field.name} 
                    label={field.label} 
                    value={field.value} 
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    errorMessage={field.errorMessage}
                    hasError={field.hasError}
                    className={css['field-group']} />)
            }

            <div className={`${css['field-group-row']} ${css.actions}`}>
                <button className={css.button} onClick={saveFieldHandler}>Save</button>
                <button className={`${css.button} ${css['button--secondary']}`} onClick={props.onClose}>Cancel</button>
            </div>
        </div>
    </Box>;
}

export default FieldEditionForm;
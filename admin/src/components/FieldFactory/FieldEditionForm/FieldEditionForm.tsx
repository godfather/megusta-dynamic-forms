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
        return (!validator.isEmpty(value) && validator.isAlphanumeric(value, 'en-US', { ignore: /[ -_,.!@$%&*]+/g}));
    });

    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        onChangeHandler: nameOnChangeHandler,
        onBlurHandler: nameOnBlurHandler,
        reset: nameReset
    } = useValidationHook(props.field.defaulName, (value) => {
        return (!validator.isEmpty(value) && validator.isSlug(value));
    });

    const {
        value: tipValue,
        isValid: tipIsValid,
        hasError: tipHasError,
        onChangeHandler: tipOnChangeHandler,
        onBlurHandler: tipOnBlurHandler,
        reset: tipReset
    } = useValidationHook(props.field.tip, (value) => {
        if(value) return validator.isAlphanumeric(value, 'en-US', { ignore: /[ -_,.!@$%&*:]+/g});
        return true;
    });

    const {
        value: minValue,
        isValid: minIsValid,
        hasError: minHasError,
        onChangeHandler: minOnChangeHandler,
        onBlurHandler: minOnBlurHandler,
        reset: minReset
    } = useValidationHook(props.field.min, (value) => {
        if(value) return validator.isNumeric(value);
        return true;
    });

    const {
        value: maxValue,
        isValid: maxIsValid,
        hasError: maxHasError,
        onChangeHandler: maxOnChangeHandler,
        onBlurHandler: maxOnBlurHandler,
        reset: maxReset
    } = useValidationHook(props.field.max, (value) => {
        if(value) return validator.isNumeric(value);
        return true;
    });

    const {
        value: optionsValue,
        isValid: optionsIsValid,
        hasError: optionsHasError,
        onChangeHandler: optionsOnChangeHandler,
        onBlurHandler: optionsOnBlurHandler,
        reset: optionsReset
    } = useValidationHook(props.field.options.join(','), (value) => {
        return true;
        // return !validator.isEmpty(value) && validator.isAlphanumeric(value, 'en-US', { ignore: /[ -_,.!@$%&*:]+/g});
    });
    
    const saveFieldHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(labelIsValid && nameIsValid && tipIsValid && minIsValid && maxIsValid && optionsIsValid) {
            const newField = new Field(
                props.field.type,
                labelValue,
                props.field.htmlType
            );

            newField.name = nameValue;
            newField.tip = tipValue;
            newField.position = props.field.position;
            newField.id = props.field.id;
            newField.min = minValue;
            newField.max = maxValue;
            newField.options = optionsValue.split(/[,;]/);


            props.onUpdate(newField);

            labelReset();
            nameReset();
            tipReset();
            minReset();
            maxReset();
            optionsReset();
            props.onClose(event);
        }
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
            errorMessage:'Some characters are not allowed!'
        },
        { 
            id: 'fieldOptions', 
            name:'field_options', 
            label:'Options', 
            type:'text', 
            value: optionsValue, 
            onChange:optionsOnChangeHandler, 
            onBlur: optionsOnBlurHandler, 
            hasError:optionsHasError,
            errorMessage:'Options cannot be empty and need to be separated by coma.'
        },
        { 
            id: 'fieldMin', 
            name:'field_min', 
            label:'Min', 
            type:'number', 
            value:minValue, 
            onChange:minOnChangeHandler, 
            onBlur: minOnBlurHandler, 
            hasError:minHasError,
            errorMessage:'Only numbers are allowed.'
        },
        { 
            id: 'fieldMax', 
            name:'field_max', 
            label:'Max', 
            type:'number', 
            value:maxValue, 
            onChange:maxOnChangeHandler, 
            onBlur: maxOnBlurHandler, 
            hasError:maxHasError,
            errorMessage:'Only numbers are allowed.'
        },
    ];

    let finalFields = formEditionStructure;
    
    if(props.field.type === FieldTypesEnum.CHECKBOX_GROUP || props.field.type === FieldTypesEnum.RADIO_GROUP) {
        finalFields = formEditionStructure.filter( field => (field.id !== 'fieldMin' && field.id !== 'fieldMax' ));
    } else if(props.field.type === FieldTypesEnum.CHECKBOX) {
        finalFields = formEditionStructure.filter( field => (field.id !== 'fieldMin' && field.id !== 'fieldMax' && field.id !== 'fieldOptions'));
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
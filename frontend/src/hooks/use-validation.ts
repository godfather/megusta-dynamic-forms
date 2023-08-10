import { ChangeEvent, useState } from "react";

type ValidationHookProps = {
    value: string;
    isValid: boolean;
    hasErrors: boolean;
    errors: string[];
    onChangeHandler: <T,>(event:ChangeEvent<T>) => void;
    onBlurHandler: () => void;
    reset: () => void;
}


const validateRequired = (value:string): boolean => {
    if(value.trim().length < 1) throw new Error('Field can not be empty!');
    return true;
}
const validateMax = (value:string, constraint:number): boolean => {
    if(value.trim().length > constraint) throw new Error('Max size exceeded');
    return true;
}

const validateMin = (value:string, constraint:number, required:boolean): boolean => {
    if(value.trim().length < 1 && !required) return true;
    if(value.trim().length < constraint) throw new Error('Value length is to small');
    return true;
}

const validateEmail = (value:string): boolean => {
    if(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(value.trim())) 
        throw new Error('Value length is to small');
    return true;
}


const useValidation = (initialValue:string, validationRules:string): ValidationHookProps  => {
    const [ value, setValue ] = useState<string>(initialValue);
    const [ isTouched, setIsTouched ] = useState<boolean>(false);
    const errors: string[] = [];
    const required = /required/.test(validationRules);


    const getValidations = (validationRules:string): { [key: string]: string | boolean } | null => {
        return validationRules.split(';').map(strRule => {
            if(/:/.test(strRule)) return strRule.split(':');
            return [ strRule, true ];
        }).reduce((accumulator: {[key: string]: string|boolean}, current) => {
            accumulator[current[0] as string] = current[1];
            return accumulator;
        }, {});
    }

    const checkIsValid = () => {
        const rules = getValidations(validationRules)!;

        Object.keys(rules).map(rule => {
            try {
                if(rule === 'required') validateRequired(value);
                if(rule === 'min') validateMin(value, parseInt(rules[rule] as string), required);
                if(rule === 'max') validateMax(value, parseInt(rules[rule] as string));
                if(rule === 'email') validateEmail(value);
            } catch(error) {
                let message = 'Unknown error!';
                if(error instanceof Error) message = error.message;
                errors.push(message);
            }
        });

        if(isTouched && errors.length > 0) {
            // setErrors(errors);
            console.log(errors);
            return false;
        }

        return true;
    }

    const onChangeHandler = <T,>(event:ChangeEvent<T>) => {
        const target = event.target as any;
        setValue(target.value);
    }

    const onBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setValue('');
        setIsTouched(false);
    }

    const isValid = checkIsValid();
    const hasErrors = !isValid && isTouched;

    return {
        value, 
        isValid, 
        hasErrors,
        errors,
        onChangeHandler,
        onBlurHandler,
        reset
    };
}

export default useValidation;

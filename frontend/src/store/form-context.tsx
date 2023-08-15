import React, { PropsWithChildren, useState } from "react";
import { FormRegistrationFields, FromContextType } from "../types";
import validate from "../hooks/use-validation2";

export const FormContext = React.createContext<FromContextType>({
    formId:null,
    fields:[],
    formValid: false,
    setFormId: (formId:number) => {},
    add: (values:FormRegistrationFields, rules:string) => {},
    get: (fieldId: number): FormRegistrationFields | undefined => { return },
    submit: () => {},
});

const FormContextPorvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ formId, setFormId ] = useState<number|null>(null);
    const [ fields, setFields ] = useState<FormRegistrationFields[]>([]);
    let formValid:boolean = false;

    const addValueHandler = (value: FormRegistrationFields, rules:string) => {
        value.validation = validate(value.field_value, rules);
        console.log(value)
        setFields(state => {
            const newState = [...state];
            const exists = newState.findIndex(val => val.field_id === value.field_id);
            if(exists > -1) newState.splice(exists, 1, value);
            else newState.push(value);
            return newState;
        });
    }

    const getFieldValue = (fieldId: number): FormRegistrationFields|undefined => {
        return fields.find(item => item.field_id === fieldId);
    } 

    formValid = fields.length > 0 ? fields.every((field) => field.validation?.valid === true) : false;

    const submitFormHandler = () => {
        
        if(!formValid || fields.length === 0) return;
        console.log(formValid);
        console.log({
            form_id: formId,
            fields: fields
        });
    }
    
    const contextValues: FromContextType = {
        formId,
        fields,
        formValid,
        setFormId,
        add: addValueHandler,
        get: getFieldValue,
        submit: submitFormHandler,
    };

    return (
        <FormContext.Provider value={contextValues}>{children}</FormContext.Provider>
    )
}

export default FormContextPorvider;

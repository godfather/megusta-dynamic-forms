import React, { PropsWithChildren, useReducer, useState } from "react"
import Field, { FieldBaseType } from "../models/Field";

type StageContextType = {
    formTitle:string|null;
    formId:number|null;
    fields:Field[];
    addField:(field:FieldBaseType) => void;
    updateField:(field:Field) => void;
    removeField:(field:string) => void;
    sortFields: (field:string, currentPosition:number, newPosition:number) => void;
    updateFormTitle:(title:string) => void;
    updateFormId:(id:number) => void;
}

type sortItem = {
    fieldId:string;
    currentPosition:number;
    newPosition:number;
}

enum ActionEnum {
    ADD = 'ADD',
    UPDATE = 'UPDATE',
    REMOVE = 'REMOVE',
    SORT = 'SORT'
};


const fieldsReducer = (state:Field[], action: { type:ActionEnum, value?:Field|FieldBaseType|string|sortItem}) => {

    if(action.type === ActionEnum.ADD) {
        const newField = action.value! as FieldBaseType;
        return state.concat(new Field(newField.type, newField.label, newField.htmlType));
    }

    if(action.type === ActionEnum.REMOVE) {
        return state.filter(item => item.id !== action.value);
    }

    if(action.type === ActionEnum.SORT) {
        const value = action.value as sortItem;
        const _state = [...state];
        const draggedItemContent = _state.splice(value.currentPosition, 1)[0];
        _state.splice(value.newPosition, 0, draggedItemContent);
        _state.forEach((item, index) => item.position = index);
        return _state;
    }

    if(action.type === ActionEnum.UPDATE) {
        const newField = action.value! as Field;
        const _state = [...state];
        const currentFieldIndex = state.findIndex(item => item.id === newField.id);

        if(currentFieldIndex > -1) _state[currentFieldIndex] = newField;
        else _state.push(newField);

        return _state;
    }

    return [];
}


export const EditionContext = React.createContext<StageContextType>({
    formTitle:null,
    formId:null,
    fields:[],
    addField: (field:FieldBaseType) => {},
    updateField: (field:Field) => {},
    removeField: () => {},
    sortFields: (field:string, currentPosition:number, newPosition:number) => {},
    updateFormTitle: (title:string) => {},
    updateFormId: (id:number) => {} 
});

const EditionContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [ formTitle, setFormTitle ] = useState('Add Title');
    const [ formId, setFormId ] = useState<number|null>(null);

    const [ fieldsList, dispatchFieldsList ] = useReducer(fieldsReducer, []);

    const addFieldHandler = (fieldType: FieldBaseType) => {
        dispatchFieldsList({ type: ActionEnum.ADD, value: fieldType });
    }

    const removeFieldHandler = (fieldId:string) => {
        dispatchFieldsList({ type: ActionEnum.REMOVE, value: fieldId });
    }

    const sortFieldsHandler = (field:string, currentPosition:number, newPosition:number) => {
        dispatchFieldsList({ type:ActionEnum.SORT, value:{ 
            fieldId:field, 
            currentPosition, 
            newPosition
        }});
    }

    const updateFieldHandler = (field:Field, reset?:boolean) => {
        dispatchFieldsList({ type: ActionEnum.UPDATE, value:field });
    }

    const updateFormTitleHandler = (title: string) => {
        setFormTitle(title);
    }

    const updateFormIdHandler = (id: number) => {
        setFormId(id);
    }

    const contextValues: StageContextType = {
        formTitle:formTitle,
        formId:formId,
        fields:fieldsList,
        addField: addFieldHandler,
        updateField: updateFieldHandler,
        removeField: removeFieldHandler,
        sortFields: sortFieldsHandler,
        updateFormTitle: updateFormTitleHandler,
        updateFormId: updateFormIdHandler,
    };

    return (
        <EditionContext.Provider value={contextValues}>{props.children}</EditionContext.Provider>
    )
}


export default EditionContextProvider;

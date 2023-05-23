import React, { PropsWithChildren, useReducer } from "react"
import Field, { FieldBaseType } from "../models/Field";

type StageContextType = {
    formTitle:string|null;
    fields:Field[];
    addField:(field:FieldBaseType) => void;
    removeField:(field:string) => void;
    sortFields: (field:string, currentPosition:number, newPosition:number) => void;
}

type sortItem = {
    fieldId:string;
    currentPosition:number;
    newPosition:number;
}

enum ActionEnum {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    SORT = 'SORT'
};


const fieldsReducer = (state:Field[], action: { type:ActionEnum, value?:FieldBaseType|string|sortItem}) => {
    
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

    return [];
}


export const StageContext = React.createContext<StageContextType>({
    formTitle:null,
    fields:[],
    addField: (field:FieldBaseType) => {},
    removeField: () => {},
    sortFields: (field:string, currentPosition:number, newPosition:number) => {} 
});

const StageContextProvider: React.FC<PropsWithChildren> = (props) => {
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

    const contextValues: StageContextType = {
        formTitle:null,
        fields:fieldsList,
        addField: addFieldHandler,
        removeField: removeFieldHandler,
        sortFields: sortFieldsHandler,
    };

    return (
        <StageContext.Provider value={contextValues}>{props.children}</StageContext.Provider>
    )
}


export default StageContextProvider;

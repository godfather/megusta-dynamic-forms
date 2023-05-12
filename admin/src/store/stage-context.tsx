import React, { PropsWithChildren, useReducer } from "react"
import Field, { FieldBaseType } from "../models/Field";
import { type } from "os";

type StageContextType = {
    formTitle:string|null;
    fields:Field[];
    addField:(field:FieldBaseType) => void;
    removeField:(field:string) => void;
}

enum ActionEnum {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    SORT = 'SORT'
};


const fieldsReducer = (state:Field[], action: { type:ActionEnum, value?:FieldBaseType|string}) => {
    
    if(action.type === ActionEnum.ADD) {
        const newField = action.value! as FieldBaseType;
        return state.concat(new Field(newField.type, newField.label, newField.htmlType));
    }

    if(action.type === ActionEnum.REMOVE) {
        return state.filter(item => item.id !== action.value);
    }

    return [];
}


export const StageContext = React.createContext<StageContextType>({
    formTitle:null,
    fields:[],
    addField: (field:FieldBaseType) => {},
    removeField: () => {}
});

const StageContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [ fieldsList, dispatchFieldsList ] = useReducer(fieldsReducer, []);

    const addFieldHandler = (fieldType: FieldBaseType) => {
        dispatchFieldsList({ type: ActionEnum.ADD, value: fieldType });
    }

    const removeFieldHandler = (fieldId:string) => {
        dispatchFieldsList({ type: ActionEnum.REMOVE, value: fieldId });
    }

    const contextValues: StageContextType = {
        formTitle:null,
        fields:fieldsList,
        addField: addFieldHandler,
        removeField: removeFieldHandler
    };

    return (
        <StageContext.Provider value={contextValues}>{props.children}</StageContext.Provider>
    )
}


export default StageContextProvider;

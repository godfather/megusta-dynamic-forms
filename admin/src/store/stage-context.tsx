import React, { PropsWithChildren } from "react"

type StageContextType = {
    formTitle:string|null;
    fields:string[];
    addField:(field:string) => void;
    removeField:(field:string) => void;
}


export const StageContext = React.createContext<StageContextType>({
    formTitle:null,
    fields:[],
    addField: (field:string) => {},
    removeField: () => {}
});

const StageContextProvider: React.FC<PropsWithChildren> = (props) => {

    const addFieldHandler = (field:string) => {
        console.log(field);
    }

    const removeFieldHandler = (field:string) => {}

    const contextValues: StageContextType = {
        formTitle:null,
        fields:[],
        addField: addFieldHandler,
        removeField: removeFieldHandler
    };

    return (
        <StageContext.Provider value={contextValues}>{props.children}</StageContext.Provider>
    )
}


export default StageContextProvider;

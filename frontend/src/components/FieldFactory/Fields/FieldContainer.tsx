import { PropsWithChildren } from "react";

const FieldContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='field-container'>
            { children }
        </div>
    )
}

export default FieldContainer;
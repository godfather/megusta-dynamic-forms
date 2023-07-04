import { DragEvent, MouseEvent, PropsWithChildren, useState } from "react";
import css from './FieldEditionContainer.module.scss'
import FieldEditionForm from "./FieldEditionForm/FieldEditionForm";
import Field from "../../models/Field";

type FieldEditionContainerProps = {
    onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
    onDragStart: (event:DragEvent<HTMLDivElement>) => void;
    onDragOver: (event:DragEvent<HTMLDivElement>) => void;
    onDragEnter: (event:DragEvent<HTMLDivElement>) => void;
    onDragLeave: (event:DragEvent<HTMLDivElement>) => void;
    onDragEnd: (event:DragEvent<HTMLDivElement>) => void;
    onUpdate: (field:Field) => void;
    field: Field;
}

const FieldEditionContainer: React.FC<PropsWithChildren<FieldEditionContainerProps>> = (props) => {
    const [editionOpen, setEditionOpen] = useState(false);

    const openEditionHandler = (event:MouseEvent<HTMLButtonElement>) => setEditionOpen(lastState => !lastState);
    const closeEditionHandler = (event:MouseEvent<HTMLButtonElement>) => setEditionOpen(lastState => !lastState);

    return (
        <div
            className={css['edition-container']}
            draggable="true"
            onDragStart={props.onDragStart}
            onDragOver={props.onDragOver}
            onDragEnter={props.onDragEnter}
            onDragLeave={props.onDragLeave}
            onDragEnd={props.onDragEnd}>
            <div className={css.actions}>
                <button type="button" className={`${css.button} ${css['button-default']}`} onClick={openEditionHandler}>Edit</button>
                <button type="button" className={`${css.button} ${css['button-danger']}`} onClick={props.onRemove}>remove</button>
            </div>            
            { props.children }
            {editionOpen && <FieldEditionForm  onUpdate={props.onUpdate} field={props.field} onClose={closeEditionHandler} />}
        </div>
    )
}


export default FieldEditionContainer;
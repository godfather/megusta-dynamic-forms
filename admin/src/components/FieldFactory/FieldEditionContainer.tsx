import { DragEvent, MouseEvent, PropsWithChildren } from "react";
import css from './FieldEditionContainer.module.scss'

type FieldEditionContainerProps = {
    onRemove: (event: MouseEvent<HTMLButtonElement>) => void;
    onDragStart: (event:DragEvent<HTMLDivElement>) => void;
    onDragOver: (event:DragEvent<HTMLDivElement>) => void;
    onDragEnter: (event:DragEvent<HTMLDivElement>) => void;
    onDragLeave: (event:DragEvent<HTMLDivElement>) => void;
    onDragEnd: (event:DragEvent<HTMLDivElement>) => void;
}

const FieldEditionContainer: React.FC<PropsWithChildren<FieldEditionContainerProps>> = (props) => {
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
                <button className={`${css.button} ${css['button-default']}`}>Edit</button>
                <button className={`${css.button} ${css['button-danger']}`} onClick={props.onRemove}>remove</button>
            </div>            
            { props.children }
        </div>
    )
}


export default FieldEditionContainer;
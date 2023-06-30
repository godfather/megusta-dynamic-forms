import React, { ReactNode } from "react"

import css from './Button.module.scss';
import { FieldTypesEnum } from "../../FieldFactory/FieldFactory";

export enum ButtonStyle {
    DEFAULT = 'default', 
    HIGHLIGHTED = 'highlighted',
    BIG_DEFAULT = 'big-default',
    BIG_HIGHLIGHTED = 'big-highlighted',
}


const Button: React.FC<{
    children?:ReactNode, 
    type:FieldTypesEnum,
    style?:ButtonStyle, 
    clickHandler:() => void }> = (props) => {
    
        const onClickHandler = () => {
            props.clickHandler();
        } 

        const cssClasses = props.style ? 
            `${css.button} ${css['button--' + props.style]}` : 
            `${css.button} ${css['button--default']}`;

        return(
            <button type="button" className={cssClasses} onClick={onClickHandler}>{props.children}</button>
        )
}

export default Button;
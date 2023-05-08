import React, { ReactNode } from "react"

import css from './Button.module.scss';

export enum ButtonType {
    DEFAULT = 'default', 
    HIGHLIGHTED = 'highlighted',
    BIG_DEFAULT = 'big-default',
    BIG_HIGHLIGHTED = 'big-highlighted'
}


const Button: React.FC<{children?:ReactNode, type?:ButtonType, clickHandler:() => void}> = (props) => {
    const onClickHandler = (event: React.FormEvent) => {
        event.preventDefault();
        props.clickHandler();
    }

    const cssClasses = props.type ? 
        `${css.button} ${css['button--' + props.type]}` : 
        `${css.button} ${css['button--default']}`;

    return(
        <button className={cssClasses} onClick={onClickHandler}>{props.children}</button>
    )
}

export default Button;
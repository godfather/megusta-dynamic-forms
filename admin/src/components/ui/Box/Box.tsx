import React from 'react';
import css from './Box.module.scss';
import { Props } from '../../../models/Props.types';

const Box: React.FC<{children:React.ReactNode, className?:string, title?:string }> = (props) => {
    const cssClasses = `${css.box} ${props.className}`;
    
    return (
        <div className={cssClasses}>
            { props.title && <h2 className={css['box__title']}>{props.title}</h2> }
            <div className={css['box__container']}>{ props.children }</div>
        </div>
    );
}

export default Box;
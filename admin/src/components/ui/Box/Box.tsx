import React from 'react';
import css from './Box.module.scss';
import { Props } from '../../../models/Props.types';

const Box: React.FC<{children:React.ReactNode, className?:string }> = (props) => {
    const cssClasses = `${css.box} ${props.className}`
    return (
        <div className={cssClasses}>
            { props.children }
        </div>
    );
}

export default Box;
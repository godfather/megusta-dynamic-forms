import React from 'react';
import css from './Box.module.css';
import { Props } from '../../models/Props.types';

const Box: React.FC<Props> = (props) => {
    return <div className={css.box}>{ props.children }</div>
}

export default Box;
import React, { MouseEvent } from 'react';
import css from './StatusBar.module.scss';

export enum StatusBarTypeEnum {
    SUCCESS = 'success',
    ERROR = 'error',
    ALERT = 'alert'
}

type StatusBarProps = {
    type: StatusBarTypeEnum;
    message: string;
    onClick: (event:MouseEvent<HTMLSpanElement>) => void;
}

const StatusBar: React.FC<StatusBarProps> = (props) => {
    return (
        <div style={{ backgroundImage: `url('/exclamation-circle.svg')` }}className={`${css.status} ${css['status__' + props.type]}`}>
            <p>{props.message}</p>
            <span className={css['status__close']} onClick={props.onClick} >&nbsp;</span>
        </div>
    )
}

export default StatusBar;
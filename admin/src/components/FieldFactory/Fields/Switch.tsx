import React, { ChangeEvent } from 'react';
import css from './Fields.module.scss';

type SwitchButtonProps = { 
    className?: string;
    name: string; 
    id: string;
    checked:boolean;
    onChange:(event:ChangeEvent<HTMLInputElement>) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = (props) => {
    console.log(props.checked);
    return (

        <label className={`${css.switch} ${props.className}`}>
            <input 
                type='checkbox' 
                name={props.name} 
                id={props.id}
                checked={props.checked}
                onChange={props.onChange} />
            <span className={css.slider} />
        </label>
    );
}

export default SwitchButton;
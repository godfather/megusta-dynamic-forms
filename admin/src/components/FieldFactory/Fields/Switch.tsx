import React from 'react';
import css from './Fields.module.scss';

const SwitchButton: React.FC<{ name: string, id: string }> = (props) => {
    return (

        <label className={css.switch}>
            <input type='checkbox' name={props.name} id={props.id}/>
            <span className={css.slider} />
        </label>
    );
}

export default SwitchButton;
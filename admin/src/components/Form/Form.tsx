import React from "react";
import { Props } from "../../models/Props.types";

import css from './Form.module.scss';

const Form = () => {
    return (
        <form className={css.form}>
            <div className={css['form__controller']}>
                <input type="text" name="title" id="title" placeholder="Add Title"/>
            </div>
        </form>
    )
}

export default Form;
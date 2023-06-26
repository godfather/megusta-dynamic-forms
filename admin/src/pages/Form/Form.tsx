import React, { PropsWithChildren } from 'react';
import css from './Form.module.scss';
import buttonCss from '../../components/ui/Button/Button.module.scss';

const Form: React.FC<PropsWithChildren> = (props) => {
    const submitHandler = (event:React.FormEvent) => {
        event.preventDefault();
    }

    return (
        <form className={css.form} onSubmit={submitHandler}>
            <div className={css['form__controller']}>
                <input type="text" name="title" id="title" placeholder="Add Title"/>
            </div>
            <div className={css['form__content']}>
                {props.children}
            </div>
            <div className={css['form__buttons']}>
                <button type='submit' className={`${buttonCss.button} ${buttonCss['button--highlighted']}`}>Enviar</button>
            </div>
        </form>
    )
}

export default Form;
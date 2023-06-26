import React, { ChangeEvent, PropsWithChildren, useContext } from 'react';
import css from './Form.module.scss';
import buttonCss from '../../components/ui/Button/Button.module.scss';
import { EditionContext } from '../../store/edition-context';

const Form: React.FC<PropsWithChildren> = (props) => {
    const editionContext = useContext(EditionContext);

    const submitHandler = (event:React.FormEvent) => {
        event.preventDefault();
    }

    const onTitleChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        editionContext.updateFormTitle(event.target.value);
    }

    return (
        <form className={css.form} onSubmit={submitHandler}>
            <div className={css['form__controller']}>
                <input type="text" name="title" id="title" onChange={onTitleChangeHandler} value={editionContext.formTitle!} placeholder="Add Title"/>
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
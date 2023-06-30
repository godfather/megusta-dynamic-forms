import React, { ChangeEvent, FormEvent, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import css from './Form.module.scss';
import buttonCss from '../../components/ui/Button/Button.module.scss';
import { EditionContext } from '../../store/edition-context';
// import useApi, { RequestTypeEnum } from '../../hooks/api-hook';

type FormProps = {
    onSubmit: (event:FormEvent) => void;
    isLoading: boolean;
}

const FormOverlay: React.FC<{isLoading:boolean}> = React.memo((props) => {
    console.log('props.isLoading: ' + props.isLoading);
    return (
        <>
        {props.isLoading && <div className={css.overlay}>
            <div className={css['overlay__bg']}></div>
            <span>Saving...</span>
        </div>}
        </>
    );
});


const Form: React.FC<PropsWithChildren<FormProps>> = (props) => {
    const editionContext = useContext(EditionContext);
    const { isLoading } = props;
    const loading = useMemo(() => isLoading, [isLoading]);


    // const { isLoading, error, sendRequest } = useApi();

    // const submitHandler = useCallback((event:React.FormEvent) => {
    //     event.preventDefault();

    //     const bodyData = {
    //         name: editionContext.formTitle,
    //         fields: editionContext.fields.map(field => field.toJson())
    //     };

    //     sendRequest({
    //         url: 'http://local.woo.com/wp-json/mdf/v1/forms/',
    //         body: bodyData,
    //         method: RequestTypeEnum.POST,
    //         headers: { 'Content-Type': 'application/json'}
    //     }, (data) => {
    //         console.log(JSON.stringify(data));
    //     })
    // }, []);

    const onTitleChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        editionContext.updateFormTitle(event.target.value);
    }

    return (
        <>
        <form className={css.form} onSubmit={props.onSubmit}>
            <div className={css['form__controller']}>
                <input type="text" name="title" id="title" onChange={onTitleChangeHandler} value={editionContext.formTitle!} placeholder="Add Title"/>
            </div>
            <div className={css['form__content']}>
                
                <FormOverlay isLoading={loading} />
                {props.children}
            </div>
            <div className={css['form__buttons']}>
                <button type='submit' className={`${buttonCss.button} ${buttonCss['button--highlighted']}`}>Enviar</button>
            </div>
        </form>
        </>
    )
}

export default Form;
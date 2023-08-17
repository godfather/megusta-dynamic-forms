import { PropsWithChildren } from 'react';
import css from './Label.module.scss';

type LabelPropsType = { 
    text:string; 
    htmlId?:string; 
    required?:boolean 
};

const Label: React.FC<PropsWithChildren<LabelPropsType>> = ({ text, required, children, htmlId }) => {
    const requiredStar = required ? <span className={css['mdf__label--required']}>*</span> : '';
    return (
        <label className={css['mdf__label']} htmlFor={htmlId} >
            {text}{requiredStar}
            {children}
        </label>
    )
}

export default Label;
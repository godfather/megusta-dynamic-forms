import { PropsWithChildren } from "react";
import css from './Field.module.scss';

const FieldContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={css['mdf__container']}>
            { children }
        </div>
    )
}

export default FieldContainer;
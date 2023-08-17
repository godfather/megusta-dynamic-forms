import { PropsWithChildren } from "react";
import css from './Box.module.scss';

const Box: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={css['mdf-box']}>
            {children}
        </div>
    )
}

export default Box;
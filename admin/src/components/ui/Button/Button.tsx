import React from "react"
import { Props } from "../../../models/Props.types"

import css from './Button.module.scss';

const Button: React.FC<Props> = (props) => {
    return(
        <button className={css.button}>{props.children}</button>
    )
}

export default Button;
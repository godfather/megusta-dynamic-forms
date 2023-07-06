import { NavLink } from 'react-router-dom';
import css from './Navbar.module.scss';

const Navbar = () => {
    return(
        <ul className={css.nav}>
            <li className={css['nav__item']}>
                <NavLink to="?page=mdf&action=list" className={css['nav__link']}>All Forms</NavLink>
            </li>
            <li className={css['nav__item']}>
                <NavLink to="?page=mdf&action=edit" className={css['nav__link']}>Create Form</NavLink>
            </li>
        </ul>
    )
}

export default Navbar;
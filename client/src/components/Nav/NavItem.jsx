import { NavLink } from 'react-router-dom';


const NavItem = (props) => {
    return (
        <li className="navItem">
            <NavLink exact className="navLink" activeClassName="active" to={props.linkAddress} >
                {props.iconSvg}
                <span className="linkText">{props.linkText}</span>
            </NavLink>
        </li>
    );
}

export default NavItem;
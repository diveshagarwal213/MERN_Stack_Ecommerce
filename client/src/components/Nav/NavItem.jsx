import { homeSvg } from './NavSvgs'
import { Link, NavLink } from 'react-router-dom';

//Name, link
{/* <li className="navItem">
    <a className="navLink">
        {homeSvg}
        <span className="linkText">Home</span>
    </a>
</li> */}

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
import './Nav.css'
import { navSvg , homeSvg, shopSvg, userProfileSvg } from './NavSvgs'
import { Link  } from 'react-router-dom';
import NavItem from './NavItem'

const Nav = () => {
  return (
    <>
      <nav id="navbar">
        <ul id="navbarNav" >
          <li className="logo" >
            <Link to="/" className="navLink">
              <span className="linkText logoText">CityCake</span>
              {navSvg}
            </Link>
          </li>

          <NavItem linkText="Home" linkAddress="/" iconSvg={homeSvg}/>
          <NavItem linkText="Shop" linkAddress="/shop" iconSvg={shopSvg}/>
          <NavItem linkText="Cart" linkAddress="/usercart" iconSvg={userProfileSvg}/>
          <NavItem linkText="User" linkAddress="/userprofile" iconSvg={userProfileSvg}/>

          

        </ul>
        {/* <NavLink exact activeClassName="active" to='/' >Home </NavLink>
        <NavLink exact activeClassName="active" to='/shop' >Shop </NavLink>
        <NavLink exact activeClassName="active" to='/userprofile' >User </NavLink> */}
      </nav>
    </>
  )
}

export default Nav;
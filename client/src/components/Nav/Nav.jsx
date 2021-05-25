import './Nav.css'
import { navSvg , homeSvg, shopSvg, userProfileSvg } from './NavSvgs'
import NavItem from './NavItem'

const Nav = () => {
  return (
    <>
      <nav id="navbar">
        <ul id="navbarNav" >
          <li className="logo" >
            <a  className="navLink">
              <span className="linkText logoText">CityCake</span>
              {navSvg}
            </a>
          </li>

          <NavItem linkText="Home" linkAddress="/" iconSvg={homeSvg}/>
          <NavItem linkText="Shop" linkAddress="/shop" iconSvg={shopSvg}/>
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
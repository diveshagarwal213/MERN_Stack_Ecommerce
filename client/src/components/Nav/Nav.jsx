//import './Nav.css'
import './nav.scss'
import { navSvg , homeSvg, shopSvg, userProfileSvg, basketSvg, adminSvg } from './NavSvgs'
import { Link ,NavLink } from 'react-router-dom';
import NavItem from './NavItem'
import { useContext, useEffect, useState } from 'react';
import { rootUserData } from '../../utils/ClientOther';
import {CartContext} from '../../App';


const Nav = () => {
  const cartContext = useContext(CartContext);
  const cartitems = cartContext.cartState;
  const user = rootUserData(true);
  const [isAdmin, setIsAdmin] = useState(false); 
  
  useEffect(()=>{
    if(user){
      if(user.role === "ADMIN"){
        setIsAdmin(true);
      }
    }
  },[]);
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

          <li className="navItem">
            <NavLink exact className="navLink" activeClassName="active" to='/usercart' >
              <div className='cart_lengthDiv'>
                {basketSvg}
                {cartitems.length !== 0 && (<span className='cart_length' >{cartitems.length}</span>)}
                
              </div>
                <span className="linkText">Cart</span>
            </NavLink>
          </li>
          {isAdmin  ? (<NavItem linkText="Admin" linkAddress="/admin1" iconSvg={adminSvg}/>) : ("")}

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
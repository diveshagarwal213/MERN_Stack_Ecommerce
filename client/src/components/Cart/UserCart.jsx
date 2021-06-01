import './Cart.scss'
import CartProducts from "./CartProductCard";


const UserCart = () => {
    
    return (
        <div id='user_cart'>
            <h1>this is user cart</h1>
            <CartProducts />
        </div>
    )
};

export default UserCart;
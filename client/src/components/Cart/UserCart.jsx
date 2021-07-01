import './Cart.scss'
import CartProducts from "./CartProductCard";
import { withRouter } from 'react-router';

const UserCart = () => {
    
    return (
        <div id='user_cart'>
            <CartProducts />
        </div>
    )
};

export default withRouter(UserCart);
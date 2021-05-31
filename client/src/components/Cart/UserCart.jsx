import { useContext } from 'react';
import { CartContext } from '../../App'
import CartProducts from "./CartProductCard";


const data = {
    id: 0,
    name: "example ",
    image: "https://source.unsplash.com/NyQwVPacW00",
    price: "200"
}

const UserCart = () => {
    //console.log(products);
    const cartContext = useContext(CartContext);
    return (
        <div>
            <h1>this is user cart</h1>
            <CartProducts />
            <button onClick={() => cartContext.cartDispatch({ type: 'onAdd', product: data})} >add</button>
            <button onClick={() => cartContext.cartDispatch({ type: 'onRemove', product: data})} >remove</button>
        </div>
    )
};

export default UserCart;
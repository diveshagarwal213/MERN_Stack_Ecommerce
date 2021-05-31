import { useContext, useEffect, useState } from "react";
import {CartContext} from '../../App'


const CartProductCard =  (props) => {
    const { product } = props
    return(
        <div className='cartP_card'>
            <div className='cartP_card_img' style={{backgroundImage: `url('${product.image}')`}} ></div>
            <div className='cartP_card_content'>
                <h2>{product.name}</h2>
                <h2>{product.price}</h2>
                <h2>{product.qty}</h2>
            </div>
        </div>
    );
};

const CartProducts =  () => {
    const cartContext = useContext(CartContext)
    const  products = cartContext.cartState
    console.log(products);
    return(
        <div>
            {products.map( product => (
              <CartProductCard key={product.id} product={product}  />
            ))}
        </div>
    )
};

export default CartProducts;
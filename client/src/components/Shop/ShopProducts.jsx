import {ProductCard} from '../Product/Product';

const ShopProducts =  props => {
    const {data} = props;

    return(
        <div id="shop_products" >
            {data.map( product => (
              <ProductCard key={product.pid} product={product} />
            ))}
        </div>
    )
};

export default ShopProducts;
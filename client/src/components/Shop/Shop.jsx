import './Shop.scss';
import ShopProducts from './ShopProducts';

// custom hooks
import useDocTitle from "../../hooks/useDocTitle";

//example data
import {Productdata} from '../../data';


const Shop = () => {

    useDocTitle('Shop |');

    return(
        <>
            <h1>this is Shop  </h1>
            <ShopProducts data={Productdata}  />
        </>
    );
};

export default Shop;
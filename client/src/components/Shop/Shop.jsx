import { useEffect, useReducer, useState } from 'react';
import './Shop.scss';
import ShopProducts from './ShopProducts';
import { toast } from "react-toastify";
import axios from "axios";
import shopProductReducer from "../../reducers/ShopProductReducer";

// custom hooks
import useDocTitle from "../../hooks/useDocTitle";


const SearchProduct =  () => {
    const [search , setsearch] = useState('');

    const searchHandler = () => {
        console.log(search);
    }

    return(
        <div id='search_product'>
            <input type="text" value={search} name='keyword' placeholder='Enter Name or Id' onChange={(e) => setsearch(e.target.value)} />
            <button onClick={ searchHandler }>search</button>
            <br />
        </div>
    )
};

const initialState = {
    loading: true,
    error:'',
    productdata:[]
}

const Shop = () => {

    useDocTitle('Shop |');

    const [poductDataState , productDataDispatch ] = useReducer(shopProductReducer,initialState);

    const fetchdata = async (pageno = 1) => {
         try {
            const result = await axios.get(`http://localhost:5000/public/products?page=${pageno}`);
            const products = result.data.products
            const shopProducts = products.map(row => {return { pid : row._id ,...row}});
            //console.log(shopProducts);
            productDataDispatch({
                type: 'FETCH_UP',
                data: shopProducts
            });
            
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error.message)
           }else{
               toast.error(error.message,{
                   position: toast.POSITION.TOP_CENTER,
                   autoClose: false
               })
           }
            productDataDispatch({
                type: 'FETCH_DOWN',
            })
        } 
        
    }
    useEffect(() => {
        fetchdata();
    },[]) 

    return(
        <>
            <h1>this is Shop  </h1>
            <SearchProduct/>
            { poductDataState.loading ? (<h1>loading</h1>) : (<ShopProducts data={poductDataState.productdata}  />) }
        </>
    );
};

export default Shop;
import { useState } from 'react';
import './Shop.scss';
import ShopProducts from './ShopProducts';

// custom hooks
import useDocTitle from "../../hooks/useDocTitle";

//example data
import {Productdata} from '../../data';

const SearchProduct =  () => {
    const [search , setsearch] = useState({
        keyword:'',
        catgry: []
    });

    const inputEvent = (e) => {
        const {name , value} = e.target;
        setsearch((preValue)=>{
            //console.log(preValue);
            return{
                ...preValue,
                [name]: value,
            }
        });
    };

    const searchHandler = () => {
        console.log(search);
    }

    return(
        <div id='search_product'>
            <input type="text" value={search.keyword} name='keyword' placeholder='Enter Name or Id' onChange={inputEvent} />
            <button onClick={searchHandler}>search</button>
            <br />
        </div>
    )
};


const Shop = () => {

    useDocTitle('Shop |');

    return(
        <>
            <h1>this is Shop  </h1>
            <SearchProduct/>
            <ShopProducts data={Productdata}  />
        </>
    );
};

export default Shop;
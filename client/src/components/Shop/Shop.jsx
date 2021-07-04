import {  useContext, useState } from 'react';
import './Shop.scss';
import ShopProducts from './ShopProducts';
//import shopProductReducer from "../../reducers/ShopProductReducer";
import LoadingComponent from '../../utils/LoadingComponent';
import FetchProducts from '../../utils/FetchProducts';
import ShopSideBar from './ShopSideBar';

// custom hooks
import useDocTitle from "../../hooks/useDocTitle";

//context
import { CartContext } from '../../App';



const Shop = () => {

    useDocTitle('Shop |');

    const ShopContext = useContext(CartContext);
    const {ShopProductDispatch, ShopProductsState} = ShopContext;
    
    const loadMore = () => {
        let Page = ShopProductsState.nextPage ;
        fetchdata(Page,true); 
    }

    const fetchdata = async (pageno = 1 , Add = false) => {
        
        const result = await FetchProducts(null,3,pageno);

        if(result){

            if(Add){
                ShopProductDispatch({
                    type: 'ADD_PRODUCTS',
                    data: result
                });
            }else{
                ShopProductDispatch({
                    type: 'SET_NEW_PRODUCTS',
                    data: result
                });
            }
            
        }else{
            ShopProductDispatch({
                type: 'FETCH_DOWN',
            });
        } 
    }
    
    return(
        <div id="shop">
            <h1>Shop</h1>
            <div id="shop_main" >
                <div id="main_side">
                    <ShopSideBar  fetchData ={fetchdata}  />
                </div>
                <div id="main_center">
                    {ShopProductsState.loading ? (
                        ShopProductsState.error ? (<LoadingComponent message="Somthing went Wrong" />) : (<LoadingComponent />)
                    ) : (<ShopProducts data={ShopProductsState.productdata} />)}

                    {ShopProductsState.hasNext ? (<button className="load_more_button" onClick={() => loadMore()} >Load More</button>) : (<h3 className="load_more_button">Oops! No More Products</h3>)}
                </div>
            </div>
        </div>
    );
};

export default Shop;
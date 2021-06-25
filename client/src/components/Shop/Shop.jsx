import { useEffect, useReducer, useState } from 'react';
import './Shop.scss';
import ShopProducts from './ShopProducts';
import shopProductReducer from "../../reducers/ShopProductReducer";
import LoadingComponent from '../../utils/LoadingComponent';
import FetchProducts from '../../utils/FetchProducts';
import ShopSideBar from './ShopSideBar';

// custom hooks
import useDocTitle from "../../hooks/useDocTitle";

const initialState = {
    loading: true,
    error:'',
    productdata:[],
    hasNext:true
}

const Shop = () => {

    useDocTitle('Shop |');

    const [productDataState , productDataDispatch ] = useReducer(shopProductReducer,initialState);
    const [currentPage, setCurrentPage] = useState(1);
    //let [hasNext, sethasNext] = useState(true);
    
    const loadMore = () => {
        let Page = currentPage + 1 ;
        fetchdata(Page,true);
        setCurrentPage(Page); 
    }

    const LoadMoreState = (value = false) => {
        productDataDispatch({
            type: 'HASNEXT',
            data: value
        });
    }

    const fetchdata = async (pageno = 1, Add = false) => {
        const result = await FetchProducts(null,3,pageno);
        if(result){
            const products = result.data.products
            const shopProducts = products.map(row => {return { pid : row._id ,...row}});
            
            if(result.data.next){
                LoadMoreState(true);
            }else{
                LoadMoreState();
            }

            if(Add){
                productDataDispatch({
                    type: 'ADD_ON',
                    data: shopProducts
                });
            }else{
                productDataDispatch({
                    type: 'FETCH_UP',
                    data: shopProducts
                });
            }
            
        }else{
            productDataDispatch({
                type: 'FETCH_DOWN',
            });
        } 
    }
    useEffect(() => {
        fetchdata();
    },[]) 

    return(
        <div id="shop">
            <h1>Shop</h1>
            <div id="shop_main" >
                <div id="main_side">
                    <ShopSideBar productDataDispatch={productDataDispatch} fetchData ={fetchdata} />
                </div>
                <div id="main_center">
                    {productDataState.loading ? (
                        productDataState.error ? (<LoadingComponent message="Somthing went Wrong" />) : (<LoadingComponent />)
                    ) : (<ShopProducts data={productDataState.productdata} />)}

                    {productDataState.hasNext ? (<button className="load_more_button" onClick={() => loadMore()} >Load More</button>) : (<h3 className="load_more_button">Oops! No More Products</h3>)}
                </div>
            </div>
        </div>
    );
};

export default Shop;
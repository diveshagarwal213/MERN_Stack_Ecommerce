import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchProductByName, {SearchByCatAndFlav} from "../../utils/FetchSearchProduct";
import axios from "axios";
import ApiErrorHandler, { ArrayToString } from "../../utils/ClientOther";

import { CartContext } from '../../App';

const ShopSideBar =  (props) => {

    const ShopContext = useContext(CartContext);
    const {ShopProductDispatch , ShopProductsState, appDataDispatch, appDataState} = ShopContext;
    const {defaultCategories, defaultFlavors } = appDataState;
    const { fetchData } = props; //function

    const [search , setsearch] = useState('');
    const [catarr, setcatarr] = useState([]);
    const [flavarr, setflavarr] = useState([]);
    
    const fetchCategories = async () => {
        try {
            const result = await axios.get(`/public/alldistinctcategories?&fav=true`);
            if(result){
                appDataDispatch({
                    type : "SET_CAT_AND_FLAV",
                    data: {
                        Categories: result.data.categories,
                        Flavors: result.data.flavors
                    }
                })
            }
        } catch (error) {
            ApiErrorHandler(error);
        }
    }

    const searchHandler = async ( search) => {

        if(search.length >= 3 ){
            const result = await SearchProductByName(search);
            if(result){
                ShopProductDispatch({
                    type: 'SET_NEW_PRODUCTS',
                    data: result
                });
            }
        }else{
            toast.warning("type at least 3 words");
        }
    }

    const CatOrFlaHandler = async () => {
        let cat, flav;
        if(catarr.length > 0) cat = ArrayToString(catarr);
        if(flavarr.length > 0) flav = ArrayToString(flavarr);

        
        if(cat || flav){
            const result = await SearchByCatAndFlav(cat, flav);
            if(result){
                ShopProductDispatch({
                    type: 'SET_NEW_PRODUCTS',
                    data: result
                });
            }/* else{
                console.log("empty");
            } */
        }else{
            //fetchData();
        }
        

    }

    const CatOrflav = (keyword, flav = false) => {
        if(flav){
            let n = flavarr.includes(keyword);
            if(n){
                n = [...flavarr];
                let  index = n.indexOf(keyword);
                n.splice(index, 1);
            }else{
                n = [...flavarr, keyword]
            } 
            setflavarr(n);

        }else{
            
            let n = catarr.includes(keyword);
            if(n){//remove
                n = [...catarr];
                let  index = n.indexOf(keyword);
                n.splice(index, 1);//return deleted value
            }else{//add
                n = [...catarr, keyword]
            } 
            setcatarr(n);
        }
    }; 
    
    useEffect(()=>{
        CatOrFlaHandler();
    },[catarr, flavarr])

    const resetShop = () =>{
        setcatarr([]);
        setflavarr([]);
        setsearch("");
        fetchData();
    }

    useEffect(() => {
        if(defaultCategories.length <= 0){
            //console.log("hi");
            fetchCategories();
        } 
        if(!ShopProductsState.productdata.length > 0){
            //console.log("empty");
            fetchData();
        }
    },[])

    const filterBtn = () => {
        const filterDiv = document.getElementById("filter_div");
        if (filterDiv.style.display === "block") {
            filterDiv.style.display = "none";
        } else {
            filterDiv.style.display = "block";
        }
    }

    return(
        <div id="shop_side_bar">
            <div id='shop_search_product'>
                <input type="text" value={search} name='keyword' placeholder='Name' onChange={(e) => setsearch(e.target.value)} />
                <button onClick={() => searchHandler(search)}>Search</button>
            </div>

            <button onClick={()=> resetShop() } >Reset Shop</button>
            <button className="filter_btn" onClick={filterBtn} >Filter</button>
            
            <div id="filter_div">
                
                <h3>Select Categories</h3>
                
                <div className="default_categories">
                    {defaultCategories.map(n => (<button key={n} onClick={() => CatOrflav(n)}>{n}</button>))}
                </div>
                
                <h3>Select Flavors</h3>
                
                <div className="default_categories" >
                    {defaultFlavors.map(n => (<button key={n} onClick={() => CatOrflav(n, true)}>{n}</button>))}
                </div>
            </div>
            
            <div id="user_selected_Categories">
                {catarr.map(n => (<button key ={n} onClick={() => CatOrflav(n)} > {n} X </button> ) )}
                {flavarr.map(n => (<button key ={n} onClick={() => CatOrflav(n,true)} > {n} X </button> ) )}
            </div>
        </div>
    );
};

export default ShopSideBar;
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchProductByName, {SearchByCatAndFlav} from "../../utils/FetchSearchProduct";
import axios from "axios";
import { ArrayToString } from "../../utils/ClientOther";
import ApiErrorHandler from '../../utils/ClientOther';

const ShopSideBar =  (props) => {

    const {productDataDispatch, fetchData} = props;

    const [search , setsearch] = useState('');
    const [catarr, setcatarr] = useState([]);
    const [flavarr, setflavarr] = useState([]);
    const [defaultCategories, setCategories] = useState([]);
    const [defaultFlavors, setFlavors] = useState([]);

    const fetchCategories = async () => {
        try {
            const result = await axios.get(`http://${window.location.hostname}:5000/public/alldistinctcategories?&fav=true`);
            if(result){
                let Categories  = result.data.categories
                let flavors  = result.data.flavors
                setCategories(Categories);
                setFlavors(flavors);
            }
        } catch (error) {
            ApiErrorHandler(error);
        }
    }

    const searchHandler = async ( search) => {

        if(search.length >= 3 ){
            const result = await SearchProductByName(search);
            if(result){
                const products = result.data.products
                const shopProducts = products.map(row => {return { pid : row._id ,...row}});
                productDataDispatch({
                    type: 'FETCH_UP',
                    data: shopProducts
                });
                productDataDispatch({
                    type: 'HASNEXT',
                    data: false
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
                const products = result.data.products
                const shopProducts = products.map(row => {return { pid : row._id ,...row}});
                productDataDispatch({
                    type: 'FETCH_UP',
                    data: shopProducts
                });
                productDataDispatch({
                    type: 'HASNEXT',
                    data: false
                });
            }/* else{
                console.log("empty");
            } */
        }else{
            fetchData();
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
        //fetchData();
    }

    useEffect(() => {
        fetchCategories()
    },[])

    return(
        <div id="shop_side_bar">
            <div id='shop_search_product'>
                <input type="text" value={search} name='keyword' placeholder='Name' onChange={(e) => setsearch(e.target.value)} />
                <button onClick={() => searchHandler(search)}>Search</button>
            </div>
                <button onClick={()=> resetShop() } >Reset Shop</button>
            <div id="default_categories">
                <h3>Select Categories</h3>
                { defaultCategories.map(n => (<button key={n} onClick ={() => CatOrflav(n)}>{n}</button>)) }
                
                {catarr.length < 2 ? (
                    <>
                    <h3>Select Flavors</h3>
                    { defaultFlavors.map(n => (<button key={n} onClick ={() => CatOrflav(n,true)}>{n}</button>)) }
                    </>

                ) : ("") }

            </div>
            <div id="user_selected_Categories">
                {catarr.map(n => (<button key ={n} onClick={() => CatOrflav(n)} > {n} X </button> ) )}
                {flavarr.map(n => (<button key ={n} onClick={() => CatOrflav(n,true)} > {n} X </button> ) )}
            </div>
        </div>
    );
};

export default ShopSideBar;
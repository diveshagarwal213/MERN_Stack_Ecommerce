import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createContext, useReducer } from 'react';
import { toast } from "react-toastify";
import ProtectedRoute from './ProtectedRoute';

//components
import Nav from './components/Nav/Nav';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import UserProfile from './components/UserProfile/UserProfile';
import Shop from './components/Shop/Shop';
import ProductDetails from './components/Product/ProductDetails';
import UserCart from './components/Cart/UserCart';
import Auth from './components/Auth/Auth';

//utils

//reducers
import reducer from './reducers/CartTtemsReducer';
import shopProductReducer from './reducers/ShopProductReducer';
import AppDataReducer from './reducers/AppDataReducer';

//contexts
export const CartContext = createContext();

//configures
toast.configure()

//404 page
const Error = () => {
  return(
    <h1>404 page not found</h1>
  )
}


//cart initialstate //local storage
var initialState = [];
var cartstate = localStorage.getItem('cartstate');
cartstate =  JSON.parse(cartstate);
if (cartstate) {
  var state = cartstate.state; 
  if (state) { 
    initialState = state;
  }
}

const shopInitialState = {
  loading: true,
  error:'',
  productdata:[],
  hasNext:true,
  nextPage:1
}

const appDataInitialState = {
  defaultCategories : [],
  defaultFlavors : [],
  newProducts: []
}


const App = () => {
  
  //reducers
  const [cartItems, dispatch] = useReducer(reducer, initialState);
  const [productDataState , productDataDispatch ] = useReducer(shopProductReducer,shopInitialState);
  const [appData, appDataDispatch] = useReducer(AppDataReducer, appDataInitialState);

  return(
    <>
      <Router>
        <CartContext.Provider value={{
          cartState: cartItems, 
          cartDispatch: dispatch,
          ShopProductsState: productDataState,
          ShopProductDispatch: productDataDispatch,
          appDataState: appData,
          appDataDispatch: appDataDispatch 
        }}>
          <Nav/>
          <div id="main">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/shop" component={Shop} />
                <Route path="/product/:pid" component={ProductDetails} />
                <Route path="/admin1" component={ Admin } />
                <Route path="/login" component={ Auth } />
                
                <ProtectedRoute path="/usercart" component={UserCart} />
                <ProtectedRoute path="/userprofile" component={UserProfile} />
                
                <Route  component={Error} />
                
            </Switch>
            <div className="empty"></div>
          </div>
        </CartContext.Provider>
      </Router>
    </>
  );
};

export default App;

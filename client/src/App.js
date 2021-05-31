import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createContext, useReducer } from 'react';

//components
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import UserProfile from './components/UserProfile/UserProfile';
import Shop from './components/Shop/Shop';
import ProductDetails from './components/Product/ProductDetails'
import UserCart from './components/Cart/UserCart';

const Error = () => {
  return(
    <h1>404 page not found</h1>
  )
}

export const CartContext = createContext();

const initialState = []

const reducer = (state, action) => {
  const product = action.product;
  if (action.type === 'onAdd') {

   
    const exist = state.find( x => x.id === product.id);
    
    if(exist){
     return  state = state.map(x => x.id === product.id ? {...exist, qty: exist.qty + 1 } : x)
    }else{
     return state = [...state, {...product, qty: 1}];
    }
    
  }else if (action.type === 'onRemove'){
    
    const exist = state.find( x => x.id === product.id);

    if(exist.qty === 1){
      return state = state.filter( x => x.id !== product.id)
    }else{
      return state = state.map( x => x.id === product.id ? {...exist, qty: exist.qty - 1 } : x )
    }

  }else{
    return state
  }
}

const App = () => {

  const [cartItems, dispatch] = useReducer(reducer, initialState);
  return(
    <>
      <Router>
        <CartContext.Provider value={{cartState: cartItems, cartDispatch: dispatch}}>
          <Nav/>
          <div id="main">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/userprofile" component={UserProfile} />
                <Route exact path="/usercart" component={UserCart} />
                <Route path="/product/:pid" component={ProductDetails} />
                <Route  component={Error} />
            </Switch>
          </div>
        </CartContext.Provider>
      </Router>
    </>
  );
};

export default App;

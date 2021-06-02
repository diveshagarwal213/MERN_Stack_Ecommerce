import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createContext, useReducer } from 'react';

//reducers
import reducer from './reducers/CartTtemsReducer'

//components
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import UserProfile from './components/UserProfile/UserProfile';
import Shop from './components/Shop/Shop';
import ProductDetails from './components/Product/ProductDetails'
import UserCart from './components/Cart/UserCart';

//404 page
const Error = () => {
  return(
    <h1>404 page not found</h1>
  )
}


export const CartContext = createContext();

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


const App = () => {

  //global cart
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

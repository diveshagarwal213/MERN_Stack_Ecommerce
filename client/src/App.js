import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

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

const App = () => {
  return(
    <>
      <Router>
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
          
      </Router>
    </>
  );
};

export default App;

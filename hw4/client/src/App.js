import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Menu from './components/Menu/Menu';
import Offers from './components/Offers/Offers';
import Cart from './components/Cart/Cart';
import About from './components/About/About';
import Checkout from './components/Checkout/Checkout';
import Review from './components/Review/Review';
import Receipt from './components/Receipt/Receipt';
import OfferItem from './components/OfferItem/OfferItem';
import PreviousOrder from './components/PreviousOrder/PreviousOrder';
import reducers from './reducers/reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { PropTypes } from 'prop-types';
import '../styles/site.less';
import DetailedPizza from './components/DetailedPizza/DetailedPizza';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <NavigationBar logoImageUrl="http://i0.kym-cdn.com/photos/images/original/001/259/271/69a.png" />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" render={() => {
                                return <Redirect to="/pizzas" />;
                            }} />
                            <Route exact path="/pizzas" component={Menu} />
                            <Route path="/offers/:offerId" component={OfferItem} />
                            <Route path="/pizzas/:pizzaId" component={DetailedPizza} />
                            <Route path="/offers" component={Offers} />
                            <Route path="/about" component={About} />
                            <Route path="/cart" component={Cart} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/review" component={Review} />
                            <Route path="/receipt" component={Receipt} />
                            <Route path="/orders/:telephone" component={PreviousOrder} />
                        </Switch>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    };
}

ReactDOM.render(<Provider store={createStore(reducers, applyMiddleware(thunk))}><Router><App /></Router></Provider>, document.getElementById('app'));

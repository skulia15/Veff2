import React from 'react';
import ReactDOM from 'react-dom';
// My components here
import NavigationBar from './components/NavigationBar/NavigationBar';
import Menu from './components/Menu/Menu';
import Offers from './components/Offers/Offers';
import About from './components/About/About';
import PizzaItem from './components/PizzaItem/PizzaItem';
import OfferItem from './components/OfferItem/OfferItem';
import reducers from './reducers/reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { PropTypes } from 'prop-types';
import '../styles/site.less';

class App extends React.Component {
    // getChildContext() {
    //     return {
    //         user: {
    //             loginId: 'arnarl',
    //             displayName: 'Arnar Leifsson'
    //         }
    //     }
    // }
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
                            <Route path="/pizzas/:pizzaId" component={PizzaItem} />
                            <Route path="/offers" component={Offers} />
                            <Route path="/about" component={About} />
                        </Switch>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    };
}

// App.childContextTypes = {
//     user: PropTypes.shape({
//         loginId: PropTypes.string,
//         displayName: PropTypes.string
//     })
// };

// Define childContextTypes and use contextTypes for navigation bar

ReactDOM.render(<Provider store={createStore(reducers, applyMiddleware(thunk))}><Router><App /></Router></Provider>, document.getElementById('app'));

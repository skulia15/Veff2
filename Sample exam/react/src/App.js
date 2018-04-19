import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Employees from './components/Employees/Employees';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';

import reducers from './reducers/Reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import '../styles/site.less';

class App extends React.Component {
    render() {
        return (
                <div>
                    <NavigationBar/>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/employees" component={Employees} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </div>
                </div>
        );
    };
}

ReactDOM.render(<Provider store={createStore(reducers, applyMiddleware(thunk))}><Router><App /></Router></Provider>, document.getElementById('app'));
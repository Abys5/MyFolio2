import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';

const App: React.FunctionComponent = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <RegisterPage></RegisterPage>
                </Route>
                <Route path="/">
                    <HomePage></HomePage>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;

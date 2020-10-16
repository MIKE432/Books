import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';


const RouterComponent = (props) => (
    <Switch>
        {
            routes().map((route, key) => <Route key={key} path={route.path} component={route.component} exact={true}/>)
        }
    </Switch>
)

export default RouterComponent;
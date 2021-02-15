//general imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Component imports
import Login from '../auth/Login';
import PrivateRoute from './PrivateRoute';
import DynamicAlert from '../layout/Alert';
import Navbar from '../layout/Navbar';
import Dashboard from '../layout/Dashboard';

const Routes = () => {
  return (
    <>
      <Navbar></Navbar>
      <DynamicAlert />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
};

export default Routes;

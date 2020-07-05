/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider }from 'react-redux';
import store from "./store";
import  PrivateRoute  from "./common/PrivateRoutes";
import  RestrictedRoute  from "./common/RestrictedRoutes";
//import { loadAlumni } from "./actions/alumni";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";

// pages for this kit
import LoginPage from "views/examples/LoginPage.js";
import EmployeeLoginPage from "views/examples/EmployeeLoginPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import MinimumPage from "views/pages/MinimumPage.js";
import ProfilePage from "views/pages/ProfilePage.js";

class App extends Component{
  render(){
    return(
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Switch>
              
              <Route path="/client-data" render={props => <MinimumPage {...props} name='Clients' table_id="2" />} />
              <Route path="/employee-data" render={props => <MinimumPage {...props} name='Employees' table_id="1" />} />
              <Route path="/category-data" render={props => <MinimumPage {...props} name="Specialization" table_id="3"/>} />
              <Route path="/session-data" render={props => <MinimumPage {...props} name="Session" table_id="7"/>} />
              <Route path="/booking-data" render={props => <MinimumPage {...props} name="Booking" table_id="4"/>} />
              
              <Route path="/employee-book/:id" render={props => <MinimumPage {...props} name='Booking' table_id="6" />} />
              <Route path="/booking-state" render={props => <MinimumPage {...props} name='Booking' table_id="8" />} />
              <Route path="/employee-group/" render={props => <MinimumPage {...props} name='Profession' table_id="5" />} />

              <Route path="/client-file/:id" render={props => <ProfilePage {...props} name='Clients' table_id="2" />} />
              <Route path="/employee-file/:id" render={props => <ProfilePage {...props} name='Staff List' table_id="1"/>} />

              <Route path="/login-page" render={props => <LoginPage {...props} />} />
              <Route path="/staff-login-page" render={props => <EmployeeLoginPage {...props} />} />
              <Route path="/register-page" render={props => <RegisterPage {...props} />} />

              <Redirect to="/login-page" />
              <Redirect from="/" to="/login-page" />
            </Switch>
          </Switch>
        </BrowserRouter>
        </Provider>
    )
  }
}
ReactDOM.render(<App/>, document.getElementById("root"));

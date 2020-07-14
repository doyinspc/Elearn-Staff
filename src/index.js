import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider }from 'react-redux';
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.2.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.jsx";
import AccountLayout from "layouts/Account.jsx";
import InventoryLayout from "layouts/Inventory.jsx";
import EmployeeLoginPage from "views/EmployeeLoginPage";
import StudentLoginPage from "views/StudentLoginPage";
import UserStaffEditPage from "views/Table/UserProfileEdit";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={ store }>
        <BrowserRouter history={hist}>
          <Switch>
            <Switch>
              <Route path="/admin" render={props => <AdminLayout {...props} />} />
              <Route path="/account" render={props => <AccountLayout {...props} />} />
              <Route path="/inventory" render={props => <InventoryLayout {...props} />} />
              <Route path="/staff" render={props => <EmployeeLoginPage {...props} />} />
              <Route path="/" render={props => <StudentLoginPage {...props} />} />
              <Route path="/admin/useredit" render={props => <UserStaffEditPage {...props} />} />
              <Redirect to="/" />
            </Switch>
          </Switch>
        </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

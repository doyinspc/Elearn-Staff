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
import StaffLayout from "layouts/Staff.jsx";
import AccountLayout from "layouts/Account.jsx";
import InventoryLayout from "layouts/Inventory.jsx";


const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={ store }>
        <BrowserRouter history={hist}>
          <Switch>
            <Switch>
              <Route path="/admin" render={props => <AdminLayout {...props} />} />
              <Route path="/staff" render={props => <StaffLayout {...props} />} />
              <Route path="/account" render={props => <AccountLayout {...props} />} />
              <Route path="/inventory" render={props => <InventoryLayout {...props} />} />
              <Redirect to="/admin/dashboard" />
            </Switch>
          </Switch>
        </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

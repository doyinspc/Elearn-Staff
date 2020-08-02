import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider }from 'react-redux';
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.2.0";
import "assets/css/dash.css";
import "assets/css/demo.css";
import "assets/datatables.css";

import AdminLayout from "layouts/Admin.jsx";
import AccountLayout from "layouts/Account.jsx";
import EmployeeLoginPage from "views/EmployeeLoginPage";
import EmployeeRegisterPage from "views/EmployeeRegisterPage";
import StudentLoginPage from "views/StudentLoginPage";
import StudentRegisterPage from "views/StudentRegisterPage";
import UserStaffEditPage from "views/Table/UserProfileEdit";
import Semester from "views/Table/SemesterList.jsx";
import Course from "views/Table/CourseList.jsx";
import CourseItem from "views/Table/CourseListsItem.js";

import Staff from "views/Table/UserProfile.js";
import Student from "views/Table/UserProfileStudent.js";
import StaffList from "views/Table/StaffList.jsx";
import StudentList from "views/Table/StudentList.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={ store }>
        <BrowserRouter history={hist}>
          <Switch>
            <Switch>
              <Route path="/admin" render={props => <AdminLayout {...props} />} />
              <Route path="/account" render={props => <AccountLayout {...props} />} />
              <Route path="/admin/useredit" render={props => <UserStaffEditPage {...props} />} />
              <Route path="/admin/semester/:id" render={props => <Semester {...props} />} />
              <Route path="/admin/semester" render={props => <Semester {...props} />} />
              <Route path="/admin/course" render={props => <Course {...props} />} />
              <Route path="/admin/courseitem" render={props => <CourseItem {...props} />} />
              <Route path="/admin/staff" render={props => <Staff {...props} />} />
              <Route path="/admin/student" render={props => <Student {...props} />} />
              <Route path="/admin/staffs" render={props => <StaffList {...props} />} />
              <Route path="/admin/students" render={props => <StudentList {...props} />} />
              
              <Route path="/staff" render={props => <EmployeeLoginPage {...props} />} />
              <Route path="/register" render={props => <StudentRegisterPage {...props} />} />
              <Route path="/registerstaff" render={props => <EmployeeRegisterPage {...props} />} />
              <Route path="/" render={props => <StudentLoginPage {...props} />} />
              
              <Redirect to="/" />
            </Switch>
          </Switch>
        </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

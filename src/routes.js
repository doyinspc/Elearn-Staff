import Dashboard from "views/Dashboard.jsx";
import Course from "views/Table/CourseList.jsx";
import Edit from "views/Table/UserProfileEdit";
import UserProfilePage from "views/Table/UserProfile.js";


import Calender from "views/Table/SessionList.jsx";
import Semester from "views/Table/SemesterList.jsx";

import School from "views/Table/SchoolList.jsx";
import Department from "views/Table/DepartmentList.jsx";
import Material from "views/Table/MaterialList.jsx";
import Module from "views/Table/ModuleList.jsx";
import Level from "views/Table/LevelList.jsx";
import Programme from "views/Table/ProgrammeList.jsx";
import Fee from "views/Table/FeeList.jsx";

import Student from "views/Table/StudentList.jsx";
import Staff from "views/Table/StaffList.jsx";

var dashRoutes = [
  {
    path: "/staff",
    name: "Profile",
    icon: "users_single-02",
    component: UserProfilePage,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/course",
    name: "Courses",
    icon: "design_app",
    component: Course,
    layout: "/admin"
  },
  {
    path: "/useredit",
    name: "Edit",
    icon: "design_app",
    component: Edit,
    layout: "/admin"
  },


  //SETTINGS
  {
    path: "/calender",
    name: "Calender",
    icon: "design_app",
    component: Calender,
    layout: "/admin"
  },
  {
    path: "/semester/:id",
    component: Semester,
    layout: "/admin"
  },
  {
    path: "/school",
    name: "school",
    icon: "design_app",
    component: School,
    layout: "/admin"
  },
  {
    path: "/department/:id",
    icon: "design_app",
    component: Department,
    layout: "/admin"
  },
  {
    path: "/module",
    name: "Module",
    icon: "design_app",
    component: Module,
    layout: "/admin"
  },
  {
    path: "/level",
    name: "Level",
    icon: "design_app",
    component: Level,
    layout: "/admin"
  },
  {
    path: "/programme",
    name: "Programme",
    icon: "design_app",
    component: Programme,
    layout: "/admin"
  },
  {
    path: "/material",
    name: "Material",
    icon: "design_app",
    component: Material,
    layout: "/admin"
  },
  {
    path: "/fee",
    name: "Fee",
    icon: "design_app",
    component: Fee,
    layout: "/admin"
  },
  
  {
    path: "/student",
    name: "Student",
    icon: "design_app",
    component: Student,
    layout: "/admin"
  },
  {
    path: "/staff",
    name: "Staff",
    icon: "design_app",
    component: Staff,
    layout: "/admin"
  },
  
  
];
export default dashRoutes;

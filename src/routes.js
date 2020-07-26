import Staff from "views/Table/UserProfile";
import Student from "views/Table/UserProfileStudent";

import StaffList from "views/Table/StaffList";
import StudentList from "views/Table/StudentList";

import Dashboard from "views/Dashboard.jsx";
import Course from "views/Table/CourseList.jsx";
import Courses from "views/Table/CourseLists.js";
import Edit from "views/Table/UserProfileEdit";
import EditStudent from "views/Table/UserProfileStudentEdit";

import Calender from "views/Table/SessionList.jsx";
import Semester from "views/Table/SemesterList.jsx";

import School from "views/Table/SchoolList.jsx";
import Department from "views/Table/DepartmentList.jsx";
import Material from "views/Table/MaterialList.jsx";
import Module from "views/Table/ModuleList.jsx";
import Level from "views/Table/LevelList.jsx";
import Programme from "views/Table/ProgrammeList.jsx";
import Fee from "views/Table/FeeList.jsx";

import Students from "views/Table/StudentList.jsx";
import Staffs from "views/Table/StaffList.jsx";

var dashRoutes = [
  {
    path: "/staff",
    name: "Staff",
    icon: "design_app",
    component: Staff,
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
    path: "/courses",
    name: "Course List",
    icon: "design_app",
    component: Courses,
    layout: "/admin"
  },
  {
    path: "/useredit",
    name: "Edit",
    icon: "design_app",
    component: Edit,
    layout: "/admin"
  },
  {
    path: "/usereditstudent",
    name: "Edit Student",
    icon: "design_app",
    component: EditStudent,
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
    path: "/students",
    name: "Students",
    icon: "design_app",
    component: StudentList,
    layout: "/admin"
  },
  {
    path: "/staffs",
    name: "Staffs",
    icon: "design_app",
    component: StaffList,
    layout: "/admin"
  },
  
  
];
export default dashRoutes;

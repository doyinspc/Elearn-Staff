import Staff from "views/Table/UserProfile";
import Student from "views/Table/UserProfileStudent";

import StaffList from "views/Table/StaffList";
import StudentList from "views/Table/StudentList";

import Dashboard from "views/Dashboard.jsx";
import Course from "views/Table/CourseList.jsx";
import Courses from "views/Table/CourseLists.js";
import CourseItem from "views/Table/CourseListsItem.js";
import Edit from "views/Table/UserProfileEdit";
import EditStudent from "views/Table/UserProfileStudentEdit";

import Calender from "views/Table/SessionList.jsx";
import Semester from "views/Table/SemesterList.jsx";

import School from "views/Table/SchoolList.jsx";
import Department from "views/Table/DepartmentList.jsx";
import Module from "views/Table/ModuleList.jsx";
import Level from "views/Table/LevelList.jsx";

import Students from "views/Table/StudentList.jsx";
import Staffs from "views/Table/StaffList.jsx";

var dashRoutes = [
  {
    path: "/staff",
    name: "Staff",
    icon: "design_app",
    component: Staff,
    layout: "/admin",
    num: 2
  },
  {
    path: "/student",
    name: "Student",
    icon: "design_app",
    component: Student,
    layout: "/admin",
    num: 1
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
    layout: "/admin",
    num: 2
  },
  {
    path: "/courses",
    name: "Course List",
    icon: "design_app",
    component: Courses,
    layout: "/admin",
    num: 1
  },
  {
    path: "/courseitem",
    name: "",
    icon: "",
    component: CourseItem,
    layout: "/admin",
    num: 1
  },
  {
    path: "/useredit",
    name: "Edit",
    icon: "design_app",
    component: Edit,
    layout: "/admin",
    num: 2
  },
  {
    path: "/usereditstudent",
    name: "Edit Student",
    icon: "design_app",
    component: EditStudent,
    layout: "/admin",
    num: 1
  },


  //SETTINGS
  
  {
    path: "/school",
    name: "Subjects",
    icon: "design_app",
    component: School,
    layout: "/admin",
    num: 3
  },
  {
    path: "/department/:id",
    icon: "design_app",
    component: Department,
    layout: "/admin",
    num: 4
  },
  {
    path: "/module",
    name: "Module",
    icon: "design_app",
    component: Module,
    layout: "/admin",
    num: 3
  },
  {
    path: "/level",
    name: "Level",
    icon: "design_app",
    component: Level,
    layout: "/admin",
    num: 3
  },
  
  {
    path: "/students",
    name: "Students",
    icon: "design_app",
    component: StudentList,
    layout: "/admin",
    num: 3
  },
  {
    path: "/staffs",
    name: "Staffs",
    icon: "design_app",
    component: StaffList,
    layout: "/admin",
    num: 3
  },
  {
    path: "/calender",
    name: "Calender",
    icon: "design_app",
    component: Calender,
    layout: "/admin",
    num: 3
  },
  {
    path: "/semester/:id",
    name: "Calender",
    icon: "design_app",
    component: Semester,
    layout: "/admin",
    num: 3
  },
  
];
export default dashRoutes;

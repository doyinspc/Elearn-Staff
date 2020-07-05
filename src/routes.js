import Dashboard from "views/Dashboard.jsx";
import Course from "views/Table/CourseList.jsx";
import UserPage from "views/UserPage.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/course",
    name: "Course",
    icon: "design_app",
    component: Course,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin"
  }
];
export default dashRoutes;

import Dashboard from "views/Dashboard.jsx";
import Course from "views/Table/CourseList.jsx";
import UserPage from "views/UserPage.jsx";
import UserProfilePage from "views/Table/UserProfile.js";

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
  }
];
export default dashRoutes;

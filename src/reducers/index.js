import { combineReducers } from 'redux';
import course from "./course";
import coursemodule from "./coursemodule";
import coursematerial from "./coursematerial";
import coursetutor from "./coursetutor";
import coursestudent from "./coursestudent";
import courseprogress from "./courseprogress";
import userstudent from "./userstudent";
import userstaff from "./userstaff";
import userstudentcourse from "./userstudentcourse";
import userstaffcourse from "./userstaffcourse";

export default combineReducers({
    courseReducer: course,
    coursemoduleReducer: coursemodule,
    coursematerialReducer: coursematerial,
    coursetutorReducer: coursetutor,
    coursestudentReducer: coursestudent,
    courseprogressReducer: courseprogress,
    userstaffReducer: userstaff,
    userstudentReducer: userstudent,
    userstudentcourseReducer: userstudentcourse,
    userstaffcourseReducer: userstaffcourse,
});
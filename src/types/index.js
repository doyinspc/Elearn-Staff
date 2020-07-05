import { combineReducers } from 'redux';
import course from course;
import coursemodule from coursemodule;
import coursematerial from coursematerial;
import coursetutor from coursetutor;
import coursestudent from coursestudent;
import courseprogress from courseprogress;


export default combineReducers({
    courseReducer: course,
    coursematerialReducer: coursematerial,
    coursemoduleReducer: coursemodule,
    coursetutorReducer: coursetutor,
    coursestudentReducer: coursestudent,
    courseprogressReducer: courseprogress,
});
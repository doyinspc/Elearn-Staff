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

import session from "./session";
import sessionFee from "./sessionFee";
import semester from "./semester";
import school from "./school";
import department from "./department";
import programme from "./programme";
import module from "./module";
import courseRegistration from "./courseRegistration";
import courseMaterialProgress from "./courseMaterialProgress";
import courseReport from "./courseReport";
import material from "./material";
import grade from "./grade";
import level from "./level";
import fee from "./fee";
import student from "./student";
import studentData from "./studentData";
import studentPayment from "./studentPayment";
import staff from "./staff";
import staffData from "./staffData";
import staffCourse from "./staffCourse";

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

    sessionReducer: session,
    sessionFeeReducer: sessionFee,
    semesterReducer: semester,
    schoolReducer: school,
    departmentReducer: department,
    programmeReducer: programme,
    moduleReducer: module,
    courseRegistrationReducer: courseRegistration,
    courseReportReducer: courseReport,
    courseMaterialProgressReducer: courseMaterialProgress,
    materialReducer: material,
    gradeReducer: grade,
    levelReducer: level,
    feeReducer: fee,
    studentReducer: student,
    studentDataReducer: studentData,
    studentPaymentReducer: studentPayment,
    staffReducer: staff,
    staffDataReducer: staffData,
    staffCourseReducer: staffCourse,
});
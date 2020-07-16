import { combineReducers } from 'redux';
import course from course;
import coursemodule from coursemodule;
import coursematerial from coursematerial;
import coursetutor from coursetutor;
import coursestudent from coursestudent;
import courseprogress from courseprogress;

import session from "./session";
import sessionFee from "./sessionFee";
import semester from "./semester";
import school from "./school";
import department from "./department";
import programme from "./programme";
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
    coursematerialReducer: coursematerial,
    coursemoduleReducer: coursemodule,
    coursetutorReducer: coursetutor,
    coursestudentReducer: coursestudent,
    courseprogressReducer: courseprogress,

    sessionReducer: session,
    sessionFeeReducer: sessionFee,
    semesterReducer: semester,
    schoolReducer: school,
    departmentReducer: department,
    programmeReducer: programme,
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
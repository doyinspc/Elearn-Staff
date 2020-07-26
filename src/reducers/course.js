import {
    COURSE_GET_MULTIPLE,
    COURSE_GET_ONE,
    COURSE_REGISTER_SUCCESS,
    COURSE_REGISTER_FAIL,
    COURSE_LOADING,
    COURSE_LOADING_ERROR,
    COURSE_ACTIVATE_FAIL,
    COURSE_ACTIVATE_SUCCESS,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL,
    COURSE_DELETE_SUCCESS,
    COURSE_DELETE_FAIL,
    COURSE_EDIT
} from "../types/course";

let courseStore = JSON.parse(localStorage.getItem('course'))

const initialState = {
    isLoading: false,
    courses: courseStore,
    course:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCourse = [...aluu];
    newCourse.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCourse;
}


export default function(state = initialState, action){
    switch (action.type) {
        case COURSE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COURSE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COURSE_GET_MULTIPLE:
            localStorage.setItem('course', JSON.stringify(action.payload));
            return {
                ...state,
                courses : action.payload,
                msg:'DONE!!!'
            };
        case COURSE_GET_ONE:
            let all = [...state.courses];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                course : ses,
                MSG:"DONE!!!"
            };
        case COURSE_REGISTER_SUCCESS:
            localStorage.setItem('course', JSON.stringify([...state.courses, action.payload]));
            return {
                ...state,
                courses: [...state.courses, action.payload],
                msg:action.msg
            }; 
        case COURSE_ACTIVATE_SUCCESS:
            let ac = changeState(state.courses, action.payload);
            localStorage.setItem('course', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                courses: ac
            }
        case COURSE_DELETE_SUCCESS:
            let rem = state.courses.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('course', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                courses: rem
            }
        case COURSE_UPDATE_SUCCESS:
            const findInd = state.courses.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.courses];
            newState[findInd] = action.payload;
            localStorage.setItem('course', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                courses : newState,
                course:action.payload
            }; 
        case COURSE_LOADING_ERROR:
        case COURSE_ACTIVATE_FAIL:
        case COURSE_REGISTER_FAIL:
        case COURSE_DELETE_FAIL:
        case COURSE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
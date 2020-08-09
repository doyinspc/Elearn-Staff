import {
    USERSTUDENTCOURSE_GET,
    USERSTUDENTCOURSE_GET_ONE,
    USERSTUDENTCOURSEX_GET_ONE,
    USERSTUDENTCOURSE_GET_MULTIPLE,
    USERSTUDENTCOURSEX_GET_MULTIPLE,
    USERSTUDENTCOURSE_REGISTER_SUCCESS,
    USERSTUDENTCOURSE_REGISTER_FAIL,
    USERSTUDENTCOURSE_LOADING,
    USERSTUDENTCOURSEX_LOADING,
    USERSTUDENTCOURSE_LOADING_ERROR,
    USERSTUDENTCOURSEX_LOADING_ERROR,
    USERSTUDENTCOURSE_UPDATE_SUCCESS,
    USERSTUDENTCOURSE_UPDATE_FAIL,
    USERSTUDENTCOURSE_DELETE_SUCCESS,
    USERSTUDENTCOURSE_DELETE_FAIL,
    USERSTUDENTCOURSE_EDIT,
} from "../types/userstudentcourse";

let userstudentcourseStore = JSON.parse(localStorage.getItem('userstudentcourse'));
let userstudentcoursexStore = JSON.parse(localStorage.getItem('userstudentcoursex'));
let act = JSON.parse(localStorage.getItem('activestudentcourse'));
const initialState = {
    isLoading: false,
    userstudentcourses: userstudentcourseStore,
    userstudentcoursesx: userstudentcoursexStore,
    userstudentcourse: act && Array.isArray(Object.keys(act)) ? act:{},
    userstudentcoursex:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUserstudentcourse = [...aluu];
    newUserstudentcourse.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUserstudentcourse;
}


export default function(state = initialState, action){
    switch (action.type) {
        case USERSTUDENTCOURSE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case USERSTUDENTCOURSE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USERSTUDENTCOURSEX_LOADING:
            return {
                ...state,
                isLoadingx : true
            };
        case USERSTUDENTCOURSE_GET_MULTIPLE:
            localStorage.setItem('userstudentcourse', JSON.stringify(action.payload));
            return {
                ...state,
                userstudentcourses : action.payload,
                msg:'DONE!!!'
            };
        case USERSTUDENTCOURSEX_GET_MULTIPLE:
            localStorage.setItem('userstudentcoursex', JSON.stringify(action.payload));
            return {
                ...state,
                userstudentcoursesx : action.payload,
                msg:'DONE!!!'
            };
        case USERSTUDENTCOURSEX_GET_ONE:
            let allx = [...state.userstudentcoursesx];
            let sesx = allx.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                userstudentcourse : sesx,
                MSG:"DONE!!!"
            };
        case USERSTUDENTCOURSE_GET_ONE:
            let all = [...state.userstudentcourses];
            let ses = all.filter(row=>row.id == action.payload)[0];
            localStorage.setItem('activestudentcourse', JSON.stringify(ses));
            return {
                ...state,
                userstudentcourse : ses,
                MSG:"DONE!!!"
            };
        case USERSTUDENTCOURSE_REGISTER_SUCCESS:
            localStorage.setItem('userstudentcourse', JSON.stringify([...state.userstudentcourses, action.payload]));
            return {
                ...state,
                userstudentcourses: [...state.userstudentcourses, action.payload],
                msg:action.msg
            }; 
       
        case USERSTUDENTCOURSE_DELETE_SUCCESS:
            let rem = state.userstudentcourses.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('userstudentcourse', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                userstudentcourses: rem
            }
        case USERSTUDENTCOURSE_UPDATE_SUCCESS:
            const findInd = state.userstudentcourses.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.userstudentcourses];
            newState[findInd] = action.payload;
            localStorage.setItem('userstudentcourse', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                userstudentcourses : newState
            }; 
        case USERSTUDENTCOURSE_LOADING_ERROR:
        case USERSTUDENTCOURSE_REGISTER_FAIL:
        case USERSTUDENTCOURSE_DELETE_FAIL:
        case USERSTUDENTCOURSE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
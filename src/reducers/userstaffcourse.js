import {
    USERSTAFFCOURSE_GET,
    USERSTAFFCOURSE_GET_ONE,
    USERSTAFFCOURSEX_GET_ONE,
    USERSTAFFCOURSE_GET_MULTIPLE,
    USERSTAFFCOURSEX_GET_MULTIPLE,
    USERSTAFFCOURSE_REGISTER_SUCCESS,
    USERSTAFFCOURSE_REGISTER_FAIL,
    USERSTAFFCOURSE_LOADING,
    USERSTAFFCOURSEX_LOADING,
    USERSTAFFCOURSE_LOADING_ERROR,
    USERSTAFFCOURSEX_LOADING_ERROR,
    USERSTAFFCOURSE_UPDATE_SUCCESS,
    USERSTAFFCOURSE_UPDATE_FAIL,
    USERSTAFFCOURSE_DELETE_SUCCESS,
    USERSTAFFCOURSE_DELETE_FAIL,
    USERSTAFFCOURSE_EDIT,
} from "../types/userstaffcourse";

let userstaffcourseStore = JSON.parse(localStorage.getItem('userstaffcourse'))
let userstaffcoursexStore = JSON.parse(localStorage.getItem('userstaffcoursex'))
const initialState = {
    isLoading: false,
    userstaffcourses: userstaffcourseStore,
    userstaffcoursesx: userstaffcoursexStore,
    userstaffcourse:{},
    userstaffcoursex:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUserstaffcourse = [...aluu];
    newUserstaffcourse.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUserstaffcourse;
}


export default function(state = initialState, action){
    switch (action.type) {
        case USERSTAFFCOURSE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case USERSTAFFCOURSE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USERSTAFFCOURSEX_LOADING:
            return {
                ...state,
                isLoadingx : true
            };
        case USERSTAFFCOURSE_GET_MULTIPLE:
            localStorage.setItem('userstaffcourse', JSON.stringify(action.payload));
            return {
                ...state,
                userstaffcourses : action.payload,
                msg:'DONE!!!'
            };
        case USERSTAFFCOURSEX_GET_MULTIPLE:
            localStorage.setItem('userstaffcoursex', JSON.stringify(action.payload));
            return {
                ...state,
                userstaffcoursesx : action.payload,
                msg:'DONE!!!'
            };
        case USERSTAFFCOURSEX_GET_ONE:
            let allx = [...state.userstaffcoursesx];
            let sesx = allx.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                userstaffcoursex : sesx,
                MSG:"DONE!!!"
            };
        case USERSTAFFCOURSE_GET_ONE:
            let all = [...state.userstaffcourses];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                userstaffcourseX : ses,
                MSG:"DONE!!!"
            };
        case USERSTAFFCOURSE_REGISTER_SUCCESS:
            localStorage.setItem('userstaffcourse', JSON.stringify([...state.userstaffcourses, action.payload]));
            return {
                ...state,
                userstaffcourses: [...state.userstaffcourses, action.payload],
                msg:action.msg
            }; 
       
        case USERSTAFFCOURSE_DELETE_SUCCESS:
            let rem = state.userstaffcourses.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('userstaffcourse', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                userstaffcourses: rem
            }
        case USERSTAFFCOURSE_UPDATE_SUCCESS:
            const findInd = state.userstaffcourses.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.userstaffcourses];
            newState[findInd] = action.payload;
            localStorage.setItem('userstaffcourse', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                userstaffcourses : newState
            }; 
        case USERSTAFFCOURSE_LOADING_ERROR:
        case USERSTAFFCOURSE_REGISTER_FAIL:
        case USERSTAFFCOURSE_DELETE_FAIL:
        case USERSTAFFCOURSE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
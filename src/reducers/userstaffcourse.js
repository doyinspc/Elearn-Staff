import {
    USERSTAFFCOURSE_GET_MULTIPLE,
    USERSTAFFCOURSE_GET_ONE,
    USERSTAFFCOURSE_REGISTER_SUCCESS,
    USERSTAFFCOURSE_REGISTER_FAIL,
    USERSTAFFCOURSE_LOADING,
    USERSTAFFCOURSE_LOADING_ERROR,
    USERSTAFFCOURSE_ACTIVATE_FAIL,
    USERSTAFFCOURSE_ACTIVATE_SUCCESS,
    USERSTAFFCOURSE_UPDATE_SUCCESS,
    USERSTAFFCOURSE_UPDATE_FAIL,
    USERSTAFFCOURSE_DELETE_SUCCESS,
    USERSTAFFCOURSE_DELETE_FAIL,
    USERSTAFFCOURSE_EDIT
} from "../types/userstaffcourse";

let userstaffcourseStore = JSON.parse(localStorage.getItem('userstaffcourse'))

const initialState = {
    isLoading: false,
    userstaffcourses: userstaffcourseStore,
    userstaffcourse:{},
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
        case USERSTAFFCOURSE_GET_MULTIPLE:
            localStorage.setItem('userstaffcourse', JSON.stringify(action.payload));
            return {
                ...state,
                userstaffcourses : action.payload,
                msg:'DONE!!!'
            };
        case USERSTAFFCOURSE_GET_ONE:
            let all = [...state.userstaffcourses];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                userstaffcourse : ses,
                MSG:"DONE!!!"
            };
        case USERSTAFFCOURSE_REGISTER_SUCCESS:
            localStorage.setItem('userstaffcourse', JSON.stringify([...state.userstaffcourses, action.payload]));
            return {
                ...state,
                userstaffcourses: [...state.userstaffcourses, action.payload],
                msg:action.msg
            }; 
        case USERSTAFFCOURSE_ACTIVATE_SUCCESS:
            let ac = changeState(state.userstaffcourses, action.payload);
            localStorage.setItem('userstaffcourse', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                userstaffcourses: ac
            }
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
        case USERSTAFFCOURSE_ACTIVATE_FAIL:
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
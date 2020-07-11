import {
    EMPLOYEE_GET,
    EMPLOYEE_GET_ONE,
    EMPLOYEE_REGISTER_SUCCESS,
    EMPLOYEE_REGISTER_FAIL,
    EMPLOYEE_LOADING,
    EMPLOYEE_LOADING_ERROR,
    EMPLOYEE_ACTIVATE_FAIL,
    EMPLOYEE_ACTIVATE_SUCCESS,
    EMPLOYEE_UPDATE_SUCCESS,
    EMPLOYEE_UPDATE_FAIL,
    EMPLOYEE_DELETE_SUCCESS,
    EMPLOYEE_DELETE_FAIL,
    EMPLOYEE_LOGIN_SUCCESS,
    EMPLOYEE_LOGIN_FAIL,
    EMPLOYEE_LOGOUT_SUCCESS,
    EMPLOYEE_LOGOUT_FAIL,
    EMPLOYEE_PASSWORD_SUCCESS,
    EMPLOYEE_PASSWORD_FAIL,
    EMPLOYEE_SEARCH_SUCCESS,
    EMPLOYEE_SEARCH_FAIL,
    EMPLOYEE_EDIT,
    EMPLOYEE_FORM,
    EMPLOYEE_ADMIN,
    EMPLOYEE_GET_MULTIPLE,
    MAIN_ADMIN,
    EMPLOYEE_MAIN_AUTH,
    EMPLOYEE_MAIN_TOKEN,
    MAIN_USER
} from "../actions/types";

let storeUser = JSON.parse(localStorage.getItem(MAIN_USER))
const initialState = {
    token: localStorage.getItem(EMPLOYEE_MAIN_TOKEN),
    isAuthenticated: localStorage.getItem(EMPLOYEE_MAIN_AUTH),
    isLoading: false,
    isAdmin: storeUser ? storeUser.is_staff: null,
    isRegistered: storeUser && storeUser.id > 1 ? true: false,
    user: storeUser,
    employee:{},
    employees: {},
    employeesSearched: {},
    msg: null,
    isEdit:-1,
    showForm: false
}

const changeState = (aluu, actid) =>
{
    let newEMPLOYEE = [...aluu];
    newEMPLOYEE.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newEMPLOYEE;
}


export default function(state = initialState, action){
    switch (action.type) {
        case EMPLOYEE_EDIT:
            let show_form_state = false
            if(action.payload > -1){
                show_form_state = true
            }
            return {
                ...state,
                isEdit : action.payload,
                showForm : show_form_state
        };
        case EMPLOYEE_FORM:
            return {
                ...state,
                showForm : action.payload
        };
        case EMPLOYEE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case EMPLOYEE_GET:
            return {
                ...state,
                employees : action.payload,
                msg:'DONE!!!'
            };
        case EMPLOYEE_GET_ONE:
            return {
                ...state,
                employee : action.payload,
                isLoading: false,
                msg:"DONE!!!"
            };
        case EMPLOYEE_GET_MULTIPLE:
            return {
                ...state,
                employees : action.payload,
                isLoading: false,
                msg:"DONE!!!"
            };
        case EMPLOYEE_SEARCH_SUCCESS:
            return {
                ...state,
                employeesSearched : action.payload,
            };
        case EMPLOYEE_SEARCH_FAIL:
            return {
                ...state,
                employeesSearched : {}
            };
        case EMPLOYEE_LOGIN_SUCCESS:
            localStorage.setItem(EMPLOYEE_MAIN_TOKEN, action.payload.token)
            localStorage.setItem(EMPLOYEE_MAIN_AUTH, true)
            localStorage.setItem(MAIN_ADMIN, action.payload.user.category)
            localStorage.setItem(MAIN_USER, JSON.stringify(action.payload.user))
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                msg: action.payload.msg,
                isAdmin: action.payload.user.is_staff
            }; 
        case EMPLOYEE_REGISTER_SUCCESS:
            return {
                ...state,
                employees: [...state.employees, action.payload],
                msg:action.msg
            }; 
        case EMPLOYEE_PASSWORD_SUCCESS:
        case EMPLOYEE_ACTIVATE_SUCCESS:
        case EMPLOYEE_ADMIN:
            return{
                ...state,
                msg:'DONE!!!',
                employees: changeState(state.employees, action.payload)
            }
        case EMPLOYEE_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                employees: state.employees.filter(cat => cat.id != action.payload.id)
            }
        case EMPLOYEE_UPDATE_SUCCESS:
            const findInd = state.employees.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.employees];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                employees : newState
            }; 
        case EMPLOYEE_LOADING_ERROR:
        case EMPLOYEE_ACTIVATE_FAIL:
        case EMPLOYEE_DELETE_FAIL:
        case EMPLOYEE_UPDATE_FAIL:
        case EMPLOYEE_REGISTER_FAIL:  
        case EMPLOYEE_PASSWORD_FAIL: 
            return {
                ...state,
                msg: action.msg
            };
        case EMPLOYEE_LOGIN_FAIL:
        case EMPLOYEE_LOGOUT_SUCCESS:
        case EMPLOYEE_LOGOUT_FAIL:
            localStorage.removeItem(EMPLOYEE_MAIN_TOKEN)
            localStorage.removeItem(EMPLOYEE_MAIN_AUTH)
            localStorage.removeItem(MAIN_USER)
            localStorage.removeItem(MAIN_ADMIN)
            return{
                ...state,
                token: null,
                isRegistered: true,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                employees:{},
                employee:{},
                isAdmin : null,
                employeesSearched:{}
            } 
        default:
            return state;
    }

}
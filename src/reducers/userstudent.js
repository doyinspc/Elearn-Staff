import {
    USERSTUDENT_LOGIN,
    USERSTUDENT_LOGIN_ERROR,
    USERSTUDENT_LOGOUT_SUCCESS,
    USERSTUDENT_LOGOUT_FAIL,
    USERSTUDENT_GET_MULTIPLE,
    USERSTUDENT_GET_ONE,
    USERSTUDENT_REGISTER_SUCCESS,
    USERSTUDENT_REGISTER_FAIL,
    USERSTUDENT_LOADING,
    USERSTUDENT_LOADING_ERROR,
    USERSTUDENT_ACTIVATE_FAIL,
    USERSTUDENT_ACTIVATE_SUCCESS,
    USERSTUDENT_UPDATE_SUCCESS,
    USERSTUDENT_UPDATE_FAIL,
    USERSTUDENT_DELETE_SUCCESS,
    USERSTUDENT_DELETE_FAIL,
    USERSTUDENT_EDIT
} from "../types/userstudent";

let userstudentStore = localStorage.getItem('userstudent') !== 'undefined' ? JSON.parse(localStorage.getItem('userstudent')):[];
let user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : {};

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('auth'),
    isLoading: false,
    isAdmin: userstudentStore ? userstudentStore.is_admin : null,
    isRegistered: userstudentStore && userstudentStore.id > 1 ? true: false,
    user: user ? user : {},
    userstudents: userstudentStore,
    userstudent:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUserstudent = [...aluu];
    newUserstudent.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUserstudent;
}


export default function(state = initialState, action){
    switch (action.type) {
        case USERSTUDENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case USERSTUDENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USERSTUDENT_LOGIN:
            localStorage.setItem('token', action.token)
            localStorage.setItem('auth', true);
            localStorage.setItem('user', JSON.stringify(action.payload))
            console.log(action.payload);
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload,
                isAdmin: action.payload.is_admin
            }; 
        case USERSTUDENT_GET_MULTIPLE:
            localStorage.setItem('userstudent', JSON.stringify(action.payload));
            return {
                ...state,
                userstudents : action.payload,

                msg:'DONE!!!'
            };
        case USERSTUDENT_GET_ONE:
            let all = [...state.userstudents];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                userstudent : ses,
                MSG:"DONE!!!"
            };
        case USERSTUDENT_REGISTER_SUCCESS:
            localStorage.setItem('userstudent', JSON.stringify([...state.userstudents, action.payload]));
            return {
                ...state,
                userstudents: [...state.userstudents, action.payload],
                msg:action.msg
            }; 
        case USERSTUDENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.userstudents, action.payload);
            localStorage.setItem('userstudent', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                userstudents: ac
            }
        case USERSTUDENT_DELETE_SUCCESS:
            let rem = state.userstudents.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('userstudent', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                userstudents: rem
            }
        case USERSTUDENT_UPDATE_SUCCESS:
            const findInd = state.userstudents.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.userstudents];
            newState[findInd] = action.payload;
            localStorage.setItem('userstudent', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                userstudents : newState
            }; 
        case USERSTUDENT_LOADING_ERROR:
        case USERSTUDENT_ACTIVATE_FAIL:
        case USERSTUDENT_REGISTER_FAIL:
        case USERSTUDENT_DELETE_FAIL:
        case USERSTUDENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        case USERSTUDENT_LOGIN_ERROR:
        case USERSTUDENT_LOGOUT_SUCCESS:
        case USERSTUDENT_LOGOUT_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            localStorage.removeItem('userstudent')
            localStorage.removeItem('user')
            return{
                ...state,
                token: null,
                isRegistered: true,
                isAuthenticated: false,
                isLoading: false,
                userstudent: {},
                user: {},
                isAdmin : null
            } 
        default:
            return state;
    }

}
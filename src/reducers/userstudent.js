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
import Swal from 'sweetalert2';

 const callError = ($err) =>{
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Check your internet connection or confirm you are using the right loging information',
        showConfirmButton: false,
        timer: 1500
      })
 }
 const callLoading = () =>{
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Please wait... processing',
        showConfirmButton: false,
        timer: 1500
      })
 }
let userstudentStore = localStorage.getItem('userstudent') !== 'undefined' ? JSON.parse(localStorage.getItem('userstudent')):[];
let user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : {};
let auth = localStorage.getItem('auth1') !== 'undefined' ? JSON.parse(localStorage.getItem('auth1')) : false;


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: auth  && parseInt(auth) === 1? true : false,
    isLoading: false,
    isAdmin: null,
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
            callLoading()
            return {
                ...state,
                isLoading : true
            };
        case USERSTUDENT_LOGIN:
            localStorage.removeItem('token')
            localStorage.removeItem('auth1')
            localStorage.removeItem('userstudent')
            localStorage.removeItem('user')
            localStorage.setItem('token', action.token)
            localStorage.setItem('auth1', JSON.stringify(1));
            localStorage.setItem('user', JSON.stringify(action.payload))
             
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
            //localStorage.setItem('userstudent', JSON.stringify([...state.userstudents, action.payload]));
            return {
                ...state,
                isLoading : false,
                msg:'Success',
                isRegistered: true
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
            const findInd = state.userstaffs.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.userstaffs];
            newState[findInd] = action.payload;
            localStorage.setItem('userstudent', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                userstudents : newState,
                userstudent : action.payload
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
        case USERSTUDENT_LOGOUT_SUCCESS:
        case USERSTUDENT_LOGOUT_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('auth1')
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
            } ;
        case USERSTUDENT_LOGIN_ERROR:
            localStorage.removeItem('token')
            localStorage.removeItem('auth1')
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
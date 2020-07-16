import {
    SESSION_GET_MULTIPLE,
    SESSION_GET_ONE,
    SESSION_REGISTER_SUCCESS,
    SESSION_REGISTER_FAIL,
    SESSION_LOADING,
    SESSION_LOADING_ERROR,
    SESSION_ACTIVATE_FAIL,
    SESSION_ACTIVATE_SUCCESS,
    SESSION_UPDATE_SUCCESS,
    SESSION_UPDATE_FAIL,
    SESSION_DELETE_SUCCESS,
    SESSION_DELETE_FAIL,
    SESSION_EDIT
} from "../types/session";

let sessionStore = JSON.parse(localStorage.getItem('session'))

const initialState = {
    isLoading: false,
    sessions: sessionStore,
    session:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newSession = [...aluu];
    newSession.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newSession;
}


export default function(state = initialState, action){
    switch (action.type) {
        case SESSION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case SESSION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case SESSION_GET_MULTIPLE:
            localStorage.setItem('session', JSON.stringify(action.payload));
            return {
                ...state,
                sessions : action.payload,
                msg:'DONE!!!'
            };
        case SESSION_GET_ONE:
            let all = [...state.sessions];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                session : ses,
                MSG:"DONE!!!"
            };
        case SESSION_REGISTER_SUCCESS:
            localStorage.setItem('session', JSON.stringify([...state.sessions, action.payload]));
            return {
                ...state,
                sessions: [...state.sessions, action.payload],
                msg:action.msg
            }; 
        case SESSION_ACTIVATE_SUCCESS:
            let ac = changeState(state.sessions, action.payload);
            localStorage.setItem('session', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                sessions: ac
            }
        case SESSION_DELETE_SUCCESS:
            let rem = state.sessions.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('session', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                sessions: rem
            }
        case SESSION_UPDATE_SUCCESS:
            const findInd = state.sessions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.sessions];
            newState[findInd] = action.payload;
            localStorage.setItem('session', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                sessions : newState
            }; 
        case SESSION_LOADING_ERROR:
        case SESSION_ACTIVATE_FAIL:
        case SESSION_REGISTER_FAIL:
        case SESSION_DELETE_FAIL:
        case SESSION_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
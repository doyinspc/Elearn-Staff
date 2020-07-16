import {
    LEVEL_GET_MULTIPLE,
    LEVEL_GET_ONE,
    LEVEL_REGISTER_SUCCESS,
    LEVEL_REGISTER_FAIL,
    LEVEL_LOADING,
    LEVEL_LOADING_ERROR,
    LEVEL_ACTIVATE_FAIL,
    LEVEL_ACTIVATE_SUCCESS,
    LEVEL_UPDATE_SUCCESS,
    LEVEL_UPDATE_FAIL,
    LEVEL_DELETE_SUCCESS,
    LEVEL_DELETE_FAIL,
    LEVEL_EDIT
} from "../types/level";

let levelStore = JSON.parse(localStorage.getItem('level'))

const initialState = {
    isLoading: false,
    levels: levelStore,
    level:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newLevel = [...aluu];
    newLevel.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newLevel;
}


export default function(state = initialState, action){
    switch (action.type) {
        case LEVEL_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case LEVEL_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case LEVEL_GET_MULTIPLE:
            localStorage.setItem('level', JSON.stringify(action.payload));
            return {
                ...state,
                levels : action.payload,
                msg:'DONE!!!'
            };
        case LEVEL_GET_ONE:
            let all = [...state.levels];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                level : ses,
                MSG:"DONE!!!"
            };
        case LEVEL_REGISTER_SUCCESS:
            localStorage.setItem('level', JSON.stringify([...state.levels, action.payload]));
            return {
                ...state,
                levels: [...state.levels, action.payload],
                msg:action.msg
            }; 
        case LEVEL_ACTIVATE_SUCCESS:
            let ac = changeState(state.levels, action.payload);
            localStorage.setItem('level', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                levels: ac
            }
        case LEVEL_DELETE_SUCCESS:
            let rem = state.levels.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('level', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                levels: rem
            }
        case LEVEL_UPDATE_SUCCESS:
            const findInd = state.levels.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.levels];
            newState[findInd] = action.payload;
            localStorage.setItem('level', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                levels : newState
            }; 
        case LEVEL_LOADING_ERROR:
        case LEVEL_ACTIVATE_FAIL:
        case LEVEL_REGISTER_FAIL:
        case LEVEL_DELETE_FAIL:
        case LEVEL_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
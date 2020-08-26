import {
    MODULE_GET_MULTIPLE,
    MODULE_GET_ONE,
    MODULE_REGISTER_SUCCESS,
    MODULE_REGISTER_FAIL,
    MODULE_LOADING,
    MODULE_LOADING_ERROR,
    MODULE_ACTIVATE_FAIL,
    MODULE_ACTIVATE_SUCCESS,
    MODULE_UPDATE_SUCCESS,
    MODULE_UPDATE_FAIL,
    MODULE_DELETE_SUCCESS,
    MODULE_DELETE_FAIL,
    MODULE_EDIT
} from "../types/module";

let moduleStore = JSON.parse(localStorage.getItem('module'))

const initialState = {
    isLoading: false,
    modules: moduleStore,
    module:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newModule = [...aluu];
    newModule.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newModule;
}


export default function(state = initialState, action){
    switch (action.type) {
        case MODULE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case MODULE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MODULE_GET_MULTIPLE:
            localStorage.setItem('module', JSON.stringify(action.payload));
            return {
                ...state,
                modules : action.payload,
                msg:'DONE!!!'
            };
        case MODULE_GET_ONE:
            let all = [...state.modules];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                module : ses,
                MSG:"DONE!!!"
            };
        case MODULE_REGISTER_SUCCESS:
            localStorage.setItem('module', JSON.stringify([...state.modules, action.payload]));
            return {
                ...state,
                modules: [...state.modules, action.payload],
                msg:action.msg
            }; 
        case MODULE_ACTIVATE_SUCCESS:
            let ac = changeState(state.modules, action.payload);
            localStorage.setItem('module', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                modules: ac
            }
        case MODULE_DELETE_SUCCESS:
            let rem = state.modules.filter(cat => cat.id != action.payload);
            localStorage.setItem('module', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                modules: rem
            }
        case MODULE_UPDATE_SUCCESS:
            const findInd = state.modules.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.modules];
            newState[findInd] = action.payload;
            localStorage.setItem('module', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                modules : newState
            }; 
        case MODULE_LOADING_ERROR:
        case MODULE_ACTIVATE_FAIL:
        case MODULE_REGISTER_FAIL:
        case MODULE_DELETE_FAIL:
        case MODULE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
import {
    DEPARTMENT_GET_MULTIPLE,
    DEPARTMENT_GET_ONE,
    DEPARTMENT_REGISTER_SUCCESS,
    DEPARTMENT_REGISTER_FAIL,
    DEPARTMENT_LOADING,
    DEPARTMENT_LOADING_ERROR,
    DEPARTMENT_ACTIVATE_FAIL,
    DEPARTMENT_ACTIVATE_SUCCESS,
    DEPARTMENT_UPDATE_SUCCESS,
    DEPARTMENT_UPDATE_FAIL,
    DEPARTMENT_DELETE_SUCCESS,
    DEPARTMENT_DELETE_FAIL,
    DEPARTMENT_EDIT
} from "../types/department";

let departmentStore = JSON.parse(localStorage.getItem('department'))

const initialState = {
    isLoading: false,
    departments: departmentStore,
    department:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newDepartment = [...aluu];
    newDepartment.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newDepartment;
}


export default function(state = initialState, action){
    switch (action.type) {
        case DEPARTMENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case DEPARTMENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case DEPARTMENT_GET_MULTIPLE:
            localStorage.setItem('department', JSON.stringify(action.payload));
            return {
                ...state,
                departments : action.payload,
                msg:'DONE!!!'
            };
        case DEPARTMENT_GET_ONE:
            let all = [...state.departments];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                department : ses,
                MSG:"DONE!!!"
            };
        case DEPARTMENT_REGISTER_SUCCESS:
            localStorage.setItem('department', JSON.stringify([...state.departments, action.payload]));
            return {
                ...state,
                departments: [...state.departments, action.payload],
                msg:action.msg
            }; 
        case DEPARTMENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.departments, action.payload);
            localStorage.setItem('department', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                departments: ac
            }
        case DEPARTMENT_DELETE_SUCCESS:
            let rem = state.departments.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('department', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                departments: rem
            }
        case DEPARTMENT_UPDATE_SUCCESS:
            const findInd = state.departments.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.departments];
            newState[findInd] = action.payload;
            localStorage.setItem('department', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                departments : newState
            }; 
        case DEPARTMENT_LOADING_ERROR:
        case DEPARTMENT_ACTIVATE_FAIL:
        case DEPARTMENT_REGISTER_FAIL:
        case DEPARTMENT_DELETE_FAIL:
        case DEPARTMENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
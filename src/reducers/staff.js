import {
    STAFF_GET_MULTIPLE,
    STAFF_GET_ONE,
    STAFF_REGISTER_SUCCESS,
    STAFF_REGISTER_FAIL,
    STAFF_LOADING,
    STAFF_LOADING_ERROR,
    STAFF_ACTIVATE_FAIL,
    STAFF_ACTIVATE_SUCCESS,
    STAFF_UPDATE_SUCCESS,
    STAFF_UPDATE_FAIL,
    STAFF_DELETE_SUCCESS,
    STAFF_DELETE_FAIL,
    STAFF_EDIT
} from "../types/staff";

let staffStore = JSON.parse(localStorage.getItem('staff'))

const initialState = {
    isLoading: false,
    staffs: staffStore,
    staff:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStaff = [...aluu];
    newStaff.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStaff;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STAFF_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STAFF_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STAFF_GET_MULTIPLE:
            localStorage.setItem('staff', JSON.stringify(action.payload));
            return {
                ...state,
                staffs : action.payload,
                msg:'DONE!!!'
            };
        case STAFF_GET_ONE:
            let all = [...state.staffs];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                staff : ses,
                MSG:"DONE!!!"
            };
        case STAFF_REGISTER_SUCCESS:
            localStorage.setItem('staff', JSON.stringify([...state.staffs, action.payload]));
            return {
                ...state,
                staffs: [...state.staffs, action.payload],
                msg:action.msg
            }; 
        case STAFF_ACTIVATE_SUCCESS:
            let ac = changeState(state.staffs, action.payload);
            localStorage.setItem('staff', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                staffs: ac
            }
        case STAFF_DELETE_SUCCESS:
            let rem = state.staffs.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('staff', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                staffs: rem
            }
        case STAFF_UPDATE_SUCCESS:
            const findInd = state.staffs.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.staffs];
            newState[findInd] = action.payload;
            localStorage.setItem('staff', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                staffs : newState
            }; 
        case STAFF_LOADING_ERROR:
        case STAFF_ACTIVATE_FAIL:
        case STAFF_REGISTER_FAIL:
        case STAFF_DELETE_FAIL:
        case STAFF_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
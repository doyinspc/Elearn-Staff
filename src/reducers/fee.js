import {
    FEE_GET_MULTIPLE,
    FEE_GET_ONE,
    FEE_REGISTER_SUCCESS,
    FEE_REGISTER_FAIL,
    FEE_LOADING,
    FEE_LOADING_ERROR,
    FEE_ACTIVATE_FAIL,
    FEE_ACTIVATE_SUCCESS,
    FEE_UPDATE_SUCCESS,
    FEE_UPDATE_FAIL,
    FEE_DELETE_SUCCESS,
    FEE_DELETE_FAIL,
    FEE_EDIT
} from "../types/fee";

let feeStore = JSON.parse(localStorage.getItem('fee'))

const initialState = {
    isLoading: false,
    fees: feeStore,
    fee:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newFee = [...aluu];
    newFee.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newFee;
}


export default function(state = initialState, action){
    switch (action.type) {
        case FEE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case FEE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case FEE_GET_MULTIPLE:
            localStorage.setItem('fee', JSON.stringify(action.payload));
            return {
                ...state,
                fees : action.payload,
                msg:'DONE!!!'
            };
        case FEE_GET_ONE:
            let all = [...state.fees];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                fee : ses,
                MSG:"DONE!!!"
            };
        case FEE_REGISTER_SUCCESS:
            localStorage.setItem('fee', JSON.stringify([...state.fees, action.payload]));
            return {
                ...state,
                fees: [...state.fees, action.payload],
                msg:action.msg
            }; 
        case FEE_ACTIVATE_SUCCESS:
            let ac = changeState(state.fees, action.payload);
            localStorage.setItem('fee', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                fees: ac
            }
        case FEE_DELETE_SUCCESS:
            let rem = state.fees.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('fee', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                fees: rem
            }
        case FEE_UPDATE_SUCCESS:
            const findInd = state.fees.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.fees];
            newState[findInd] = action.payload;
            localStorage.setItem('fee', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                fees : newState
            }; 
        case FEE_LOADING_ERROR:
        case FEE_ACTIVATE_FAIL:
        case FEE_REGISTER_FAIL:
        case FEE_DELETE_FAIL:
        case FEE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
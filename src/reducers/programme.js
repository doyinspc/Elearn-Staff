import {
    PROGRAMME_GET_MULTIPLE,
    PROGRAMME_GET_ONE,
    PROGRAMME_REGISTER_SUCCESS,
    PROGRAMME_REGISTER_FAIL,
    PROGRAMME_LOADING,
    PROGRAMME_LOADING_ERROR,
    PROGRAMME_ACTIVATE_FAIL,
    PROGRAMME_ACTIVATE_SUCCESS,
    PROGRAMME_UPDATE_SUCCESS,
    PROGRAMME_UPDATE_FAIL,
    PROGRAMME_DELETE_SUCCESS,
    PROGRAMME_DELETE_FAIL,
    PROGRAMME_EDIT
} from "../types/programme";

let programmeStore = JSON.parse(localStorage.getItem('programme'))

const initialState = {
    isLoading: false,
    programmes: programmeStore,
    programme:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newProgramme = [...aluu];
    newProgramme.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newProgramme;
}


export default function(state = initialState, action){
    switch (action.type) {
        case PROGRAMME_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case PROGRAMME_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case PROGRAMME_GET_MULTIPLE:
            localStorage.setItem('programme', JSON.stringify(action.payload));
            return {
                ...state,
                programmes : action.payload,
                msg:'DONE!!!'
            };
        case PROGRAMME_GET_ONE:
            let all = [...state.programmes];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                programme : ses,
                MSG:"DONE!!!"
            };
        case PROGRAMME_REGISTER_SUCCESS:
            localStorage.setItem('programme', JSON.stringify([...state.programmes, action.payload]));
            return {
                ...state,
                programmes: [...state.programmes, action.payload],
                msg:action.msg
            }; 
        case PROGRAMME_ACTIVATE_SUCCESS:
            let ac = changeState(state.programmes, action.payload);
            localStorage.setItem('programme', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                programmes: ac
            }
        case PROGRAMME_DELETE_SUCCESS:
            let rem = state.programmes.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('programme', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                programmes: rem
            }
        case PROGRAMME_UPDATE_SUCCESS:
            const findInd = state.programmes.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.programmes];
            newState[findInd] = action.payload;
            localStorage.setItem('programme', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                programmes : newState
            }; 
        case PROGRAMME_LOADING_ERROR:
        case PROGRAMME_ACTIVATE_FAIL:
        case PROGRAMME_REGISTER_FAIL:
        case PROGRAMME_DELETE_FAIL:
        case PROGRAMME_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
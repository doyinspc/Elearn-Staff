import {
    SCHOOL_GET_MULTIPLE,
    SCHOOL_GET_ONE,
    SCHOOL_REGISTER_SUCCESS,
    SCHOOL_REGISTER_FAIL,
    SCHOOL_LOADING,
    SCHOOL_LOADING_ERROR,
    SCHOOL_ACTIVATE_FAIL,
    SCHOOL_ACTIVATE_SUCCESS,
    SCHOOL_UPDATE_SUCCESS,
    SCHOOL_UPDATE_FAIL,
    SCHOOL_DELETE_SUCCESS,
    SCHOOL_DELETE_FAIL,
    SCHOOL_EDIT
} from "../types/school";

let schoolStore = JSON.parse(localStorage.getItem('school'))

const initialState = {
    isLoading: false,
    schools: schoolStore,
    school:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newSchool = [...aluu];
    newSchool.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newSchool;
}


export default function(state = initialState, action){
    switch (action.type) {
        case SCHOOL_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case SCHOOL_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case SCHOOL_GET_MULTIPLE:
            localStorage.setItem('school', JSON.stringify(action.payload));
            return {
                ...state,
                schools : action.payload,
                msg:'DONE!!!'
            };
        case SCHOOL_GET_ONE:
            let all = [...state.schools];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                school : ses,
                MSG:"DONE!!!"
            };
        case SCHOOL_REGISTER_SUCCESS:
            localStorage.setItem('school', JSON.stringify([...state.schools, action.payload]));
            return {
                ...state,
                schools: [...state.schools, action.payload],
                msg:action.msg
            }; 
        case SCHOOL_ACTIVATE_SUCCESS:
            let ac = changeState(state.schools, action.payload);
            localStorage.setItem('school', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                schools: ac
            }
        case SCHOOL_DELETE_SUCCESS:
            let rem = state.schools.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('school', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                schools: rem
            }
        case SCHOOL_UPDATE_SUCCESS:
            const findInd = state.schools.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.schools];
            newState[findInd] = action.payload;
            localStorage.setItem('school', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                schools : newState
            }; 
        case SCHOOL_LOADING_ERROR:
        case SCHOOL_ACTIVATE_FAIL:
        case SCHOOL_REGISTER_FAIL:
        case SCHOOL_DELETE_FAIL:
        case SCHOOL_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
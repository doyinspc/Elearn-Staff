import {
    SEMESTER_GET_MULTIPLE,
    SEMESTER_GET_ONE,
    SEMESTER_REGISTER_SUCCESS,
    SEMESTER_REGISTER_FAIL,
    SEMESTER_LOADING,
    SEMESTER_LOADING_ERROR,
    SEMESTER_ACTIVATE_FAIL,
    SEMESTER_ACTIVATE_SUCCESS,
    SEMESTER_UPDATE_SUCCESS,
    SEMESTER_UPDATE_FAIL,
    SEMESTER_DELETE_SUCCESS,
    SEMESTER_DELETE_FAIL,
    SEMESTER_EDIT
} from "../types/semester";

let semesterStore = JSON.parse(localStorage.getItem('semesters'))

const initialState = {
    isLoading: false,
    semesters: semesterStore,
    semester:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newSemester = [...aluu];
    newSemester.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newSemester;
}


export default function(state = initialState, action){
    switch (action.type) {
        case SEMESTER_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case SEMESTER_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case SEMESTER_GET_MULTIPLE:
            localStorage.setItem('semester', JSON.stringify(action.payload));
            return {
                ...state,
                semesters : action.payload,
                msg:'DONE!!!'
            };
        case SEMESTER_GET_ONE:
            let all = [...state.semesters];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                semester : ses,
                MSG:"DONE!!!"
            };
        case SEMESTER_REGISTER_SUCCESS:
            localStorage.setItem('semester', JSON.stringify([...state.semesters, action.payload]));
            return {
                ...state,
                semesters: [...state.semesters, action.payload],
                msg:action.msg
            }; 
        case SEMESTER_ACTIVATE_SUCCESS:
            let ac = changeState(state.semesters, action.payload);
            localStorage.setItem('semester', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                semesters: ac
            }
        case SEMESTER_DELETE_SUCCESS:
            let rem = state.semesters.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('semester', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                semesters: rem
            }
        case SEMESTER_UPDATE_SUCCESS:
            const findInd = state.semesters.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.semesters];
            newState[findInd] = action.payload;
            localStorage.setItem('semester', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                semesters : newState
            }; 
        case SEMESTER_LOADING_ERROR:
        case SEMESTER_ACTIVATE_FAIL:
        case SEMESTER_REGISTER_FAIL:
        case SEMESTER_DELETE_FAIL:
        case SEMESTER_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
import {
    GRADE_GET_MULTIPLE,
    GRADE_GET_ONE,
    GRADE_REGISTER_SUCCESS,
    GRADE_REGISTER_FAIL,
    GRADE_LOADING,
    GRADE_LOADING_ERROR,
    GRADE_ACTIVATE_FAIL,
    GRADE_ACTIVATE_SUCCESS,
    GRADE_UPDATE_SUCCESS,
    GRADE_UPDATE_FAIL,
    GRADE_DELETE_SUCCESS,
    GRADE_DELETE_FAIL,
    GRADE_EDIT
} from "../types/grade";

let gradeStore = JSON.parse(localStorage.getItem('grade'))

const initialState = {
    isLoading: false,
    grades: gradeStore,
    grade:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newGrade = [...aluu];
    newGrade.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newGrade;
}


export default function(state = initialState, action){
    switch (action.type) {
        case GRADE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case GRADE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case GRADE_GET_MULTIPLE:
            localStorage.setItem('grade', JSON.stringify(action.payload));
            return {
                ...state,
                grades : action.payload,
                msg:'DONE!!!'
            };
        case GRADE_GET_ONE:
            let all = [...state.grades];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                grade : ses,
                MSG:"DONE!!!"
            };
        case GRADE_REGISTER_SUCCESS:
            localStorage.setItem('grade', JSON.stringify([...state.grades, action.payload]));
            return {
                ...state,
                grades: [...state.grades, action.payload],
                msg:action.msg
            }; 
        case GRADE_ACTIVATE_SUCCESS:
            let ac = changeState(state.grades, action.payload);
            localStorage.setItem('grade', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                grades: ac
            }
        case GRADE_DELETE_SUCCESS:
            let rem = state.grades.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('grade', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                grades: rem
            }
        case GRADE_UPDATE_SUCCESS:
            const findInd = state.grades.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.grades];
            newState[findInd] = action.payload;
            localStorage.setItem('grade', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                grades : newState
            }; 
        case GRADE_LOADING_ERROR:
        case GRADE_ACTIVATE_FAIL:
        case GRADE_REGISTER_FAIL:
        case GRADE_DELETE_FAIL:
        case GRADE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
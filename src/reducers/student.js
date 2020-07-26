import {
    STUDENT_GET_MULTIPLE,
    STUDENT_GET_ONE,
    STUDENT_REGISTER_SUCCESS,
    STUDENT_REGISTER_FAIL,
    STUDENT_LOADING,
    STUDENT_LOADING_ERROR,
    STUDENT_ACTIVATE_FAIL,
    STUDENT_ACTIVATE_SUCCESS,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAIL,
    STUDENT_EDIT
} from "../types/student";

let studentStore = JSON.parse(localStorage.getItem('student'))

const initialState = {
    isLoading: false,
    students: studentStore,
    student:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newStudent = [...aluu];
    newStudent.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newStudent;
}


export default function(state = initialState, action){
    switch (action.type) {
        case STUDENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case STUDENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case STUDENT_GET_MULTIPLE:
            localStorage.setItem('student', JSON.stringify(action.payload));
            return {
                ...state,
                students : action.payload,
                msg:'DONE!!!'
            };
        case STUDENT_GET_ONE:
            let all = [...state.students];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                student : ses,
                MSG:"DONE!!!"
            };
        case STUDENT_REGISTER_SUCCESS:
            localStorage.setItem('student', JSON.stringify([...state.students, action.payload]));
            return {
                ...state,
                students: [...state.students, action.payload],
                msg:action.msg
            }; 
        case STUDENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.students, action.payload);
            localStorage.setItem('student', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                students: ac
            }
        case STUDENT_DELETE_SUCCESS:
            let rem = state.students.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('student', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                students: rem
            }
        case STUDENT_UPDATE_SUCCESS:
            const findInd = state.students.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.students];
            newState[findInd] = action.payload;
            localStorage.setItem('student', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                students : newState
            }; 
        case STUDENT_LOADING_ERROR:
        case STUDENT_ACTIVATE_FAIL:
        case STUDENT_REGISTER_FAIL:
        case STUDENT_DELETE_FAIL:
        case STUDENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
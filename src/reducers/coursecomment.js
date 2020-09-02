import {
    COURSECOMMENT_GET_MULTIPLE,
    COURSECOMMENT_GET_ONE,
    COURSECOMMENT_REGISTER_SUCCESS,
    COURSECOMMENT_REGISTER_FAIL,
    COURSECOMMENT_LOADING,
    COURSECOMMENT_LOADING_ERROR,
    COURSECOMMENT_ACTIVATE_FAIL,
    COURSECOMMENT_ACTIVATE_SUCCESS,
    COURSECOMMENT_UPDATE_SUCCESS,
    COURSECOMMENT_UPDATE_FAIL,
    COURSECOMMENT_DELETE_SUCCESS,
    COURSECOMMENT_DELETE_FAIL,
    COURSECOMMENT_EDIT
} from "../types/coursecomment";

let coursecommentStore = JSON.parse(localStorage.getItem('coursecomment'))

const initialState = {
    isLoading: false,
    coursecomments: coursecommentStore && Array.isArray(coursecommentStore) && coursecommentStore.lenght ? coursecommentStore : [],
    coursecomment:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCoursecomment = [...aluu];
    newCoursecomment.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCoursecomment;
}


export default function(state = initialState, action){
    switch (action.type) {
        case COURSECOMMENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COURSECOMMENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COURSECOMMENT_GET_MULTIPLE:
            localStorage.setItem('coursecomment', JSON.stringify(action.payload));
            return {
                ...state,
                coursecomments : action.payload,
                msg:'DONE!!!'
            };
        case COURSECOMMENT_GET_ONE:
            let all = [...state.coursecomments];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                coursecomment : ses,
                MSG:"DONE!!!"
            };
        case COURSECOMMENT_REGISTER_SUCCESS:
            localStorage.setItem('coursecomment', JSON.stringify([...state.coursecomments, action.payload]));
            return {
                ...state,
                coursecomments: [...state.coursecomments, action.payload],
                msg:action.msg
            }; 
        case COURSECOMMENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.coursecomments, action.payload);
            localStorage.setItem('coursecomment', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                coursecomments: ac
            }
        case COURSECOMMENT_DELETE_SUCCESS:
            let rem = state.coursecomments.filter(cat =>cat.id != action.payload);
            localStorage.setItem('coursecomment', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                coursecomments: rem
            }
        case COURSECOMMENT_UPDATE_SUCCESS:
            const findInd = state.coursecomments.findIndex(cat => parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.coursecomments];
            newState[findInd] = action.payload;
            localStorage.setItem('coursecomment', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                coursecomments : newState,
                coursecomment:action.payload
            }; 
        case COURSECOMMENT_LOADING_ERROR:
        case COURSECOMMENT_ACTIVATE_FAIL:
        case COURSECOMMENT_REGISTER_FAIL:
        case COURSECOMMENT_DELETE_FAIL:
        case COURSECOMMENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
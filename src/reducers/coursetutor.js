import {
    COURSETUTOR_GET_MULTIPLE,
    COURSETUTOR_GET_ONE,
    COURSETUTOR_REGISTER_SUCCESS,
    COURSETUTOR_REGISTER_FAIL,
    COURSETUTOR_LOADING,
    COURSETUTOR_LOADING_ERROR,
    COURSETUTOR_ACTIVATE_FAIL,
    COURSETUTOR_ACTIVATE_SUCCESS,
    COURSETUTOR_UPDATE_SUCCESS,
    COURSETUTOR_UPDATE_FAIL,
    COURSETUTOR_DELETE_SUCCESS,
    COURSETUTOR_DELETE_FAIL,
    COURSETUTOR_EDIT
} from "../types/coursetutor";

let coursetutorStore = JSON.parse(localStorage.getItem('coursetutor'))

const initialState = {
    isLoading: false,
    coursetutors: coursetutorStore && Array.isArray(coursetutorStore) && coursetutorStore.lenght ? coursetutorStore : [],
    coursetutor:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCoursetutor = [...aluu];
    newCoursetutor.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCoursetutor;
}


export default function(state = initialState, action){
    switch (action.type) {
        case COURSETUTOR_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COURSETUTOR_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COURSETUTOR_GET_MULTIPLE:
            let olds = [...state.coursetutors];
            let news = action.payload;
             
             let store = news.map(row =>{
                let av = olds.filter(r=>parseInt(r.id) === parseInt(row.id));
                if(av && Array.isArray(av) && av.length > 0)
                {
                    //console.log('available')
                 }else
                 {
                    return row;
                };  
                return null;
            })
            let sto = store.filter(r=>r != null);
            let oldss = [...olds, ...sto];
            localStorage.setItem('coursetutor', JSON.stringify(oldss));
            return {
                ...state,
                coursetutors : oldss,
                msg:'DONE!!!'
            };
        case COURSETUTOR_GET_ONE:
            let all = [...state.coursetutors];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                coursetutor : ses,
                MSG:"DONE!!!"
            };
        case COURSETUTOR_REGISTER_SUCCESS:
            localStorage.setItem('coursetutor', JSON.stringify([...state.coursetutors, action.payload]));
            return {
                ...state,
                coursetutors: [...state.coursetutors, action.payload],
                msg:action.msg
            }; 
        case COURSETUTOR_ACTIVATE_SUCCESS:
            let ac = changeState(state.coursetutors, action.payload);
            localStorage.setItem('coursetutor', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                coursetutors: ac
            }
        case COURSETUTOR_DELETE_SUCCESS:
            let rem = state.coursetutors.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('coursetutor', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                coursetutors: rem
            }
        case COURSETUTOR_UPDATE_SUCCESS:
            const findInd = state.coursetutors.findIndex(cat => parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.coursetutors];
            newState[findInd] = action.payload;
            localStorage.setItem('coursetutor', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                coursetutors : newState
            }; 
        case COURSETUTOR_LOADING_ERROR:
        case COURSETUTOR_ACTIVATE_FAIL:
        case COURSETUTOR_REGISTER_FAIL:
        case COURSETUTOR_DELETE_FAIL:
        case COURSETUTOR_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
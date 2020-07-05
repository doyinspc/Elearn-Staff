import {
    COURSEMODULE_GET_MULTIPLE,
    COURSEMODULE_GET_ONE,
    COURSEMODULE_REGISTER_SUCCESS,
    COURSEMODULE_REGISTER_FAIL,
    COURSEMODULE_LOADING,
    COURSEMODULE_LOADING_ERROR,
    COURSEMODULE_ACTIVATE_FAIL,
    COURSEMODULE_ACTIVATE_SUCCESS,
    COURSEMODULE_UPDATE_SUCCESS,
    COURSEMODULE_UPDATE_FAIL,
    COURSEMODULE_DELETE_SUCCESS,
    COURSEMODULE_DELETE_FAIL,
    COURSEMODULE_EDIT
} from "../types/coursemodule";

let coursemoduleStore = JSON.parse(localStorage.getItem('coursemodule'))

const initialState = {
    isLoading: false,
    coursemodules: coursemoduleStore && Array.isArray(coursemoduleStore) && coursemoduleStore.lenght ? coursemoduleStore : [],
    coursemodule:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCoursemodule = [...aluu];
    newCoursemodule.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCoursemodule;
}


export default function(state = initialState, action){
    switch (action.type) {
        case COURSEMODULE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COURSEMODULE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COURSEMODULE_GET_MULTIPLE:
            let olds = [...state.coursemodules];
            let news = action.payload;
             
             let store = news.map(row =>{
                let av = olds.filter(r=>parseInt(r.id) === parseInt(row.id));
                if(av && Array.isArray(av) && av.length > 0){
                    console.log('available')
                 }else{
                    return row;
                };
                
                return null;
            })
            let sto = store.filter(r=>r != null);
            let oldss = [...olds, ...sto];
            localStorage.setItem('coursemodule', JSON.stringify(oldss));
            return {
                ...state,
                coursemodules : oldss,
                msg:'DONE!!!'
            };
        case COURSEMODULE_GET_ONE:
            let all = [...state.coursemodules];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                coursemodule : ses,
                MSG:"DONE!!!"
            };
        case COURSEMODULE_REGISTER_SUCCESS:
            localStorage.setItem('coursemodule', JSON.stringify([...state.coursemodules, action.payload]));
            return {
                ...state,
                coursemodules: [...state.coursemodules, action.payload],
                msg:action.msg
            }; 
        case COURSEMODULE_ACTIVATE_SUCCESS:
            let ac = changeState(state.coursemodules, action.payload);
            localStorage.setItem('coursemodule', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                coursemodules: ac
            }
        case COURSEMODULE_DELETE_SUCCESS:
            let rem = state.coursemodules.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('coursemodule', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                coursemodules: rem
            }
        case COURSEMODULE_UPDATE_SUCCESS:
            const findInd = state.coursemodules.findIndex(cat => parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.coursemodules];
            newState[findInd] = action.payload;
            localStorage.setItem('coursemodule', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                coursemodules : newState
            }; 
        case COURSEMODULE_LOADING_ERROR:
        case COURSEMODULE_ACTIVATE_FAIL:
        case COURSEMODULE_REGISTER_FAIL:
        case COURSEMODULE_DELETE_FAIL:
        case COURSEMODULE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
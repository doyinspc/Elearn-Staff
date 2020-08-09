import {
    COURSESCORE_GET_MULTIPLE,
    COURSESCORE_GET_ONE,
    COURSESCORE_REGISTER_SUCCESS,
    COURSESCORE_REGISTER_FAIL,
    COURSESCORE_LOADING,
    COURSESCORE_LOADING_ERROR,
    COURSESCORE_ACTIVATE_FAIL,
    COURSESCORE_ACTIVATE_SUCCESS,
    COURSESCORE_UPDATE_SUCCESS,
    COURSESCORE_UPDATE_FAIL,
    COURSESCORE_DELETE_SUCCESS,
    COURSESCORE_DELETE_FAIL,
    COURSESCORE_EDIT
} from "../types/coursescore";

let coursescoreStore = JSON.parse(localStorage.getItem('coursescore'))

const initialState = {
    isLoading: false,
    coursescores: coursescoreStore && Array.isArray(coursescoreStore) && coursescoreStore.lenght ? coursescoreStore : [],
    coursescore:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCoursescore = [...aluu];
    newCoursescore.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCoursescore;
}


export default function(state = initialState, action){
    switch (action.type) {
        case COURSESCORE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COURSESCORE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COURSESCORE_GET_MULTIPLE:
            let olds = [...state.coursescores];
            let news = action.payload;
             
             let store = news.map(row =>{
                let av = olds.filter(r=>parseInt(r.id) === parseInt(row.id));
                if(av && Array.isArray(av) && av.length > 0){
                    
                 }else{
                    return row;
                };
                
                return null;
            })
            let sto = store.filter(r=>r != null);
            let oldss = [...olds, ...sto];
            localStorage.setItem('coursescore', JSON.stringify(action.payload));
            return {
                ...state,
                coursescores : action.payload,
                msg:'DONE!!!'
            };
        case COURSESCORE_GET_ONE:
            let all = [...state.coursescores];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                coursescore : ses,
                MSG:"DONE!!!"
            };
        case COURSESCORE_REGISTER_SUCCESS:
            localStorage.setItem('coursescore', JSON.stringify([...state.coursescores, action.payload]));
            return {
                ...state,
                coursescores: [...state.coursescores, action.payload],
                msg:action.msg
            }; 
        case COURSESCORE_ACTIVATE_SUCCESS:
            let ac = changeState(state.coursescores, action.payload);
            localStorage.setItem('coursescore', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                coursescores: ac
            }
        case COURSESCORE_DELETE_SUCCESS:
            let rem = state.coursescores.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('coursescore', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                coursescores: rem
            }
        case COURSESCORE_UPDATE_SUCCESS:
            const findInd = state.coursescores.findIndex(cat => parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.coursescores];
            newState[findInd] = action.payload;
            localStorage.setItem('coursescore', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                coursescores : newState,
                coursescore:action.payload
            }; 
        case COURSESCORE_LOADING_ERROR:
        case COURSESCORE_ACTIVATE_FAIL:
        case COURSESCORE_REGISTER_FAIL:
        case COURSESCORE_DELETE_FAIL:
        case COURSESCORE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
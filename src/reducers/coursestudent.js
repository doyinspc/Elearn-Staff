import {
    COURSESTUDENT_GET_MULTIPLE,
    COURSESTUDENT_GET_ONE,
    COURSESTUDENT_REGISTER_SUCCESS,
    COURSESTUDENT_REGISTER_FAIL,
    COURSESTUDENT_LOADING,
    COURSESTUDENT_LOADING_ERROR,
    COURSESTUDENT_ACTIVATE_FAIL,
    COURSESTUDENT_ACTIVATE_SUCCESS,
    COURSESTUDENT_UPDATE_SUCCESS,
    COURSESTUDENT_UPDATE_FAIL,
    COURSESTUDENT_DELETE_SUCCESS,
    COURSESTUDENT_DELETE_FAIL,
    COURSESTUDENT_EDIT
} from "../types/coursestudent";

let coursestudentStore = JSON.parse(localStorage.getItem('coursestudent'));

const initialState = {
    isLoading: false,
    coursestudents: coursestudentStore && Array.isArray(coursestudentStore) && coursestudentStore.lenght ? coursestudentStore : [],
    coursestudent:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCoursestudent = [...aluu];
    newCoursestudent.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCoursestudent;
}


export default function(state = initialState, action){
    switch (action.type) {
        case COURSESTUDENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COURSESTUDENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COURSESTUDENT_GET_MULTIPLE:
            let olds = [...state.coursestudents];
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
            localStorage.setItem('coursestudent', JSON.stringify(oldss));
            return {
                ...state,
                coursestudents : oldss,
                msg:'DONE!!!'
            };
        case COURSESTUDENT_GET_ONE:
            let all = [...state.coursestudents];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                coursestudent : ses,
                MSG:"DONE!!!"
            };
        case COURSESTUDENT_REGISTER_SUCCESS:
            localStorage.setItem('coursestudent', JSON.stringify([...state.coursestudents, action.payload]));
            return {
                ...state,
                coursestudents: [...state.coursestudents, action.payload],
                msg:action.msg
            }; 
        case COURSESTUDENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.coursestudents, action.payload);
            localStorage.setItem('coursestudent', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                coursestudents: ac
            }
        case COURSESTUDENT_DELETE_SUCCESS:
            let rem = state.coursestudents.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('coursestudent', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                coursestudents: rem
            }
        case COURSESTUDENT_UPDATE_SUCCESS:
            const findInd = state.coursestudents.findIndex(cat => parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.coursestudents];
            newState[findInd] = action.payload;
            localStorage.setItem('coursestudent', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                coursestudents : newState
            }; 
        case COURSESTUDENT_LOADING_ERROR:
        case COURSESTUDENT_ACTIVATE_FAIL:
        case COURSESTUDENT_REGISTER_FAIL:
        case COURSESTUDENT_DELETE_FAIL:
        case COURSESTUDENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
import {
    COURSEPROGRESS_GET_ONE,
    COURSEPROGRESS_GET_MULTIPLE,
    COURSEPROGRESS_GET_MATERIAL,
    COURSEPROGRESS_REGISTER_SUCCESS,
    COURSEPROGRESS_REGISTER_FAIL,
    COURSEPROGRESS_LOADING,
    COURSEPROGRESS_LOADING_ERROR,
    COURSEPROGRESS_UPDATE_SUCCESS,
    COURSEPROGRESS_UPDATE_FAIL,
    COURSEPROGRESS_DELETE_SUCCESS,
    COURSEPROGRESS_LOADING_MATERIAL_FAIL,
    COURSEPROGRESS_DELETE_FAIL,
    COURSEPROGRESS_EDIT,
    COURSEPROGRESS_ACTIVATE_FAIL,
    COURSEPROGRESS_ACTIVATE_SUCCESS
} from "../types/courseprogress";

let courseprogressStore = JSON.parse(localStorage.getItem('courseprogress'))

const initialState = {
    isLoading: false,
    courseprogresss: courseprogressStore && Array.isArray(courseprogressStore) && courseprogressStore.lenght ? courseprogressStore : [],
    courseprogress:{},
    materials:[],
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newCourseprogress = [...aluu];
    newCourseprogress.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCourseprogress;
}


export default function(state = initialState, action){
    switch (action.type) {
        case COURSEPROGRESS_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case COURSEPROGRESS_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case COURSEPROGRESS_GET_MATERIAL:
            return {
                ...state,
                materials : action.payload
        };
        case COURSEPROGRESS_GET_MULTIPLE:
            let olds = [...state.courseprogresss];
            let news = action.payload;
             
             let store = news.map(row =>{
                let av = olds.filter(r=>parseInt(r.id) === parseInt(row.id));
                if(av && Array.isArray(av) && av.length > 0){
                    console.log('available')
                 }else{
                    return row;
                };
                
            })
           
            let oldss = [...olds, ...store];
            localStorage.setItem('courseprogress', JSON.stringify(oldss));
            return {
                ...state,
                courseprogresss : oldss,
                msg:'DONE!!!'
            };
        case COURSEPROGRESS_GET_ONE:
            let all = [...state.courseprogresss];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            return {
                ...state,
                courseprogress : ses,
                MSG:"DONE!!!"
            };
        case COURSEPROGRESS_REGISTER_SUCCESS:
            localStorage.setItem('courseprogress', JSON.stringify([...state.courseprogresss, action.payload]));
            return {
                ...state,
                courseprogresss: [...state.courseprogresss, action.payload],
                msg:action.msg
            }; 
        case COURSEPROGRESS_ACTIVATE_SUCCESS:
            let ac = changeState(state.courseprogresss, action.payload);
            localStorage.setItem('courseprogress', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                courseprogresss: ac
            }
        case COURSEPROGRESS_DELETE_SUCCESS:
            let rem = state.courseprogresss.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('courseprogress', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                courseprogresss: rem
            }
        case COURSEPROGRESS_UPDATE_SUCCESS:
            const findInd = state.courseprogresss.findIndex(cat => parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.courseprogresss];
            newState[findInd] = action.payload;
            localStorage.setItem('courseprogress', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                courseprogresss : newState
            }; 
        case COURSEPROGRESS_LOADING_ERROR:
        case COURSEPROGRESS_ACTIVATE_FAIL:
        case COURSEPROGRESS_REGISTER_FAIL:
        case COURSEPROGRESS_DELETE_FAIL:
        case COURSEPROGRESS_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
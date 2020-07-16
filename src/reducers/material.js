import {
    MATERIAL_GET_MULTIPLE,
    MATERIAL_GET_ONE,
    MATERIAL_REGISTER_SUCCESS,
    MATERIAL_REGISTER_FAIL,
    MATERIAL_LOADING,
    MATERIAL_LOADING_ERROR,
    MATERIAL_ACTIVATE_FAIL,
    MATERIAL_ACTIVATE_SUCCESS,
    MATERIAL_UPDATE_SUCCESS,
    MATERIAL_UPDATE_FAIL,
    MATERIAL_DELETE_SUCCESS,
    MATERIAL_DELETE_FAIL,
    MATERIAL_EDIT
} from "../types/material";

let materialStore = JSON.parse(localStorage.getItem('material'))

const initialState = {
    isLoading: false,
    materials: materialStore,
    material:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newMaterial = [...aluu];
    newMaterial.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newMaterial;
}


export default function(state = initialState, action){
    switch (action.type) {
        case MATERIAL_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case MATERIAL_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MATERIAL_GET_MULTIPLE:
            localStorage.setItem('material', JSON.stringify(action.payload));
            return {
                ...state,
                materials : action.payload,
                msg:'DONE!!!'
            };
        case MATERIAL_GET_ONE:
            let all = [...state.materials];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                material : ses,
                MSG:"DONE!!!"
            };
        case MATERIAL_REGISTER_SUCCESS:
            localStorage.setItem('material', JSON.stringify([...state.materials, action.payload]));
            return {
                ...state,
                materials: [...state.materials, action.payload],
                msg:action.msg
            }; 
        case MATERIAL_ACTIVATE_SUCCESS:
            let ac = changeState(state.materials, action.payload);
            localStorage.setItem('material', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                materials: ac
            }
        case MATERIAL_DELETE_SUCCESS:
            let rem = state.materials.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('material', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                materials: rem
            }
        case MATERIAL_UPDATE_SUCCESS:
            const findInd = state.materials.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.materials];
            newState[findInd] = action.payload;
            localStorage.setItem('material', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                materials : newState
            }; 
        case MATERIAL_LOADING_ERROR:
        case MATERIAL_ACTIVATE_FAIL:
        case MATERIAL_REGISTER_FAIL:
        case MATERIAL_DELETE_FAIL:
        case MATERIAL_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
import axios from 'axios';
import {
    LEVEL_GET,
    LEVEL_GET_ONE,
    LEVEL_GET_MULTIPLE,
    LEVEL_REGISTER_SUCCESS,
    LEVEL_REGISTER_FAIL,
    LEVEL_LOADING,
    LEVEL_LOADING_ERROR,
    LEVEL_UPDATE_SUCCESS,
    LEVEL_UPDATE_FAIL,
    LEVEL_DELETE_SUCCESS,
    LEVEL_DELETE_FAIL,
    LEVEL_EDIT,
} from "./../types/level";
import { MAIN_TOKEN, API_PATHS } from './common';

let TABLE_NAME = 'datas';
const path = API_PATHS;
let axiosConfig = {
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
    }
  };
let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL LEVEL 
export const getLevels = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    params.cat = 'group';
    dispatch({type : LEVEL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: LEVEL_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : LEVEL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE LEVEL 
export const getLevel = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : LEVEL_GET_ONE,
        payload: id
    });  
};
//LEVEL DELETE
export const deleteLevel = data => (dispatch, getState) =>{
    dispatch({type : LEVEL_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: LEVEL_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : LEVEL_DELETE_FAIL,
                payload : err
            })
        })
        
}
//LEVEL REGISTER
export const registerLevel = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: LEVEL_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : LEVEL_REGISTER_FAIL,
                payload: err
            })
        })
};
 //LEVEL UPDATE
export const updateLevel = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: LEVEL_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : LEVEL_UPDATE_FAIL,
                payload: err
            })
        })
};

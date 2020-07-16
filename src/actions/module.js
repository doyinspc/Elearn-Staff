import axios from 'axios';
import {
    MODULE_GET,
    MODULE_GET_ONE,
    MODULE_GET_MULTIPLE,
    MODULE_REGISTER_SUCCESS,
    MODULE_REGISTER_FAIL,
    MODULE_LOADING,
    MODULE_LOADING_ERROR,
    MODULE_UPDATE_SUCCESS,
    MODULE_UPDATE_FAIL,
    MODULE_DELETE_SUCCESS,
    MODULE_DELETE_FAIL,
    MODULE_EDIT,
} from "./../types/module";
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
//GET ALL MODULE 
export const getModules = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : MODULE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: MODULE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : MODULE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE MODULE 
export const getModule = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : MODULE_GET_ONE,
        payload: id
    });  
};
//MODULE DELETE
export const deleteModule = data => (dispatch, getState) =>{
    dispatch({type : MODULE_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: MODULE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MODULE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//MODULE REGISTER
export const registerModule = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MODULE_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MODULE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //MODULE UPDATE
export const updateModule = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MODULE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MODULE_UPDATE_FAIL,
                payload: err
            })
        })
};

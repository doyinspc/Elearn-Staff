import axios from 'axios';
import {
    MATERIAL_GET,
    MATERIAL_GET_ONE,
    MATERIAL_GET_MULTIPLE,
    MATERIAL_REGISTER_SUCCESS,
    MATERIAL_REGISTER_FAIL,
    MATERIAL_LOADING,
    MATERIAL_LOADING_ERROR,
    MATERIAL_UPDATE_SUCCESS,
    MATERIAL_UPDATE_FAIL,
    MATERIAL_DELETE_SUCCESS,
    MATERIAL_DELETE_FAIL,
    MATERIAL_EDIT,
} from "./../types/material";
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
//GET ALL MATERIAL 
export const getMaterials = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : MATERIAL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: MATERIAL_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : MATERIAL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE MATERIAL 
export const getMaterial = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : MATERIAL_GET_ONE,
        payload: id
    });  
};
//MATERIAL DELETE
export const deleteMaterial = data => (dispatch, getState) =>{
    dispatch({type : MATERIAL_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: MATERIAL_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MATERIAL_DELETE_FAIL,
                payload : err
            })
        })
        
}
//MATERIAL REGISTER
export const registerMaterial = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MATERIAL_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MATERIAL_REGISTER_FAIL,
                payload: err
            })
        })
};
 //MATERIAL UPDATE
export const updateMaterial = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MATERIAL_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MATERIAL_UPDATE_FAIL,
                payload: err
            })
        })
};

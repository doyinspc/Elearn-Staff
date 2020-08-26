import axios from 'axios';
import {
    DEPARTMENT_GET,
    DEPARTMENT_GET_ONE,
    DEPARTMENT_GET_MULTIPLE,
    DEPARTMENT_REGISTER_SUCCESS,
    DEPARTMENT_REGISTER_FAIL,
    DEPARTMENT_LOADING,
    DEPARTMENT_LOADING_ERROR,
    DEPARTMENT_UPDATE_SUCCESS,
    DEPARTMENT_UPDATE_FAIL,
    DEPARTMENT_DELETE_SUCCESS,
    DEPARTMENT_DELETE_FAIL,
    DEPARTMENT_EDIT,
} from "./../types/department";
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
//GET ALL DEPARTMENT 
export const getDepartments = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : DEPARTMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: DEPARTMENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : DEPARTMENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE DEPARTMENT 
export const getDepartment = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : DEPARTMENT_GET_ONE,
        payload: id
    });  
};
//DEPARTMENT DELETE
export const deleteDepartment = dat => (dispatch, getState) =>{
        params.data = JSON.stringify(dat);
        params.cat = 'deleter';
        dispatch({type : DEPARTMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: DEPARTMENT_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : DEPARTMENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//DEPARTMENT REGISTER
export const registerDepartment = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: DEPARTMENT_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : DEPARTMENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //DEPARTMENT UPDATE
export const updateDepartment = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: DEPARTMENT_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : DEPARTMENT_UPDATE_FAIL,
                payload: err
            })
        })
};

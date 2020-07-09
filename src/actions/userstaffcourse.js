import axios from 'axios';
import {
    USERSTAFFCOURSE_GET,
    USERSTAFFCOURSE_GET_ONE,
    USERSTAFFCOURSE_GET_MULTIPLE,
    USERSTAFFCOURSE_REGISTER_SUCCESS,
    USERSTAFFCOURSE_REGISTER_FAIL,
    USERSTAFFCOURSE_LOADING,
    USERSTAFFCOURSE_LOADING_ERROR,
    USERSTAFFCOURSE_UPDATE_SUCCESS,
    USERSTAFFCOURSE_UPDATE_FAIL,
    USERSTAFFCOURSE_DELETE_SUCCESS,
    USERSTAFFCOURSE_DELETE_FAIL,
    USERSTAFFCOURSE_EDIT,
} from "../types/userstaffcourse";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'staffs';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USERSTAFFCOURSE 
export const getUserstaffcourses = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : USERSTAFFCOURSE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERSTAFFCOURSE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERSTAFFCOURSE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USERSTAFFCOURSE 
export const getUserstaffcourse = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERSTAFFCOURSE_GET_ONE,
        payload: id
    });  
};
//USERSTAFFCOURSE DELETE
export const deleteUserstaffcourse = data => (dispatch, getState) =>{
    dispatch({type : USERSTAFFCOURSE_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: USERSTAFFCOURSE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTAFFCOURSE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//USERSTAFFCOURSE REGISTER
export const registerUserstaffcourse = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERSTAFFCOURSE_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTAFFCOURSE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //USERSTAFFCOURSE UPDATE
export const updateUserstaffcourse = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERSTAFFCOURSE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTAFFCOURSE_UPDATE_FAIL,
                payload: err
            })
        })
};

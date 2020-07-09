import axios from 'axios';
import {
    USERSTUDENT_GET,
    USERSTUDENT_GET_ONE,
    USERSTUDENT_GET_MULTIPLE,
    USERSTUDENT_REGISTER_SUCCESS,
    USERSTUDENT_REGISTER_FAIL,
    USERSTUDENT_LOADING,
    USERSTUDENT_LOADING_ERROR,
    USERSTUDENT_UPDATE_SUCCESS,
    USERSTUDENT_UPDATE_FAIL,
    USERSTUDENT_DELETE_SUCCESS,
    USERSTUDENT_DELETE_FAIL,
    USERSTUDENT_EDIT,
} from "../types/userstudent";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'staffs';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USERSTUDENT 
export const getUserstudents = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'all';
    dispatch({type : USERSTUDENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERSTUDENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERSTUDENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USERSTUDENT 
export const getUserstudent = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERSTUDENT_GET_ONE,
        payload: id
    });  
};
//USERSTUDENT DELETE
export const deleteUserstudent = data => (dispatch, getState) =>{
    dispatch({type : USERSTUDENT_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: USERSTUDENT_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTUDENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//USERSTUDENT REGISTER
export const registerUserstudent = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERSTUDENT_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTUDENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //USERSTUDENT UPDATE
export const updateUserstudent = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERSTUDENT_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTUDENT_UPDATE_FAIL,
                payload: err
            })
        })
};

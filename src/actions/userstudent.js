import axios from 'axios';
import {
    USERSTUDENT_LOGIN,
    USERSTUDENT_LOGIN_ERROR,
    USERSTUDENT_LOGOUT_SUCCESS,
    USERSTUDENT_LOGOUT_FAIL,
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

let TABLE_NAME = 'students';
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
export const getUserstudentLogin = data => (dispatch, getState) => {
    //SET PAGE LOADING
    data.cat = 'login';
    data.table = 'students';
    const fd = new FormData();
    fd.append('username' , data.username);
    fd.append('password' , data.password);
    fd.append('cat' , 'login');
    fd.append('table' , 'students');
    
    dispatch({type : USERSTUDENT_LOADING});
        axios.post(path, fd, axiosConfig1)
            .then(res => {                                                                                                                                                                                                                                      
                dispatch({
                    type: USERSTUDENT_LOGIN,
                    payload: res.data.data,
                    token: res.data.token
                })
            })
            .catch(err => {
                
                dispatch({
                    type : USERSTUDENT_LOGIN_ERROR,
                    payload:err
                })
            })
};
export const getUserstudentLogout = () => (dispatch, getState) => {
    dispatch({
        type: USERSTUDENT_LOGOUT_SUCCESS
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
    dispatch({type : USERSTUDENT_LOADING});
    axios.post(path, data, axiosConfig1)
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

//USERSTUDENT REGISTER
export const registerUserstudentPost = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USERSTUDENT_LOGIN,
                payload: res.data.data,
                token: res.data.token
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTUDENT_UPDATE_FAIL,
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

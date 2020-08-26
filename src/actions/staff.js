import axios from 'axios';
import {
    STAFF_GET,
    STAFF_GET_ONE,
    STAFF_GET_MULTIPLE,
    STAFF_REGISTER_SUCCESS,
    STAFF_REGISTER_FAIL,
    STAFF_LOADING,
    STAFF_LOADING_ERROR,
    STAFF_UPDATE_SUCCESS,
    STAFF_UPDATE_FAIL,
    STAFF_DELETE_SUCCESS,
    STAFF_DELETE_FAIL,
    STAFF_EDIT,
} from "./../types/staff";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'staffs';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL STAFF 
export const getStaffs = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(dat);
    params.cat = 'group';
    dispatch({type : STAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFF_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFF_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STAFF 
export const getStaffsClass = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(dat);
    params.cat = 'staffclass';
    dispatch({type : STAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFF_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFF_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STAFF 
export const getStaffsCourse = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(dat);
    params.cat = 'staffclass';
    dispatch({type : STAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STAFF_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STAFF_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STAFF 
export const getStaff = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STAFF_GET_ONE,
        payload: id
    });  
};
//STAFF DELETE
export const deleteStaff = dat => (dispatch, getState) =>{
        params.data = JSON.stringify(dat);
        params.cat = 'deleter';
        axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFF_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : STAFF_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STAFF REGISTER
export const registerStaff = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFF_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFF_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STAFF UPDATE
export const updateStaff = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STAFF_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFF_UPDATE_FAIL,
                payload: err
            })
        })
};

//STAFF UPDATE
export const updateStaffs = (data,id) => (dispatch, getState) => {
    //body
    params.data = JSON.stringify(data);
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STAFF_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STAFF_UPDATE_FAIL,
                payload: err
            })
        })
};

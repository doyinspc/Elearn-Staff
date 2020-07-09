import axios from 'axios';
import {
    USERSTAFF_GET,
    USERSTAFF_GET_ONE,
    USERSTAFF_GET_MULTIPLE,
    USERSTAFF_REGISTER_SUCCESS,
    USERSTAFF_REGISTER_FAIL,
    USERSTAFF_LOADING,
    USERSTAFF_LOADING_ERROR,
    USERSTAFF_UPDATE_SUCCESS,
    USERSTAFF_UPDATE_FAIL,
    USERSTAFF_DELETE_SUCCESS,
    USERSTAFF_DELETE_FAIL,
    USERSTAFF_EDIT,
} from "../types/userstaff";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'staffs';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USERSTAFF 
export const getUserstaffs = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'all';
    dispatch({type : USERSTAFF_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERSTAFF_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERSTAFF_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USERSTAFF 
export const getUserstaff = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERSTAFF_GET_ONE,
        payload: id
    });  
};
//USERSTAFF DELETE
export const deleteUserstaff = data => (dispatch, getState) =>{
    dispatch({type : USERSTAFF_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: USERSTAFF_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTAFF_DELETE_FAIL,
                payload : err
            })
        })
        
}
//USERSTAFF REGISTER
export const registerUserstaff = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERSTAFF_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTAFF_REGISTER_FAIL,
                payload: err
            })
        })
};
 //USERSTAFF UPDATE
export const updateUserstaff = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERSTAFF_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTAFF_UPDATE_FAIL,
                payload: err
            })
        })
};

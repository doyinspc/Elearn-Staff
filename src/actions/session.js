import axios from 'axios';
import {
    SESSION_GET,
    SESSION_GET_ONE,
    SESSION_GET_MULTIPLE,
    SESSION_REGISTER_SUCCESS,
    SESSION_REGISTER_FAIL,
    SESSION_LOADING,
    SESSION_LOADING_ERROR,
    SESSION_UPDATE_SUCCESS,
    SESSION_UPDATE_FAIL,
    SESSION_DELETE_SUCCESS,
    SESSION_DELETE_FAIL,
    SESSION_EDIT,
} from "../types/session";
import { MAIN_TOKEN, API_PATHS } from './common';

let TABLE_NAME = 'sessions';
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
//GET ALL SESSION 
export const getSessions = data => (dispatch, getState) => {
    //SET PAGE LOADING
   
    dispatch({type : SESSION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: SESSION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : SESSION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE SESSION 
export const getSession = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : SESSION_GET_ONE,
        payload: id
    });  
};
//SESSION DELETE
export const deleteSession = data => (dispatch, getState) =>{
    dispatch({type : SESSION_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: SESSION_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SESSION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//SESSION REGISTER
export const registerSession = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SESSION_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SESSION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //SESSION UPDATE
export const updateSession = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SESSION_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SESSION_UPDATE_FAIL,
                payload: err
            })
        })
};

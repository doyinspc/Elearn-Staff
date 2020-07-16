import axios from 'axios';
import {
    SCHOOL_GET,
    SCHOOL_GET_ONE,
    SCHOOL_GET_MULTIPLE,
    SCHOOL_REGISTER_SUCCESS,
    SCHOOL_REGISTER_FAIL,
    SCHOOL_LOADING,
    SCHOOL_LOADING_ERROR,
    SCHOOL_UPDATE_SUCCESS,
    SCHOOL_UPDATE_FAIL,
    SCHOOL_DELETE_SUCCESS,
    SCHOOL_DELETE_FAIL,
    SCHOOL_EDIT,
} from "./../types/school";
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
//GET ALL SCHOOL 
export const getSchools = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : SCHOOL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: SCHOOL_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : SCHOOL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE SCHOOL 
export const getSchool = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : SCHOOL_GET_ONE,
        payload: id
    });  
};
//SCHOOL DELETE
export const deleteSchool = data => (dispatch, getState) =>{
    dispatch({type : SCHOOL_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: SCHOOL_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SCHOOL_DELETE_FAIL,
                payload : err
            })
        })
        
}
//SCHOOL REGISTER
export const registerSchool = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SCHOOL_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SCHOOL_REGISTER_FAIL,
                payload: err
            })
        })
};
 //SCHOOL UPDATE
export const updateSchool = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SCHOOL_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SCHOOL_UPDATE_FAIL,
                payload: err
            })
        })
};

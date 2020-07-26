import axios from 'axios';
import {
    COURSEMODULE_GET,
    COURSEMODULE_GET_ONE,
    COURSEMODULE_GET_MULTIPLE,
    COURSEMODULE_REGISTER_SUCCESS,
    COURSEMODULE_REGISTER_FAIL,
    COURSEMODULE_LOADING,
    COURSEMODULE_LOADING_ERROR,
    COURSEMODULE_UPDATE_SUCCESS,
    COURSEMODULE_UPDATE_FAIL,
    COURSEMODULE_DELETE_SUCCESS,
    COURSEMODULE_DELETE_FAIL,
    COURSEMODULE_EDIT,
} from "./../types/coursemodule";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'course_modules';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL COURSEMODULE 
export const getCoursemodules = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    params.cat = 'select';
    dispatch({type : COURSEMODULE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSEMODULE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSEMODULE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE COURSEMODULE 
export const getCoursemodule = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSEMODULE_GET_ONE,
        payload: id
    });  
};
//COURSEMODULE DELETE
export const deleteCoursemodule = data => (dispatch, getState) =>{
    dispatch({type : COURSEMODULE_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: COURSEMODULE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMODULE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSEMODULE REGISTER
export const registerCoursemodule = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSEMODULE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMODULE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSEMODULE UPDATE
export const updateCoursemodule = (data) => (dispatch, getState) => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSEMODULE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMODULE_UPDATE_FAIL,
                payload: err
            })
        })
};

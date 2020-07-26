import axios from 'axios';
import {
    COURSESTUDENT_GET,
    COURSESTUDENT_GET_ONE,
    COURSESTUDENT_GET_MULTIPLE,
    COURSESTUDENT_REGISTER_SUCCESS,
    COURSESTUDENT_REGISTER_FAIL,
    COURSESTUDENT_LOADING,
    COURSESTUDENT_LOADING_ERROR,
    COURSESTUDENT_UPDATE_SUCCESS,
    COURSESTUDENT_UPDATE_FAIL,
    COURSESTUDENT_DELETE_SUCCESS,
    COURSESTUDENT_DELETE_FAIL,
    COURSESTUDENT_EDIT,
} from "./../types/coursestudent";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'course_students';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL COURSESTUDENT 
export const getCoursestudents = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'students';
    dispatch({type : COURSESTUDENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSESTUDENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSESTUDENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE COURSESTUDENT 
export const getCoursestudent = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSESTUDENT_GET_ONE,
        payload: id
    });  
};
//COURSESTUDENT DELETE
export const deleteCoursestudent = data => (dispatch, getState) =>{
    dispatch({type : COURSESTUDENT_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: COURSESTUDENT_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSESTUDENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSESTUDENT REGISTER
export const registerCoursestudent = data => dispatch => {
    
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSESTUDENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSESTUDENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSESTUDENT UPDATE
export const updateCoursestudent = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'updatestudent';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSESTUDENT_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSESTUDENT_UPDATE_FAIL,
                payload: err
            })
        })
};

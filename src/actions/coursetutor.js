import axios from 'axios';
import {
    COURSETUTOR_GET,
    COURSETUTOR_GET_ONE,
    COURSETUTOR_GET_MULTIPLE,
    COURSETUTOR_REGISTER_SUCCESS,
    COURSETUTOR_REGISTER_FAIL,
    COURSETUTOR_LOADING,
    COURSETUTOR_LOADING_ERROR,
    COURSETUTOR_UPDATE_SUCCESS,
    COURSETUTOR_UPDATE_FAIL,
    COURSETUTOR_DELETE_SUCCESS,
    COURSETUTOR_DELETE_FAIL,
    COURSETUTOR_EDIT,
} from "./../types/coursetutor";
import { MAIN_TOKEN, API_PATHS } from './common';

let TABLE_NAME = 'course_tutors';
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
//GET ALL COURSETUTOR 
export const getCoursetutors = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'staff';
    dispatch({type : COURSETUTOR_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSETUTOR_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSETUTOR_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE COURSETUTOR 
export const getCoursetutor = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSETUTOR_GET_ONE,
        payload: id
    });  
};
//COURSETUTOR DELETE
export const deleteCoursetutor = data => (dispatch, getState) =>{
    dispatch({type : COURSETUTOR_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: COURSETUTOR_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSETUTOR_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSETUTOR REGISTER
export const registerCoursetutor = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insertstaff';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSETUTOR_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSETUTOR_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSETUTOR UPDATE
export const updateCoursetutor = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'updatestaff';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSETUTOR_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSETUTOR_UPDATE_FAIL,
                payload: err
            })
        })
};

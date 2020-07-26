import axios from 'axios';
import {
    USERSTUDENTCOURSE_GET,
    USERSTUDENTCOURSE_GET_ONE,
    USERSTUDENTCOURSEX_GET_ONE,
    USERSTUDENTCOURSE_GET_MULTIPLE,
    USERSTUDENTCOURSEX_GET_MULTIPLE,
    USERSTUDENTCOURSE_REGISTER_SUCCESS,
    USERSTUDENTCOURSE_REGISTER_FAIL,
    USERSTUDENTCOURSE_LOADING,
    USERSTUDENTCOURSEX_LOADING,
    USERSTUDENTCOURSE_LOADING_ERROR,
    USERSTUDENTCOURSEX_LOADING_ERROR,
    USERSTUDENTCOURSE_UPDATE_SUCCESS,
    USERSTUDENTCOURSE_UPDATE_FAIL,
    USERSTUDENTCOURSE_DELETE_SUCCESS,
    USERSTUDENTCOURSE_DELETE_FAIL,
    USERSTUDENTCOURSE_EDIT,
} from "../types/userstudentcourse";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'course_students';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USERSTUDENTCOURSE 
export const getUserstudentcourses = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    params.cat = 'usercreatestudent';
    dispatch({type : USERSTUDENTCOURSE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERSTUDENTCOURSE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERSTUDENTCOURSE_LOADING_ERROR,
                    payload:err
                })
            })
};
export const getUserstudentcoursesx = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    params.cat = 'userjoinedstudent';
    dispatch({type : USERSTUDENTCOURSEX_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERSTUDENTCOURSEX_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERSTUDENTCOURSEX_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USERSTUDENTCOURSE 
export const getUserstudentcourse = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERSTUDENTCOURSE_GET_ONE,
        payload: id
    });  
};
//GET SINGLE USERSTUDENTCOURSE 
export const getUserstudentcoursex = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERSTUDENTCOURSEX_GET_ONE,
        payload: id
    });  
};

//COURSESTUDENT REGISTER
export const registerUserstudentcourse = data => dispatch => {
    
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USERSTUDENTCOURSE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERSTUDENTCOURSE_REGISTER_FAIL,
                payload: err
            })
        })
};
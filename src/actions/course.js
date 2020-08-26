import axios from 'axios';
import {
    COURSE_GET,
    COURSE_GET_ONE,
    COURSE_GET_MULTIPLE,
    COURSE_REGISTER_SUCCESS,
    COURSE_REGISTER_FAIL,
    COURSE_LOADING,
    COURSE_LOADING_ERROR,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL,
    COURSE_DELETE_SUCCESS,
    COURSE_DELETE_FAIL,
    COURSE_EDIT,
} from "./../types/course";
import {
    USERSTAFFCOURSE_REGISTER_SUCCESS,
    USERSTAFFCOURSE_DELETE_SUCCESS,
    USERSTAFFCOURSE_GET_ONE,
    USERSTAFFCOURSE_UPDATE_SUCCESS
} from "./../types/userstaffcourse";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'courses';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL COURSE 
export const getCourses = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = dat;
    params.cat = 'select';
    dispatch({type : COURSE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE COURSE 
export const getCourse = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSE_GET_ONE,
        payload: id
    });  
    dispatch(
        {
        type : USERSTAFFCOURSE_GET_ONE,
        payload: id
    }); 
};
//COURSE DELETE
export const deleteCourse = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSE_DELETE_SUCCESS,
                payload: dat.id
            })
            dispatch({
                type: USERSTAFFCOURSE_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : COURSE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSE REGISTER
export const registerCourse = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSE_REGISTER_SUCCESS,
                payload: res.data.data
            })
            dispatch({
                type: USERSTAFFCOURSE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSE UPDATE
export const updateCourse = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSE_UPDATE_SUCCESS,
                payload: res.data.data
            })
            dispatch({
                type: USERSTAFFCOURSE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSE_UPDATE_FAIL,
                payload: err
            })
        })
};

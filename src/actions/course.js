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
import { MAIN_TOKEN, API_PATHS } from './common';

let TABLE_NAME = 'courses';
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
//GET ALL COURSE 
export const getCourses = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
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
};
//COURSE DELETE
export const deleteCourse = data => (dispatch, getState) =>{
    dispatch({type : COURSE_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: COURSE_DELETE_SUCCESS,
                payload: res.data
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
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSE_REGISTER_SUCCESS,
                payload: res.data
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
export const updateCourse = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSE_UPDATE_FAIL,
                payload: err
            })
        })
};

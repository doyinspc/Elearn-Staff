import axios from 'axios';
import {
    COURSESCORE_GET,
    COURSESCORE_GET_ONE,
    COURSESCORE_GET_MULTIPLE,
    COURSESCORE_REGISTER_SUCCESS,
    COURSESCORE_REGISTER_FAIL,
    COURSESCORE_LOADING,
    COURSESCORE_LOADING_ERROR,
    COURSESCORE_UPDATE_SUCCESS,
    COURSESCORE_UPDATE_FAIL,
    COURSESCORE_DELETE_SUCCESS,
    COURSESCORE_DELETE_FAIL,
    COURSESCORE_EDIT,
} from "./../types/coursescore";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'course_scores';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL COURSESCORE 
export const getCoursescores = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    params.cat = 'select';
    dispatch({type : COURSESCORE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSESCORE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSESCORE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE COURSESCORE 
export const getCoursescore = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSESCORE_GET_ONE,
        payload: id
    });  
};
//COURSESCORE DELETE
export const deleteCoursescore = data => (dispatch, getState) =>{
    dispatch({type : COURSESCORE_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: COURSESCORE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSESCORE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSESCORE REGISTER
export const registerCoursescore = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSESCORE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSESCORE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSESCORE UPDATE
export const updateCoursescore = (data) => (dispatch, getState) => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSESCORE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSESCORE_UPDATE_FAIL,
                payload: err
            })
        })
};

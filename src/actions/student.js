import axios from 'axios';
import {
    STUDENT_GET,
    STUDENT_GET_ONE,
    STUDENT_GET_MULTIPLE,
    STUDENT_REGISTER_SUCCESS,
    STUDENT_REGISTER_FAIL,
    STUDENT_LOADING,
    STUDENT_LOADING_ERROR,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAIL,
    STUDENT_EDIT,
} from "./../types/student";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'students';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL STUDENT 
export const getStudents = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(dat);
    params.cat = 'group';
    dispatch({type : STUDENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STUDENT 
export const getStudentsClass = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(dat);
    params.cat = 'studentclass';
    dispatch({type : STUDENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL STUDENT 
export const getStudentsCourse = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(dat);
    params.cat = 'studentclass';
    dispatch({type : STUDENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: STUDENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : STUDENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE STUDENT 
export const getStudent = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : STUDENT_GET_ONE,
        payload: id
    });  
};
//STUDENT DELETE
export const deleteStudent = data => (dispatch, getState) =>{
    dispatch({type : STUDENT_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: STUDENT_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//STUDENT REGISTER
export const registerStudent = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //STUDENT UPDATE
export const updateStudent = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: STUDENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENT_UPDATE_FAIL,
                payload: err
            })
        })
};

//STUDENT UPDATE
export const updateStudents = (data,id) => (dispatch, getState) => {
    //body
    params.data = JSON.stringify(data);
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: STUDENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : STUDENT_UPDATE_FAIL,
                payload: err
            })
        })
};

import axios from 'axios';
import {
    COURSECOMMENT_GET,
    COURSECOMMENT_GET_ONE,
    COURSECOMMENT_GET_MULTIPLE,
    COURSECOMMENT_REGISTER_SUCCESS,
    COURSECOMMENT_REGISTER_FAIL,
    COURSECOMMENT_LOADING,
    COURSECOMMENT_LOADING_ERROR,
    COURSECOMMENT_UPDATE_SUCCESS,
    COURSECOMMENT_UPDATE_FAIL,
    COURSECOMMENT_DELETE_SUCCESS,
    COURSECOMMENT_DELETE_FAIL,
    COURSECOMMENT_EDIT,
} from "./../types/coursecomment";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'course_comments';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL COURSECOMMENT 
export const getCoursecomments = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    params.cat = 'select';
    dispatch({type : COURSECOMMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSECOMMENT_GET_MULTIPLE,
                    payload: res.data,
                    node: 1
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSECOMMENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET ALL COURSECOMMENT 
export const getCoursecommentstudent = data => (dispatch, getState) => {
    /** 
     * SET PAGE LOADING
     * GET ALL COMMENT STUDENTS MADE ON THE MATERIAL PUBLIC AND PRVATE
     * GET OTHER STUDENTS COMMENT THAT ARE PUBLIC
     * GET ALL TEACHERS PRIVATE COMMENT TO STUDENT ON MATERIAL
     * GET ALL TEACHERS PUBLIC COMMENTS
     * */
    
    params.data = JSON.stringify(data);
    params.cat = 'selectcomment';
    dispatch({type : COURSECOMMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSECOMMENT_GET_MULTIPLE,
                    payload: res.data,
                    node: 1
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSECOMMENT_LOADING_ERROR,
                    payload:err
                })
            })
};

export const getCoursecommentstudentcourse = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    params.cat = 'selectcommentcourse';
    dispatch({type : COURSECOMMENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSECOMMENT_GET_MULTIPLE,
                    payload: res.data,
                    node: 1
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSECOMMENT_LOADING_ERROR,
                    payload:err
                })
            })
};

//GET SINGLE COURSECOMMENT 
export const getCoursecomment = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSECOMMENT_GET_ONE,
        payload: id
    });  
};
//COURSECOMMENT DELETE
export const deleteCoursecomment = dat => (dispatch, getState) =>{
    params.data = JSON.stringify(dat);
    params.cat = 'deleter';
    dispatch({type : COURSECOMMENT_LOADING});
    axios.get(path, {params}, axiosConfig)
    .then(res => {
        dispatch({
            type: COURSECOMMENT_DELETE_SUCCESS,
            payload: dat.id
        })
    })
        .catch(err => {
            dispatch({
                type : COURSECOMMENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSECOMMENT REGISTER
export const registerCoursecomment = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSECOMMENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSECOMMENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSECOMMENT UPDATE
export const updateCoursecomment = (data) => (dispatch, getState) => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSECOMMENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSECOMMENT_UPDATE_FAIL,
                payload: err
            })
        })
};

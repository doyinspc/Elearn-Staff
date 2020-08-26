import axios from 'axios';
import {
    USERSTAFFCOURSE_GET,
    USERSTAFFCOURSE_GET_ONE,
    USERSTAFFCOURSEX_GET_ONE,
    USERSTAFFCOURSE_GET_MULTIPLE,
    USERSTAFFCOURSEX_GET_MULTIPLE,
    USERSTAFFCOURSE_REGISTER_SUCCESS,
    USERSTAFFCOURSE_REGISTER_FAIL,
    USERSTAFFCOURSE_LOADING,
    USERSTAFFCOURSEX_LOADING,
    USERSTAFFCOURSE_LOADING_ERROR,
    USERSTAFFCOURSEX_LOADING_ERROR,
    USERSTAFFCOURSE_UPDATE_SUCCESS,
    USERSTAFFCOURSE_UPDATE_FAIL,
    USERSTAFFCOURSE_DELETE_SUCCESS,
    USERSTAFFCOURSE_DELETE_FAIL,
    USERSTAFFCOURSE_EDIT,
} from "../types/userstaffcourse";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'course_tutors';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USERSTAFFCOURSE 
export const getUserstaffcourses = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'usercreate';
    dispatch({type : USERSTAFFCOURSE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERSTAFFCOURSE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERSTAFFCOURSE_LOADING_ERROR,
                    payload:err
                })
            })
};
export const getUserstaffcoursesx = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'userjoined';
    dispatch({type : USERSTAFFCOURSE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERSTAFFCOURSE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERSTAFFCOURSE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USERSTAFFCOURSE 
export const getUserstaffcourse = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERSTAFFCOURSE_GET_ONE,
        payload: id
    });  
};
//GET SINGLE USERSTAFFCOURSE 
export const getUserstaffcoursex = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERSTAFFCOURSEX_GET_ONE,
        payload: id
    });  
};

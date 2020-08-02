import axios from 'axios';
import {
    COURSEPROGRESS_GET,
    COURSEPROGRESS_GET_ONE,
    COURSEPROGRESS_GET_MULTIPLE,
    COURSEPROGRESS_GET_MATERIAL,
    COURSEPROGRESS_REGISTER_SUCCESS,
    COURSEPROGRESS_REGISTER_FAIL,
    COURSEPROGRESS_LOADING,
    COURSEPROGRESS_LOADING_ERROR,
    COURSEPROGRESS_UPDATE_SUCCESS,
    COURSEPROGRESS_UPDATE_FAIL,
    COURSEPROGRESS_DELETE_SUCCESS,
    COURSEPROGRESS_LOADING_MATERIAL_FAIL,
    COURSEPROGRESS_DELETE_FAIL,
    COURSEPROGRESS_EDIT,
} from "./../types/courseprogress";
import { MAIN_TOKEN, API_PATHS } from './common';

let TABLE_NAME = 'course_progress';
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
//GET ALL COURSEPROGRESS 
export const getCourseprogresss = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    params.cat = 'studentmodule';
    dispatch({type : COURSEPROGRESS_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSEPROGRESS_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSEPROGRESS_LOADING_ERROR,
                    payload:err
                })
            })
};
export const getMaterials= data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = JSON.stringify(data);
    console.log(params.data);
    params.cat = 'studentmaterial';
    dispatch({type : COURSEPROGRESS_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSEPROGRESS_GET_MATERIAL,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSEPROGRESS_LOADING_MATERIAL_FAIL,
                    payload:err
                })
            })
};
//GET SINGLE COURSEPROGRESS 
export const getCourseprogress = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSEPROGRESS_GET_ONE,
        payload: id
    });  
};
//COURSEPROGRESS DELETE
export const deleteCourseprogress = data => (dispatch, getState) =>{
    dispatch({type : COURSEPROGRESS_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: COURSEPROGRESS_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEPROGRESS_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSEPROGRESS REGISTER
export const registerCourseprogress = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSEPROGRESS_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEPROGRESS_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSEPROGRESS UPDATE
export const updateCourseprogress = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSEPROGRESS_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEPROGRESS_UPDATE_FAIL,
                payload: err
            })
        })
};

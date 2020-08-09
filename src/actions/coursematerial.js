import axios from 'axios';
import {
    COURSEMATERIAL_GET,
    COURSEMATERIAL_GET_ONE,
    COURSEMATERIAL_GET_MULTIPLE,
    COURSEMATERIAL_REGISTER_SUCCESS,
    COURSEMATERIAL_REGISTER_FAIL,
    COURSEMATERIAL_LOADING,
    COURSEMATERIAL_LOADING_ERROR,
    COURSEMATERIAL_UPDATE_SUCCESS,
    COURSEMATERIAL_UPDATE_FAIL,
    COURSEMATERIAL_DELETE_SUCCESS,
    COURSEMATERIAL_DELETE_FAIL,
    COURSEMATERIAL_EDIT,
} from "./../types/coursematerial";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'course_materials';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL COURSEMATERIAL 
export const getCoursematerials = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : COURSEMATERIAL_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: COURSEMATERIAL_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : COURSEMATERIAL_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE COURSEMATERIAL 
export const getCoursematerial = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : COURSEMATERIAL_GET_ONE,
        payload: id
    });  
};
//COURSEMATERIAL DELETE
export const deleteCoursematerial = data => (dispatch, getState) =>{
    
    axios.delete(path, JSON.stringify({data}), axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSEMATERIAL_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMATERIAL_DELETE_FAIL,
                payload : err
            })
        })
        
}
//COURSEMATERIAL REGISTER
export const registerCoursematerial = data => dispatch => {
    dispatch({type: COURSEMATERIAL_EDIT})
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: COURSEMATERIAL_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMATERIAL_REGISTER_FAIL,
                payload: err
            })
        })
};
 //COURSEMATERIAL UPDATE
export const updateCoursematerial = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    console.log(params);
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: COURSEMATERIAL_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : COURSEMATERIAL_UPDATE_FAIL,
                payload: err
            })
        })
};

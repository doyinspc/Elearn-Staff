import axios from 'axios';
import {
    SEMESTER_GET,
    SEMESTER_GET_ONE,
    SEMESTER_GET_MULTIPLE,
    SEMESTER_REGISTER_SUCCESS,
    SEMESTER_REGISTER_FAIL,
    SEMESTER_LOADING,
    SEMESTER_LOADING_ERROR,
    SEMESTER_UPDATE_SUCCESS,
    SEMESTER_UPDATE_FAIL,
    SEMESTER_DELETE_SUCCESS,
    SEMESTER_DELETE_FAIL,
    SEMESTER_EDIT,
} from "./../types/semester";
import { MAIN_TOKEN, API_PATHS } from './common';

let TABLE_NAME = 'semesters';
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
//GET ALL SEMESTER 
export const getSemesters = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    dispatch({type : SEMESTER_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: SEMESTER_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : SEMESTER_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE SEMESTER 
export const getSemester = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : SEMESTER_GET_ONE,
        payload: id
    });  
};
//SEMESTER DELETE
export const deleteSemester = data => (dispatch, getState) =>{
    dispatch({type : SEMESTER_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: SEMESTER_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SEMESTER_DELETE_FAIL,
                payload : err
            })
        })
        
}
//SEMESTER REGISTER
export const registerSemester = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SEMESTER_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SEMESTER_REGISTER_FAIL,
                payload: err
            })
        })
};
 //SEMESTER UPDATE
export const updateSemester = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: SEMESTER_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SEMESTER_UPDATE_FAIL,
                payload: err
            })
        })
};

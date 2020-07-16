import axios from 'axios';
import {
    GRADE_GET,
    GRADE_GET_ONE,
    GRADE_GET_MULTIPLE,
    GRADE_REGISTER_SUCCESS,
    GRADE_REGISTER_FAIL,
    GRADE_LOADING,
    GRADE_LOADING_ERROR,
    GRADE_UPDATE_SUCCESS,
    GRADE_UPDATE_FAIL,
    GRADE_DELETE_SUCCESS,
    GRADE_DELETE_FAIL,
    GRADE_EDIT,
} from "./../types/grade";
import { MAIN_TOKEN, API_PATHS } from './common';

let TABLE_NAME = 'datas';
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
//GET ALL GRADE 
export const getGrades = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : GRADE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: GRADE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : GRADE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE GRADE 
export const getGrade = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : GRADE_GET_ONE,
        payload: id
    });  
};
//GRADE DELETE
export const deleteGrade = data => (dispatch, getState) =>{
    dispatch({type : GRADE_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: GRADE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : GRADE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//GRADE REGISTER
export const registerGrade = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: GRADE_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : GRADE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //GRADE UPDATE
export const updateGrade = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: GRADE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : GRADE_UPDATE_FAIL,
                payload: err
            })
        })
};

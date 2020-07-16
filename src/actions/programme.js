import axios from 'axios';
import {
    PROGRAMME_GET,
    PROGRAMME_GET_ONE,
    PROGRAMME_GET_MULTIPLE,
    PROGRAMME_REGISTER_SUCCESS,
    PROGRAMME_REGISTER_FAIL,
    PROGRAMME_LOADING,
    PROGRAMME_LOADING_ERROR,
    PROGRAMME_UPDATE_SUCCESS,
    PROGRAMME_UPDATE_FAIL,
    PROGRAMME_DELETE_SUCCESS,
    PROGRAMME_DELETE_FAIL,
    PROGRAMME_EDIT,
} from "./../types/programme";
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
//GET ALL PROGRAMME 
export const getProgrammes = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : PROGRAMME_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: PROGRAMME_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : PROGRAMME_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE PROGRAMME 
export const getProgramme = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : PROGRAMME_GET_ONE,
        payload: id
    });  
};
//PROGRAMME DELETE
export const deleteProgramme = data => (dispatch, getState) =>{
    dispatch({type : PROGRAMME_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: PROGRAMME_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : PROGRAMME_DELETE_FAIL,
                payload : err
            })
        })
        
}
//PROGRAMME REGISTER
export const registerProgramme = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: PROGRAMME_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : PROGRAMME_REGISTER_FAIL,
                payload: err
            })
        })
};
 //PROGRAMME UPDATE
export const updateProgramme = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: PROGRAMME_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : PROGRAMME_UPDATE_FAIL,
                payload: err
            })
        })
};

import axios from 'axios';
import {
    FEE_GET,
    FEE_GET_ONE,
    FEE_GET_MULTIPLE,
    FEE_REGISTER_SUCCESS,
    FEE_REGISTER_FAIL,
    FEE_LOADING,
    FEE_LOADING_ERROR,
    FEE_UPDATE_SUCCESS,
    FEE_UPDATE_FAIL,
    FEE_DELETE_SUCCESS,
    FEE_DELETE_FAIL,
    FEE_EDIT,
} from "./../types/fee";
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
//GET ALL FEE 
export const getFees = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'group';
    dispatch({type : FEE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: FEE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : FEE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE FEE 
export const getFee = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : FEE_GET_ONE,
        payload: id
    });  
};
//FEE DELETE
export const deleteFee = data => (dispatch, getState) =>{
    dispatch({type : FEE_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: FEE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : FEE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//FEE REGISTER
export const registerFee = data => dispatch => {
    const body = JSON.stringify(data)
    params.data = body;
    params.cat = 'insert';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: FEE_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : FEE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //FEE UPDATE
export const updateFee = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: FEE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : FEE_UPDATE_FAIL,
                payload: err
            })
        })
};

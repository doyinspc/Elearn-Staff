import axios from 'axios';
import {
    EMPLOYEE_GET,
    EMPLOYEE_GET_ONE,
    EMPLOYEE_GET_MULTIPLE,
    EMPLOYEE_REGISTER_SUCCESS,
    EMPLOYEE_REGISTER_FAIL,
    EMPLOYEE_LOADING,
    EMPLOYEE_LOADING_ERROR,
    EMPLOYEE_ACTIVATE_FAIL,
    EMPLOYEE_ACTIVATE_SUCCESS,
    EMPLOYEE_UPDATE_SUCCESS,
    EMPLOYEE_UPDATE_FAIL,
    EMPLOYEE_DELETE_SUCCESS,
    EMPLOYEE_DELETE_FAIL,
    EMPLOYEE_PASSWORD_SUCCESS,
    EMPLOYEE_PASSWORD_FAIL,
    EMPLOYEE_LOGOUT_SUCCESS,
    EMPLOYEE_LOGOUT_FAIL,
    EMPLOYEE_LOGIN_SUCCESS,
    EMPLOYEE_LOGIN_FAIL,
    EMPLOYEE_SEARCH_SUCCESS,
    EMPLOYEE_SEARCH_FAIL,
    EMPLOYEE_EDIT,
    EMPLOYEE_FORM,
    EMPLOYEE_ADMIN,
    EMPLOYEE_MAIN_TOKEN,
    API_PATH
} from "./types";

const path = API_PATH;


//EMPLOYEE LOGIN
export const loginEmployee = (email, password) => dispatch => {

    // headers
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    //body
    const body = JSON.stringify({email, password})
    let paths = `${path}/employee-login`     
    axios.post(paths, body, config)
        .then(res => {
            dispatch({
                type: EMPLOYEE_LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_LOGIN_FAIL,
                payload: err
            })
        })
};

//EMPLOYEE EDIT/DELETE
export const updateEmployee = (id, data) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'multipart/form-data'
        }
    }
    let paths = `${path}/employee/${id}/update`   
    axios.patch(paths, data, config)
        .then(res => {
            dispatch({
                type: EMPLOYEE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_UPDATE_FAIL,
                payload: err
            })
        })
};
//GET ALL EMPLOYEE 
export const getEmployee = (id, type) => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch({type : EMPLOYEE_LOADING});

    //if id is provided select a single item
    if(id && id > 0 && !type){
        // id available get a candidates data
        let paths = `${path}/employee/${id}/profile`
        
        axios.get(paths, employeeSetConfig(getState))
        .then(res => {
            dispatch({      
                type: EMPLOYEE_GET_ONE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_LOADING_ERROR,
                payload:err
            })
        })
    }
    // if no id was provided pull all data
    else if( !id ){
        let paths = `${path}/employee/` 
        axios.get(paths, employeeSetConfig(getState))
            .then(res => {
                dispatch({
                    type: EMPLOYEE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : EMPLOYEE_LOADING_ERROR,
                    payload:err
                })
            })
    }
     // GET EMPLOYEE BY A TYPE OF PROPERTY
     else if( id && type ){
        let paths = `${path}/employee/${id}/${type}`
        axios.get(paths, employeeSetConfig(getState))
            .then(res => {
                dispatch({
                    type: EMPLOYEE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : EMPLOYEE_LOADING_ERROR,
                    payload:err
                })
            })
    }

};

//GET RESTRICTED EMPLOYEE 
export const getEmployeeSearched = (id, search) => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch({type : EMPLOYEE_LOADING});

    //if id is provided select a single item
    if(id && id > 0 && !search){
        // id available get a candidates data
        let paths = `${path}/employee/${id}/group`
        
        axios.get(paths, employeeSetConfig(getState))
        .then(res => {
            dispatch({      
                type: EMPLOYEE_SEARCH_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_SEARCH_FAIL,
                payload:err
            })
        })
    }
     // GET EMPLOYEE BY A TYPE OF PROPERTY
     else if( !id && search ){
        let paths = `${path}/employee/${search}/groups`
        axios.get(paths, employeeSetConfig(getState))
            .then(res => {
                dispatch({
                    type: EMPLOYEE_SEARCH_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : EMPLOYEE_SEARCH_FAIL,
                    payload:err
                })
            })
    }

};

//ACTIVATE OR DEACTIVATE AN EMPLOYEE
export const deactivateEmployee = id => (dispatch, getState) => {
    dispatch({type : EMPLOYEE_LOADING});
    let paths = `${path}/employee/${id}/set_deactivated` 
    axios.post(paths, employeeSetConfig(getState))
        .then(res => {
            dispatch({
                type: EMPLOYEE_ACTIVATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_ACTIVATE_FAIL,
                payload : err
            })
        })
        
};

//ACTIVATE ADMIN EMPLOYEE
export const adminEmployee = id => (dispatch, getState) => {
    dispatch({type : EMPLOYEE_LOADING});
    let paths = `${path}/employee/${id}/set_admin` 
    axios.post(paths, employeeSetConfig(getState))
        .then(res => {
            dispatch({
                type: EMPLOYEE_ADMIN,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_ACTIVATE_FAIL,
                payload : err
            })
        })
        
};


//CHANGE AND SET EMPLOYEE PASSWORD SEND EMAIL
export const passwordEmployee = id => (dispatch, getState) => {
    let isAuthenticated = getState().employeeReducer.isAdmin;
    if (isAuthenticated) {
         //Employee loading
        dispatch({type : EMPLOYEE_LOADING});
        let paths = `${path}/employee/${id}/set_password` 
        axios.post(paths, employeeSetConfig(getState))
            .then(res => {
                dispatch({
                    type: EMPLOYEE_PASSWORD_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({type : EMPLOYEE_PASSWORD_FAIL})
            })
        
    } else {
        dispatch({type : EMPLOYEE_PASSWORD_FAIL})
    }
   
};

//EMPLOYEE DELETE
export const deleteEmployee = (id) => (dispatch, getState) =>{
    dispatch({type : EMPLOYEE_LOADING});
    let paths = `${path}/employee/${id}/set_delete` 
    axios.delete(paths, employeeSetConfig(getState))
        .then(res => {
            dispatch({
                type: EMPLOYEE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN EMPLOYEE
export const editEmployee = id => (dispatch) => {
    dispatch(
        {
        type : EMPLOYEE_EDIT,
        payload: id
    });    
};

//DISPLAY FORM FOR EDITING OR ADDING
export const formEmployee = bool => (dispatch) => {
    dispatch(
        {
        type : EMPLOYEE_FORM,
        payload: bool
    });    
};

//EMPLOYEE REGISTER
export const registerEmployee = (data) => (dispatch) => {

    const config ={
        headers:{
             'Content-Type':'multipart/form-data'
        }
    }
    
    let paths = `${path}/employee-register` 
    axios.post(paths, data, config)
        .then(res => {
            dispatch({
                type: EMPLOYEE_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_REGISTER_FAIL,
                payload: err
            })
        })
};

//LOGOUT EMPLOYEE
export const logoutEmployee = () => (dispatch, getState) => {
    //get token from state
    const token = getState().employeeReducer.token;

    // headers
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    let paths = `${path}/auth/employee-logout`;
    axios.post(paths, null, config)
        .then(res => {
            dispatch({
                type: EMPLOYEE_LOGOUT_SUCCESS,
            })
        })
        .catch(err => {
            dispatch({type : EMPLOYEE_LOGOUT_FAIL})
        })
};

//SET TOKEN AND HEADER - HELPER FUNCTION
export const employeeSetConfig = () => {
    //get token from state
    const token = localStorage.getItem(EMPLOYEE_MAIN_TOKEN);
    // headers
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}
//SET TOKEN AND HEADER - HELPER FUNCTION
export const employeeSetConfig1 = () => {
    //get token from state
    const token = localStorage.getItem(EMPLOYEE_MAIN_TOKEN);

    // headers
    const config ={
        headers:{
             'Content-Type':'multipart/form-data'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}
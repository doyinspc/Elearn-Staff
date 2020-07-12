export const API_PATHS = 'http://localhost:8086/admission/api/index.php';
export const SERVER_PATHS = 'http:127.0.0.1:8086';
export const SERVER_URL = 'http:127.0.0.1:8086/';
export const MAIN_TOKEN ='';
export const axiosConfig = {
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
    }
  };
export const axiosConfig1 = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
  };

  export const checkImage = imageSrc =>{
      var img = new Image();
      try{
        img.src = imageSrc;
        return true;
      }catch(err){
        return false;
      }

  }
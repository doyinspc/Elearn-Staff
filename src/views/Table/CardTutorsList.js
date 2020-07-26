import React from 'react';
import { SERVER_URL } from "./../../actions/common.js";
const imgx = require("assets/img/place.png");
const List = (props) => {
  
  return (
    <>
         <li class="list-group-item py-1" >
                  <div class="media">
                      <img
                        class="align-self-start mr-3"
                        src={`${SERVER_URL + props.data.photo}`}
                        height="80px"
                        width="60px"
                        onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                        alt={props.data.fullname}
                        />
                        <div class="media-body">
                            <h6 class="mt-0">{props.data.fullname}</h6>
                            <p class="subtitle   my-0 py-1">{props.data.position}</p>
                            <p class="small my-0 py-1"><i class="fa fa-phone"></i> {props.data.phone} </p>
                            <p class="small my-0 py-1"><i class="fa fa-envelope"></i> {props.data.email}</p>
                        </div>
                  </div>

                  
                </li>
     </>      
  );
}

  
export default List

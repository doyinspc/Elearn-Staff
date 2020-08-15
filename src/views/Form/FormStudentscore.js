import React from 'react';
import { connect } from 'react-redux';
import { updateCoursescore, deleteCoursescore } from './../../actions/coursescore';
import { SERVER_URL } from "./../../actions/common.js"
const imgx = require("assets/img/place.png");
const Modals = (props) => {
  
  const resetScore = (id) =>{
        props.updateCoursescore({'score':0, 'answer':{}}, id);
  }
  
  const deleteScore = (id) =>{
        props.deleteCoursescore(id);
   }
  return (
   <>
   <tr key={props.data.id}>
        <td className="text-left" style={{textTransform:"capitalize"}}>
        <img
                height='50px'
                width='50px'
                style={{margin:0, padding:0}}
                className="avatar border-gray"
                src={`${SERVER_URL + props.data.photo}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                />
            {props.data.username}{" "}{props.data.fullname}</td>
        <td>{props.data.score > -1 ? props.data.score * 100 : 0}%</td>
        <td>
            <button className="btn btn-sm btn-icon" onClick={()=>resetScore(props.data.id)}>X</button>
            <button className="btn btn-sm btn-icon" onClick={()=>deleteScore(props.data.id)}>X</button>
        </td>
    </tr>
   </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursestudents: state.coursestudentReducer
  })
  
export default connect(mapStateToProps, { updateCoursescore, deleteCoursescore })(Modals)

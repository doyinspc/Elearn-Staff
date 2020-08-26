
import React from "react";
import { connect } from 'react-redux';
import { deleteUserstudentcourse, getUserstudentcourse } from './../../actions/userstudentcourse';
import { SERVER_URL, imgx } from "./../../actions/common.js";
import Swal from 'sweetalert2';
import moment from 'moment';
import { Link } from "react-router-dom";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      but:false,
      data:{}
    }
  }
 
loadCourse = (id) =>{
    this.props.getUserstudentcourse(id);
}

removeCourse = (id) =>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You may lose related information!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {

    if (result.value) {
      this.props.deleteUserstudentcourse({'id':id});
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  
}

  render() {
    
    let {course_name, course_description, course_code, course_start, course_end, id, pics, departmentname, levelname} = this.props.data;
    let starts = moment(course_start).format('MMM Do YYYY, h:mm:ss a');
    let ends = moment(course_end).format('MMM Do YYYY, h:mm:ss a');
    return (
      <>
        <div class="card col-md-3 col-sm-6 col-xs-12 ml-1 mr-1 px-0" >
        <div class="card-header" >
              <small class="text-muted"><b>Start:</b> {`${starts}`}<br/><b>Close:</b> {`${ends}`}</small>
            </div>
            <img 
                class="card-img-top" 
                src={`${SERVER_URL + pics}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                alt="background image"
                width="100%"
                height="100px"
                style={{padding:-30}}
                />
             <div style={{position:'absolute', top:'50px' , left:'10px'}}>
               <h4 class="card-title text-light">{course_name}</h4> 
              </div>
             
            <div class="card-body" >
                <h6 class="card-subtitle mb-2 text-muted">{course_code}</h6>
                <h6 class="text-mute small">{departmentname} {levelname}</h6>
                <p class="card-text">{course_description}</p>
            </div>
            <div class="card-footer" >
           
            <a href="#" class="btn btn-secondary btn-sm" onClick={()=>{this.removeCourse(id)}}>Remove</a>
            <Link to="/admin/courseitem">
            <button type="button" class="btn btn-info btn-sm" onClick={()=>{this.loadCourse(id)}} >Go to Class</button>
            </Link>
            </div>
        </div>
        
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer,
  userstudentcourses: state.userstudentcourseReducer,
  user: state.userstudentReducer.user,
  isAuthenticated: state.userstudentReducer.userstudent.isAuthenticated
})

export default connect(mapStateToProps, { deleteUserstudentcourse, getUserstudentcourse })(Course)
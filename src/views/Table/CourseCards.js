
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
import { getCoursemodules, getCoursemodule} from './../../actions/coursemodule';
import { getCoursematerials, getCoursematerial } from './../../actions/coursematerial';
import { getCoursetutors, getCoursetutor } from './../../actions/coursetutor';
import { getCoursestudents, getCoursestudent } from './../../actions/coursestudent';
import { getCourseprogresss, getCourseprogress } from './../../actions/courseprogress';
import CourseFormModule from "./../Form/CourseFormModule";
import CourseFormMaterial from "./../Form/CourseFormMaterial";
import CourseFormTutor from "./../Form/CourseFormTutor";
import CourseFormStudent from "./../Form/CourseFormStudent";

import CourseModule from "./CourseModule";
import CourseTutor from "./CourseTutor";
import CourseStudent from "./CourseStudent";
import Modals from "./../Form/CourseForm";
// reactstrap components
import {
  Card,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      idt:null,
      stt:false,
      idm:null,
      stm:false,
      ids:null,
      sts:false,
    }
  }
  
  componentDidMount(){

  }
 

  render() {
    let {course_title, course_description, course} = this.props.data;
    
    return (
      <>
      <div class="col-md-4">
        <div class="card" >
            <img 
                class="card-img-top" 
                src={require("assets/img/bg5.jpg")} 
                alt="background image"
                />
            <div class="card-body">
                <h4 class="card-title">{course_title}</h4>
                <p class="card-text">{course_description}</p>
                <a href="#" class="btn btn-primary">Register</a>
            </div>
        </div>
        </div>
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer,
  
})

export default connect(mapStateToProps, 
  { getCourses, 
    getCourse, 
    updateCourse,
    getCoursemodules, 
    getCoursemodule, 
    getCoursematerials, 
    getCoursematerial, 
    getCoursetutors, 
    getCoursetutor, 
    getCoursestudents, 
    getCoursestudent,  })(Course)
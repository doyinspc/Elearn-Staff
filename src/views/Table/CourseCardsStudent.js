
import React from "react";
import { connect } from 'react-redux';
import { getCoursemodules} from './../../actions/coursemodule';
import { getCoursetutors} from './../../actions/coursetutor';

// reactstrap components
import {
  
  Row,
 
} from "reactstrap";
import CardDetails from "./CardDetails";
import { SERVER_URL } from "./../../actions/common.js"
const imgx = require("assets/img/bg3.jpg");

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      but:false,
    }
  }
  
  componentDidMount(){
        
       
  }

  loadDetails = (sid) =>{
    let id = this.props.data.cid;
    this.props.getCoursemodules({'courseId': id});
    this.props.getCoursetutors({'courseId': id})
    this.setState({st:true, id:id});
  }
  handleClose = () =>{
    this.setState({st:false, id:null}); 
  }

  render() {
    
    let {course_name, course_description, course_code, course_start, course_end, id, pics, departmentname, levelname} = this.props.data;
    let starts = new Date(parseInt(course_start)).toDateString();
    let ends = new Date(parseInt(course_end)).toDateString();
    return (
      <>
        <CardDetails 
          mid={this.state.id}
          st={this.state.st}
          data={this.props.data}
          handleClose={this.handleClose}
        />
        <div class="card col-md-3 col-sm-6 col-xs-12 ml-1 mr-1 px-0" >
        <div class="card-header" >
              <small class="text-muted">{`${starts} - ${ends}`}</small>
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
             <div style={{position:'absolute', top:'8px' , left:'5px'}}>
               <h4 class="card-title text-light">{course_name}{id}</h4>
               
               
               </div>
             
            <div class="card-body" >
                
                <h6 class="card-subtitle mb-2 text-muted">{course_code}</h6>
                <h6 class="text-mute small">{departmentname} {levelname}</h6>
                <p class="card-text">{course_description}</p>
                
            </div>
            <div class="card-footer" >
            <a href="#" class="btn btn-primary" onClick={()=>{this.loadDetails(id)}}>Details/Register</a>
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

export default connect(mapStateToProps, {getCoursemodules, getCoursetutors })(Course)

import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { getCoursemodules} from './../../actions/coursemodule';
import { getCoursetutors} from './../../actions/coursetutor';

// reactstrap components
import {
  
  Row,
 
} from "reactstrap";
import CardDetails from "./CardDetails";
import { SERVER_URL, imgx } from "./../../actions/common.js";

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
    let id = this.props.data.id;
    this.props.getCoursemodules({'courseId': id});
    this.props.getCoursetutors({'courseId': id})
    this.setState({st:true, id:id});
  }
  handleClose = () =>{
    this.setState({st:false, id:null}); 
  }

  render() {
    
    let {course_name, course_description, course_code, course_start, course_end, id, pics, departmentname, levelname} = this.props.data;
    
    let starts= course_start ? moment(course_start).format('MMM Do YYYY, h:mm:ss a') : '--';
    let ends = course_end ? moment(course_end).format('MMM Do YYYY, h:mm:ss a'): '--';
    return (
      <>
        {this.state.st ?<CardDetails 
          mid={this.state.id}
          st={this.state.st}
          data={this.props.data}
          handleClose={this.handleClose}
        />:''}
        <div class="card col-md-3 col-sm-6 col-xs-12 ml-1 mr-1 px-0" >
        
            <img 
                class="card-img-top" 
                src={`${SERVER_URL + pics}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                alt="background image"
                width="100%"
                height="100px"
                style={{padding:-30}}
                />
             <div style={{position:'absolute', top:'5px' , left:'5px', lineHeight:'normal'}}>
               <h4 class="card-title text-light" style={{lineHeight:'normal'}}>{course_name}{id}</h4>
               <h6 class="text-light small h6 subtitle" style={{fontStretch:'extra-expanded', textShadow:'2px 2px #000000'}}>{departmentname} {levelname}</h6>
               </div>
             
            <div class="card-body" >
                
                <h6 class="card-subtitle mb-2 text-muted">{course_code}</h6>
                <small class="text-muted">{`${starts} - ${ends}`}</small>
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
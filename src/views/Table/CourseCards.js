
import React from "react";
import { connect } from 'react-redux';
import { getCoursemodules} from './../../actions/coursemodule';
import { getCoursetutors} from './../../actions/coursetutor';

// reactstrap components
import {
  
  Row,
 
} from "reactstrap";
import CardDetails from "./CardDetails";

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
    console.log(id);
    this.props.getCoursemodules({'courseId': id});
    this.props.getCoursetutors({'courseId': id})
    this.setState({st:true, id:id});
  }
  handleClose = () =>{
    this.setState({st:false, id:null});
  }

  render() {
    let {course_name, course_description, course_code, course_start, course_end, id} = this.props.data;
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
            <img 
                class="card-img-top" 
                src={require("assets/img/bg3.jpg")} 
                alt="background image"
                width="100%"
                height="100px"
                style={{padding:-30}}
                />
            <div class="card-body" >
                <h4 class="card-title">{course_name}{id}</h4>
                <h6 class="card-subtitle mb-2 text-muted">{course_code}</h6>
                <p class="card-text">{course_description}</p>
                <a href="#" class="btn btn-primary" onClick={()=>{this.loadDetails(id)}}>Details/Register</a>
            </div>
            <div class="card-footer" >
              <small class="text-muted">{`${starts} - ${ends}`}</small>
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
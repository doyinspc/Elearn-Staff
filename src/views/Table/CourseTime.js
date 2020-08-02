
import React from "react";
import { connect } from 'react-redux';
// reactstrap components
import {
  UncontrolledTooltip,
  Button,
  Media
} from "reactstrap";
import CourseTimeLine from './CourseTimeline';
import { SERVER_URL } from "actions/common";
const imgx = require("assets/img/place.png");

class TimeLine extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:props.mid,
      data:[]
      
    }
  }
  componentWillReceiveProps(nextProps, nexState)
   {
     if(nextProps.userstudentcourses.userstudentcourse.cid !== this.state.id)
     {
       this.setState({data:nextProps.coursematerials.coursematerials});
     }

   }
  render() {
     let mate =  this.state.data;
     let material = mate && Array.isArray(mate) ? mate.map((prop, index)=>{
            return <CourseTimeLine  key={index} data={prop}/>
     }): null;

    return (
      <>
        {!this.props.coursematerials.isLoading ?
            <div class="card card-timeline card-plain">
                <div class="card-body">
                    <ul class="timeline timeline-simple">
                      {material}
                    </ul>
                </div>
            </div>
         :<h3><i classname="fa fa-download"></i></h3>   }  
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ 
  coursematerials: state.coursematerialReducer,
  userstudentcourses:state.userstudentcourseReducer,
  user: state.userstudentReducer.user,
})

export default connect(mapStateToProps, { })(TimeLine)
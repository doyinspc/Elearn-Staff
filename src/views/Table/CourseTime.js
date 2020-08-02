
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
      id:null,
      
    }
  }
  render() {
     let mate =  this.props.coursematerials.coursematerials;

     let material = mate && Array.isArray(mate) ? mate.map((prop, index)=>{
            return <CourseTimeLine  key={index} data={prop}/>
     }): null;

    return (
      <>
        <div class="row">
              <div class="col-md-12">
                  <div class="card card-timeline card-plain">
                      <div class="card-body">
                          <ul class="timeline">
                            {material}
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
         
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ 
  coursematerials: state.coursematerialReducer,
  user: state.userstudentReducer.user,
})

export default connect(mapStateToProps, { })(TimeLine)
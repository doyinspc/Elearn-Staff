import React from "react";
import CardRow1 from "./CardRow1";

import {Col} from "reactstrap";

class CardUserCourse extends React.Component {
  render() {
    let cour = this.props.data && Array.isArray(this.props.data) && this.props.data.length  ? this.props.data : [];
    let courses = cour.map((prop, index) =>{
      return <CardRow1 key={`AA_${index}`} data={prop} /> 
    })
    let courx = this.props.datax && Array.isArray(this.props.datax) && this.props.datax.length  ? this.props.datax : [];
    let coursesx = courx.map((prop, index) =>{
      return <CardRow1 key={`BB_${index}`} data={prop} /> 
    })
    return (
      <>
        <Col md="4">
        <div class="card card-nav-tabs">
          <div class="card-header card-header-danger title" style={{textTransform:'capitalize'}}>
           {`Courses Completed`}  
          </div>
          <ul class="list-group list-group-flush">
            {courses}
          </ul>
          <div class="card-footer" >
           <button class="btn btn-info btn-sm">Go!</button> 
          </div>
        </div>
        <div class="card card-nav-tabs">
          <div class="card-header card-header-danger title" style={{textTransform:'capitalize'}}>
           {`Courses`}  
          </div>
          <ul class="list-group list-group-flush">
            {coursesx}
          </ul>
          <div class="card-footer" >
           <button class="btn btn-primary btn-sm">Go!</button> 
          </div>
        </div>
        </Col>
      </>
    );
  }
}

export default CardUserCourse;

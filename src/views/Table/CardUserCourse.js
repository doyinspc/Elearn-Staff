import React from "react";
import CardRow from "./CardRow";
import {Col} from "reactstrap";
import { Link } from "react-router-dom";

class CardUserCourse extends React.Component {
  render() {
    let cour = this.props.data && Array.isArray(this.props.data) && this.props.data.length  ? this.props.data : [];
    let courses = cour.map((prop, index) =>{
      return <CardRow key={`AA_${index}`} data={prop} /> 
    })
   
    return (
      <>
        <Col md="4">
        <div class="card card-nav-tabs">
          <div class="card-header card-header-danger title" style={{textTransform:'capitalize'}}>
           {`Classes `}  
          </div>
          <ul class="list-group list-group-flush">
            {courses}
          </ul>
          <div class="card-footer" >
           <Link to='/admin/course' class="btn btn-block btn-info btn-sm">Go! to classes</Link>
          </div>
        </div>
       
        </Col>
      </>
    );
  }
}

export default CardUserCourse;

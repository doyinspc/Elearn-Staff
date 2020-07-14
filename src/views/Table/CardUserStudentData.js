import React from "react";
import CardStat from "./CardStat";

import {Col} from "reactstrap";

class CardUserCourse extends React.Component {
  render() {
    let cour = this.props.data && Array.isArray(this.props.data) && this.props.data.length  ? this.props.data : [];
    let courses = cour.map((prop, index) =>{
      return <CardStat key={index} data={prop} /> 
    })
    return (
      <>
        <Col md="8">
           {courses}
        </Col>
      </>
    );
  }
}

export default CardUserCourse;

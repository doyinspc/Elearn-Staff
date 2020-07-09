import React from "react";
import CardStat from "./CardStat";

import {Col} from "reactstrap";

class CardUserCourse extends React.Component {
  render() {
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

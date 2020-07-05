
import React from "react";

// reactstrap components
import {
  Label,
  Input,
  FormGroup,
  UncontrolledTooltip,
  Button,
  Media
} from "reactstrap";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      
    }
  }
  

  render() {
     let {firstname, lastname, middlename, gender, department, } = this.props.data;
    return (
      <>
         <tr>
          <td>Dakota Rice</td>
          <td>Niger</td>
          <td>Oud-Turnhout</td>
          <td className="text-right">$36,738</td>
        </tr>
      </>
    );
  }
}


export default Course
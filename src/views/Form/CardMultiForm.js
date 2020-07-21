
import React from "react";

// reactstrap components
import {
  Input,
  FormGroup,
  Col,
  Row
} from "reactstrap";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      que:''
      
    }
  }

  componentDidMount(){
    this.setState({que:this.props.data, id:this.props.index})
  }
 
  render() {
     let que = this.state.que;
     let index = this.state.id;
     let num = this.state.num;
    return (
      <>
        <FormGroup check >
            <Row sm={12}>
              <Col sm={1}>
                {this.props.type === 1 || this.props.type === 2  ?
                  this.props.answer ? <i className="fa fa-check text-success"></i> : <i className="fa fa-remove text-danger"></i>
                : ''}
                 
                 {this.props.type === 3 ?
                  <i className="fa fa-check text-success"></i>
                : ''}
              </Col>
              <Col sm={10}>{que}</Col>      
            </Row>
        </FormGroup>
      </>
    );
  }
}


export default Course
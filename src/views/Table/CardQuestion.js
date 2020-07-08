
import React from "react";

// reactstrap components
import {
 Container,
 Row,
 Col,
 Button
} from "reactstrap";

const arr ={
  1: 'Upload as attachment',
  2: 'Post text',
  3: 'Provide link'
}
class Course extends React.Component {

  setsEdit = indx =>{
    this.props.setsEditQuestion(indx);
  }
  setsDelete = indx =>{
    this.props.setsDeleteQuestion(indx);
  }
 
  render() {
     let {question, answer, score, submission } = this.props.data;
    return (
      <>
         <Container> 
           <Col sm='12'>
              <Row><div dangerouslySetInnerHTML={{__html: question}} /></Row>
              <Row><small class="text-success"><div dangerouslySetInnerHTML={{__html:answer}} /></small></Row>
              <Row>
                    <Col sm='3'><small><i class="fa fa-check"></i> {score}</small></Col>
                    <Col sm='5'><small><i class="fa fa-paperclip"></i>  {arr[submission]}</small></Col>
                    <Col sm='4'>
                        <button  class="btn btn-primary btn-icon btn-round btn-link" color='info' onClick={()=>this.setsEdit(this.props.index)}><i class="fa fa-edit"></i></button>
                        <button  class="btn btn-primary btn-icon btn-round btn-link" color='danger' onClick={()=>this.setsDelete(this.props.index)}><i class="fa fa-trash"></i></button>
                    </Col>
              </Row>
           </Col>
          </Container>
      </>
    );
  }
}


export default Course
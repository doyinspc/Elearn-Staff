
import React from "react";
import CardMultiForm from "./../Form/CardMultiForm"
// reactstrap components
import {
 Container,
 Row,
 Col,
 Card,
 CardHeader,
 CardBody,
 CardFooter
} from "reactstrap";

const arr ={
  1: 'Upload as attachment',
  2: 'Post text',
  3: 'Provide link'
}
class Course extends React.Component {

  setsEdit = indx =>{
    this.props.handleEdit(indx);
  }
  setsDelete = indx =>{
    this.props.handleDelete(indx);
  }
 
  render() {
    
     let { question, type, answer, points, options } = this.props.data;
     let ans = answer && answer.length > 0 ? answer.split('::::::') : [];
     options = options && options !=  "" ? options.split("::::::") : [];
     let option1 = options && Array.isArray(options) && options.length > 0 ? options.map((prop, inds)=>{
            let finalAnswer = ans && ans.includes(prop) ? true : false;
            return <CardMultiForm key={`ABCD_${inds}`} type={type} answer={finalAnswer} data={prop} index={inds} />
        }): null; 
    return (
      <>
      <Card>
        <CardHeader>
          {type === 1 ? 'Choose the correct option':''}
          {type === 2 ? 'Choose all the correct options':''}
          {type === 3 ? 'Give the answer that best fit the empty space':''}
          {type === 4 ? 'Using a short sentence or phrase answer the question below':''}
          {type === 5 ? 'Essay':''}
      </CardHeader>
      <hr />
      <CardBody >
        <Container>
          <Row sm={12}>
              <Col sm={1} >
                  {this.props.index + 1}
              </Col>
              <Col sm={10}>
                  <div dangerouslySetInnerHTML={{__html: question}} />
              </Col>
          </Row>
          <Row sm={12}>
              <Col>
                {type === 1 || type === 2 || type === 3 ? option1 : null}
                {type === 4 || type === 5 ? <div dangerouslySetInnerHTML={{__html: answer}} /> : null }
              </Col>
          </Row>
        </Container>

      </CardBody>
      <hr/>
      <CardFooter>
        <Container>
        <Row sm={12}>
                    <Col sm='6'>
                    <button  class="btn btn-primary  btn-link" color='danger' onClick={()=>this.setsDelete(this.props.index)}><i class="fa fa-trash"></i></button> 
                    <button  class="btn btn-primary  btn-link" color='info' onClick={()=>this.setsEdit(this.props.index)}><i class="fa fa-edit"></i></button>
                   
                        <button  class="btn btn-primary btn-link" color='info' >
                          <i class="fa fa-check text-mute"></i> {points} point(s)
                        </button>
                    </Col>
                    <Col sm='2'>
                         </Col>
                    
          </Row>
          </Container>
      </CardFooter>
      </Card>
         <Container> 
           <Col sm='12'>
              <Row></Row>
              <Row><small class="text-success"><div dangerouslySetInnerHTML={{__html:answer}} /></small></Row>
              <Row>
              </Row>
           </Col>
          </Container>
      </>
    );
  }
}


export default Course
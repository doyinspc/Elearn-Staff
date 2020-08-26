
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
import { SERVER_URL } from "actions/common";
import ShowImage from './ShowImage';

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
    
     let { question, type, answer, points, options, instruction, imgs, vids, auds } = this.props.data;
     let ans = answer && answer.length > 0 ? answer.split('::::::') : [];
     options = options && options !=  "" ? options.split("::::::") : [];
     let option1 = options && Array.isArray(Object.keys(options)) && Object.keys(options).length > 0 ? Object.keys(options).map((prop)=>{
            let oop = options[prop].split("::::")
            let finalAnswer = ans && ans.includes(oop[0]) ? true : false;
            return <CardMultiForm key={`ABCD_${oop[0]}`} type={type} answer={finalAnswer} data={oop[1]} index={oop[0]} />
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
              <Col xs={2} >
                  {this.props.numbering}
              </Col>
              {instruction && instruction.length > 0 ?
              <Row className='m-0 p-0' >
                <div  dangerouslySetInnerHTML={{__html: instruction.substring(0, 20)}} />
              </Row>:''}
              <Col xs={10}>
                  <div dangerouslySetInnerHTML={{__html: question}} />
              </Col>
          </Row>
          {imgs && imgs !== null && imgs.length > 0 ?
              <Row xs='12' className='m-1 p-1'>
               <ShowImage
                  path={SERVER_URL + imgs}
                  type={1}
              />
              </Row>
               :''}
               {auds && auds !== null && auds.length > 0 ?
              <Row xs='12' className='m-1 p-1'>
               <ShowImage
                  path={SERVER_URL + auds}
                  type={2}
              />
              </Row>
               :''}
              {vids && vids !== null && vids.length > 0 ?
              <Row xs='12' className='m-1 p-1'>
               <ShowImage
                  path={SERVER_URL + vids}
                  type={3}
              />
              </Row>
               :''}
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

import React from "react";
import CKEditor from 'ckeditor4-react';
// reactstrap components
import {
  Label,
  Input,
  FormGroup,
  Col,
  FormText,
  Form,
  CustomInput
} from "reactstrap";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      question:null,
      answer: null,
      score: 1,
      submission: 1
    }
  }

  componentDidMount(){

  }
  

  render() {
     let { question, answer, score, submission } = this.state;
    return (
      <>
              <Form>
                <FormGroup row>
                <Label for="question" sm={12}>Question</Label>
                <Col sm={12}>
                  <CKEditor
                  data ={question}
                  onChange={e=>this.setState({question:e.editor.getData()})}
                  />
                </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="answer" sm={12}>Answer </Label>
                <Col sm={12}>
                  <CKEditor
                  data ={answer}
                  onChange={e=>this.setState({answer:e.editor.getData()})}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
              <Label for="exampleCheckbox">Radios</Label>
              <div>
                <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Submit as attachment" />
                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Paste content" />
                <CustomInput type="radio" id="exampleCustomRadio3" name="customRadio" label="Provide link" />
              </div>
            </FormGroup>
              <FormGroup row>
                <Label for="score" sm={3}>Max score </Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="score" 
                    id="score"  
                    required
                    defaultValue={score}
                    onChange={e=>this.setState({score:e.target.value})} 
                     /><FormText class='muted'>Maximum score attainable</FormText>
                </Col>
            </FormGroup>
          </Form>
      </>
    );
  }
}


export default Course
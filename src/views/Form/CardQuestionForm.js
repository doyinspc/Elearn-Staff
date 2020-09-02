
import React from "react";
import CKEditor from 'ckeditor4-react';
import {callError} from './../../actions/common';
// reactstrap components
import {
  Label,
  Input,
  FormGroup,
  Col,
  FormText,
  Form,
  CustomInput,
  Button
} from "reactstrap";
import { callError } from "actions/common";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      question:null,
      answer: null,
      score: 1,
      submission: 1,
      indx:null
    }
  }

  componentDidMount(){
    let {data} = this.props;
    try{
    if(data && Object.keys(data).length > 0 )
    {
      this.setState({
        question:data.question,
        answer: data.answer,
        score: data.score,
        submission: data.submission,
        indx:data.indx
      })

    }else
    {
      throw 'Not an array'
    }
    }catch(err)
    {
      callError(err)
    }

  }
  handleSubmit = () =>{
    let { question, answer, score, submission } = this.state;
    let data = { question, answer, score, submission };
    if(this.state.indx && parseInt(this.state.indx) > 0)
    {
      this.props.setUpdateQuestion(data, this.props.id);
    }else{
      this.props.setSubmitQuestion(data);
    }
    
  }
  

  render() {
     let { question, answer, score, submission } = this.state;
    return (
      <><Form>
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
              <Label for="exampleCheckbox">Submission</Label>
              <div>
                <CustomInput type="radio" onChange={()=>this.setState({submission:1})} id="examplesubmission" value={1} checked ={submission === 1 ? true : false} name="submission" label="Submit as attachment" />
                <CustomInput type="radio" onChange={()=>this.setState({submission:2})} id="examplesubmission2" value={2} checked ={submission === 2 ? true : false} name="submission" label="Paste content" />
                <CustomInput type="radio" onChange={()=>this.setState({submission:3})} id="examplesubmission3" value={3} checked ={submission === 3 ? true : false} name="submission" label="Provide link" />
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
            <FormGroup row>
              <Button className="btn-sm" color="info" onClick={this.handleSubmit}>Save</Button>
            </FormGroup>
           
          </Form>
          
      </>
    );
  }
}


export default Course

import React from "react";
import CKEditor from 'ckeditor4-react';
import RowOptionForm from './RowOptionForm';
// reactstrap components
import {
  Label,
  Input,
  FormGroup,
  Col,
  FormText,
  Form,
  CustomInput,
  Button,
  Row
} from "reactstrap";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      question:null,
      answer: [''],
      distractor: [''],
      score: 1,
      submission: 1,
      indx:null
    }
  }

  componentDidMount(){
    let {data} = this.props;
    if(data && Object.keys(data).length > 0 )
    {
      this.setState({
        question:data.question,
        answer: data.answer,
        distractor: data.distractor,
        score: data.score,
        submission: data.submission,
        indx:data.indx
      })

    }

  }

  handleAdd= (e) =>{
    let es = e === 0 ? [...this.state.distractor] :  [...this.state.answer];
    let ses = [...es, ""];
    e === 0 ? this.setState({distractor:ses}) : this.setState({answer:ses});
  }
  
  handleChange = (e, indx, st) =>{
    console.log(`data ${e}`);
    console.log(`data ${indx}`);
    console.log(`data ${st}`);
    let es = st === 0 ? [...this.state.distractor] : [...this.state.answer];
    console.log(`data ${es}`);
    for(let i = 0 ; es.length; i++)
    {
      if(i === indx)
      {
        es[i] = e;
      }
    }
    st === 0 ? this.setState({distractor:es}) : this.setState({answer:es});
  }

  setDelete = (e) =>{
    this.props.setDeleteRow(e);
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
     let { question, distractor, answer, score, submission } = this.state;

     let dis = distractor.map((prop, index)=>{
            return <RowOptionForm st={0} index={index} data={prop} key={index} handleChange={(e, f, g)=>this.handleChange(e ,f, g)} setDelete={this.setDelete}/>
     });
     let ans = answer.map((prop, index)=>{
            return <RowOptionForm st={1} index={index} data={prop} key={index} handleChange={this.handleChange} setDelete={this.setDelete}/>
     });

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
                <Row>
                  <Col sm="6">
                     <Row >
                        <button  class="btn btn-primary btn-icon btn-round btn-link" color='danger' onClick={()=>this.handleAdd(0)}><i class="fa fa-plus"></i></button>
                        Wrong Option(s)
                    </Row>
                    {dis}
                  </Col>
                  <Col sm="6">
                  <Row>
                    <button  class="btn btn-primary btn-icon btn-round btn-link" color='danger' onClick={()=>this.handleAdd(1)}><i class="fa fa-plus"></i></button>
                    Correct Option(s)
                    </Row>
                    {ans}
                    </Col>
                </Row>
                 
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
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Label, Input, Col, Container,  Row, FormText, CustomInput } from 'reactstrap';



import CardQuestion from './../Table/CardQuestion';
import CardFitbForm from './CardFitbForm';
import CardFitbForm1 from './CardFitbForm1';
import CardFitbForm2 from './CardFitbForm2';


import Editor from './../../components/Editor';

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [type, setType] = useState(0);
  const [question, setQuestion] = useState([]);
  const [optx, setOptx] = useState(['']);
  const [answer, setAnswer] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [points, setPoints] = useState(1);
  const [qbank, setQbank] = useState([]);
  
  const clearState = () =>{
    setModal(false);
    setId(null);
    setType(0);
    setQuestion([]);
    setOptx(['']);
    setAnswer([]);
    setPoints(1);
    setQbank([]);
  }

  const clearForm = () =>{
    setId(null);
    setType(0);
    setQuestion([]);
    setOptx(['']);
    setAnswer([]);
    setPoints(1);
  }

 
 
  const toggle = () => setModal(!modal);
  const toggles = (rid) => {
    toggle();
    setType(rid);
  }

  const opts = (rid) => {
    setType(rid);
  }
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);     
    } 
    populate(props.data);
},[props.mid]);

  
  const handleSubmit = (e) =>{
        //GET TYPE
        let arr = {}
        arr['question'] = question;
        arr['type'] = type;
        arr['points'] = points;
        if(type === 1 || type === 2 || type === 3)
        {
          if(type === 1 || type === 2)
          {
            let an = Object.keys(answers).map((prop, ind)=>{
              return optx[prop];
            })
            let ant = an.filter((prop, ind)=>prop !== "" || prop !== null);
            let anti = ant.join("::::::");
            arr['answer'] = anti;;
          }
          let ret = optx.filter((prop, ind)=>prop !== "" || prop !== null);
          let ret1 = ret.join("::::::");
          arr['options'] = ret1;
        }
        else if(type === 4 || type === 5)
        {
          arr['answer'] = answer;
        }else
        {
          arr['answer'] = '';
        }
        
        let all = qbank && Array.isArray(qbank) ? [...qbank] : [];
        all.push(arr);
        setQbank(all);
        props.updateCoursematerial({question:JSON.stringify(all)}, props.id);
        clearForm();
  }

  const handleUpdate = (e) =>{
    //GET TYPE
    let arr = {}
    arr['question'] = question;
    arr['type'] = type;
    arr['points'] = points;
    if(type === 1 || type === 2 || type === 3)
    {
      if(type === 1 || type === 2)
      {
        let an = Object.keys(answers).map((prop, ind)=>{
          return optx[prop];
        })
        let ant = an.filter((prop, ind)=>prop !== "" || prop !== null);
        let anti = ant.join("::::::");
        arr['answer'] = anti;;
      }
      let ret = optx.filter((prop, ind)=>prop !== "" || prop !== null);
      let ret1 = ret.join("::::::");
      arr['options'] = ret1;
    }
    else if(type === 4 || type === 5)
    {
      arr['answer'] = answer;
    }else
    {
      arr['answer'] = '';
    }
    
    let all = qbank && Array.isArray(qbank) ? [...qbank] : [];
    all[id] = arr;
    setQbank(all);
    props.updateCoursematerial({question:JSON.stringify(all)}, props.id);
    clearForm();
}
  //ADD SPACE FOR NEW OPTION
  const addOption = (e) =>{
    e.preventDefault();
    let ops = [...optx, ''];
    setOptx(ops);
  }
  //REMOVE SPACE AND OPTION ITEM
  const removeOption = indx =>{
    let ed = [...optx];
    ed.splice(indx, 1);
    setOptx(ed);
 }
  //CHANGE VALUE
  const handleChange = (data, ind) =>{
    let ed = [...optx];
    ed[ind] = data;
    setOptx(ed);  
 }

 const handleChangeAnswer = (data, st, ind) =>{
  if(data !== "" || data !== null || data !== 'undefined')
  {
      let ed = type === 1 ? {} : {...answers};
      if(st)
      {
        ed[ind] = st;
      }else{
        delete ed[ind];
      }
      setAnswers(ed);  
  }
  
}
  const setSubmitQuestion = data =>{
    let q = [...question, data]
    setQuestion(q);
  }
  const setUpdateQuestion = (data, id) =>{
    let q = [...qbank];
    q[id] = data;
    setQuestion(q);
  }
  const setEditQuestion = indx =>{
     let ed = qbank && Array.isArray(qbank) && qbank.length > 0 ? [...qbank] : [];
     let eds = ed.filter((r, i)=>i === indx)[0];
     //clearForm();
     if(eds && Object.keys(eds).length > 0 )
     { 
       let ops = eds.options ? eds.options.split('::::::') :[""];
       console.log(ops);
       let ans = "";
       if(eds.type !== 1 && eds.type !== 2)
       {
        ans = eds.answer ? eds.answer.split('::::::') :[""];
       }else{
        ans = eds.answer;
       }
       setId(indx);
       setQuestion(eds.question);
       setType(eds.type);
       setPoints(eds.points);
       setAnswer(ans);
       setAnswers(ans);
       setOptx(ops);
      }
  }
  const setDeleteQuestion = indx =>{
    let ed = [...qbank];
    let eds = ed.filter((prop, index)=>index !== indx);
    setQbank(eds);
 }

  const populate = async(data) =>{
        let ques = JSON.parse(data.question);
        setQbank(ques)
      }
  let loadOptx = null;
  if(type === 1){
  loadOptx =  optx && Array.isArray(optx) && optx.length > 0 ? optx.map((prop, index)=>{
      return <CardFitbForm 
                  key={`ab_${index}`} 
                  index={index} 
                  num={type}
                  val={answer}
                  data={prop}
                  removeOption={removeOption}
                  handleChange={handleChange}
                  handleChangeAnswer={handleChangeAnswer}
                  />
      }): null; 
    }
  if(type === 2){
  loadOptx =  optx && Array.isArray(optx) && optx.length > 0 ? optx.map((prop, index)=>{
      return <CardFitbForm1 
                  key={`abd_${index}`} 
                  index={index} 
                  num={type}
                  val={answer}
                  data={prop}
                  removeOption={removeOption}
                  handleChange={handleChange}
                  handleChangeAnswer={handleChangeAnswer}
                  />
      }): null;
    }
  if(type === 3){
  loadOptx =  optx && Array.isArray(optx) && optx.length > 0 ? optx.map((prop, index)=>{
      return <CardFitbForm2 
                  key={`abe_${index}`} 
                  index={index} 
                  num={type}
                  val={answer}
                  data={prop}
                  removeOption={removeOption}
                  handleChange={handleChange}
                  handleChangeAnswer={handleChangeAnswer}
                  />
      }): null;
    }
  const loadQuestions = qbank && Array.isArray(qbank) && qbank.length > 0 ? qbank.map((prop, index)=>{
      return <CardQuestion
                  key={`abc_${index}`} 
                  num={parseInt(prop.type)}
                  index={index} 
                  data={prop}
                  handleEdit={(rid)=>setEditQuestion(rid)}
                  handleDelete={(rid)=>setDeleteQuestion(rid)}
              />
  }): null;

  let editColor = 'primary';
  let bgcolor = id ? '#ccc' : '#fff';
  return (
    <div>
       
        <button class="btn btn-secondary" onClick={()=>toggles(1)} type="button"  >
          <i class="fa fa-plus"></i> Add Assessment
        </button>
      
      <Modal isOpen={modal} toggle={toggle} contentClassName={{width:'800px', height:400}} >
        <ModalHeader toggle={toggle}>Assessments</ModalHeader>
        <ModalBody style={{backgroundColor:'#fffccc'}}>
        <Container >
          <Card>
            <CardBody style={{backgroundColor:bgcolor}}>
              <Row>
                <Col sm={10}>
                  <Input
                    name={question}
                    value={question}
                    type="textarea"
                    row={4}
                    col={8}
                    placeholder="Question"
                    onChange={(e)=>setQuestion(e.target.value)}
                    />
                </Col>
                <Col >
                    <a onClick={handleSubmit}><h3><i className="fa fa-image"></i></h3></a>
                </Col>
              </Row>
              
              <Row>
                <Col>
                  <div class="btn-group dropdown">
                    <button class="btn btn-secondary dropdown-toggle btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-plus"></i> Choose answer type
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{zIndex:201}}>
                        <a class="dropdown-item" href="#" onClick={()=>opts(1)}><i class='fa fa-question'></i> Multichoice (Single Answer)</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(2)}><i class='fa fa-question'></i> Multichoice (Multiple Answer)</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(3)}><i class='fa fa-question'></i> Fill in the blank</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(4)}><i class='fa fa-question'></i> Short Text</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(5)}><i class="fa fa-question" ></i> Long Text</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(6)}><i class='fa fa-attach'></i> Upload Answer</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(7)}><i class='fa fa-link'></i> Post Link</a>   
                      </div>
                    </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12} >
                {type === 1  || type== 2 || type== 3? 
                  <div >
                   {loadOptx}
                  <FormGroup inline>
                    <a href="#" className="btn btn-primary btn-icon" onClick={addOption}><i className="fa fa-plus"></i></a>
                  </FormGroup>
                  </div>
               
                : ""}
                
                {type === 4 ? 
                <Input
                    name='question'
                    value={question}
                    defaultValue={question}
                    type="text"
                    placeholder="Short answer (Teacher marked)"
                />:""
                }
                {type === 5 ? 
                <Input
                    name='answer'
                    value={answer}
                    defaultValue={answer}
                    type="textarea"
                    row={4}
                    col={8}
                    placeholder="Long answer (Teacher marked)"
                />:""
                }
                {type === 6 ? 
                 <p><i className='text-mute'>Answer to be submitted as an attachement</i></p>:""
                }
                {type === 7 ? 
                 <p><i className='text-mute'>Link to answer would be submitted</i></p>:""
                }
                </Col>
              </Row>
              <Row sm={12}>
                <FormGroup row className="container">
                <Label sm={3}>Points</Label>
                <Col sm={9}>
                  <Input
                    classname="form-control form-control-sm"
                    style={{height:25}}
                    name='points'
                    value={points}
                    type="number"
                    placeholder="1"
                    onChange={(e)=>setPoints(e.target.value)}
                    />
                </Col>
                </FormGroup>
              </Row>
            
            </CardBody>
            <CardFooter>
              <button className="btn btn-sm" onClick={handleSubmit}><i className='fa fa-save'></i> Save Question</button>
            </CardFooter>
          </Card>
        </Container>
          {loadQuestions}
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={id ? handleUpdate : handleSubmit}>{id ? 'Change' : 'Save' }</Button>{' '}
          { id ? <Button color="info" onClick={clearState}>Add New</Button> : null}
          <Button color="secondary" onClick={clearState}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    );
}
const mapStateToProps = (state, ownProps) => ({ 
    courses: state.courseReducer,
    coursematerials: state.coursematerialReducer,
  })
  
export default connect(mapStateToProps, { getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)

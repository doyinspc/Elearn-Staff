import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { 
  Button, 
  Modal, 
  ModalHeader,
  ModalBody, 
  ModalFooter, 
  Row,
  Container,
  FormGroup,
  FormText,
  Input,
  Col,
  Label,
  Form,
  Alert
} from 'reactstrap';
import { updateCoursescore } from './../../actions/coursescore';
import { SERVER_URL } from "./../../actions/common.js";

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [type, setType] = useState(null);
  const [points, setPoints] = useState();
  const [timer, setTimer] = useState();
  const [timeused, setTimeused] = useState(0);
  const [corr, setCorr] = useState('');
  const [score, setScore] = useState('');
  const [marked, setMarked] = useState(0);
  const [submitted, setSubmitted] = useState(0);
  const [backdrop, setBackdrop] = useState('static');
  const [keyboard, setKeyboard] = useState(false)
   const toggle = () => {
       setModal(!modal);
    }

    const resetdata = () =>{
      setModal(false);
      props.handleClose();
    }

  useEffect(() => {
      
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     toggle(!modal);
     let dt = props.data;
     let sc = props.score;
     setQuestion(dt.question); //QUESTION
     setType(parseInt(dt.type)); //TYPE
     setPoints(parseInt(dt.points)); //POINTS
     setAnswer(sc.answer);// STUDENT ANSWER
     setTimer(props.timer); //TIMER
     setTimeused(100000); //TIME LET BY STUDENTS
     setSubmitted(sc.is_submitted); //SUBMISSION
     setMarked(sc.is_marked); //TEST MARKED
     /**
      * IF THE TEST HAS NOT BEEN SUBMITTED
      * DO NOT SET CORRECT ANSWER
      * SET TIMER IF ACTIVE
      */
     if(parseInt(sc.is_submitted) === 0)
     {
        setCorr(''); //CORRECT ANSWER
     }
      /**
       * IF THE TEST HAS BEEN SUBMITTED
       * SET CORRECT ANSWER
       * STOP TIMER IF AVAILABLE
       * SHOW SCORE IF AVAILABLE ELSE INDICATE PENDING
      */
     else
     {
         if(sc.is_marked === 0)
         {
            setCorr(dt.answer); //CORRECT ANSWER
            setScore('pending');
         }else
         {
            setCorr(dt.answer); //CORRECT ANSWER
            let points = dt.points * sc.score;
            setScore(points);
         }
        
     }
    } 

    //calTime();
},[props.mid]);

  useEffect(()=>{
    if(timer !== '' && parseInt(timeused) > -1){
      const runtimer = setTimeout(() => {
        let newtime = timeused - 1000;
        if(newtime > 0)
        {
          setTimeused(newtime)
        }else
        {
          setTimeused('TIME UP');
          submitMyAnswer()
          .then((data)=>{

          })
          .catch((err)=>{
            
          })
        }
      }, 1000);
     return()=>clearTimeout(runtimer);
    }
  },[timeused])
 
 //SET TIMER AS TEXT
  const timeText = (milli) =>{
      let hrs = Math.floor(milli/(1000 * 60 * 60));
      let minn = (milli/(1000 * 60 * 60)) - hrs;
      let mins = Math.floor(minn * 60);
      let secs = Math.floor(((minn * 60) - mins) * 60);
      return `${hrs} hrs : ${mins} mins : ${secs} secs`;
  }
 //SAVE ANWER FOR LATR
 const saveMyAnswer = () =>{
     let fd = new FormData();
     fd.append('answer', answer);
     fd.append('id', id);
     fd.append('timer', timeused);
     fd.append('cat', 'update');
     fd.append('table', 'course_scores');
     props.updateCoursescore(fd);
     resetdata();
 }
//SUBMIT ANSWER FINALLY
 const submitMyAnswer = () =>{
  return new Promise((resolve, reject)=>{
    let fd = new FormData();
    fd.append('answer', answer);
    fd.append('id', id);
    fd.append('timer', timeused);
    fd.append('is_submitted', 1);
    fd.append('cat', 'update');
    fd.append('table', 'course_scores');
    try
    {
     props.updateCoursescore(fd);
     resolve('ok')
     resetdata()
    }catch(err)
    {
      reject(err);
    } 
  })
   
}


let ret = '';
if(marked === 1 || submitted === 1 )
{
    if(type === 4){ ret = <svg><text><div dangerouslySetInnerHTML={{__html:answer}}/></text></svg>}
    else if(type === 5){ ret = <a target='_blank' href={answer} className='btn btn-info btn-sm btn-block'>Download</a>}
    else if(type === 6){ ret = <a target='_blamk' href={SERVER_URL + answer} className='btn btn-info btn-sm btn-block'>Download</a>}
}
else
{   
    if(type === 4){ ret =  <FormGroup row>
        <Col xs={12}>
        <Input 
            type="textarea" 
            name="answer" 
            id="answer"  
            class='form-control'
              
            defaultValue={answer}
            placeholder='Type in your answer'
            onChange={e=>setAnswer(e.target.value)} 
             /><FormText class='muted'>Maximum of 20 words </FormText>
        </Col></FormGroup>}
    else if(type === 5){ ret =  <FormGroup row>
        <Label for="link" xs={12}>Type in or copy and past your answer </Label>
        <Col xs={12}>
          <CKEditor
          data ={answer}
          onChange={e=>setAnswer(e.editor.getData())}
          />

        </Col></FormGroup>}
    else if(type === 6){ ret = <a href={answer} className='btn btn-info'>Download</a>}
    else if(type === 7){ ret = <FormGroup row>
      <Col sm={12}>
      <Input 
          type="url" 
          name="answer" 
          id="answer" 
          className='form-control' 
          defaultValue={answer}
          placeholder='Type/paste the link'
          onChange={e=>setAnswer(e.target.value)} 
           />
      </Col></FormGroup>}
    else if(type === 7){ ret = <FormGroup row>
        <Col sm={12}>
        <Input 
            type="url" 
            name="answer" 
            id="answer" 
            className='form-control' 
            defaultValue={answer}
            placeholder='Type/paste the link'
            onChange={e=>setAnswer(e.target.value)} 
             />
        </Col></FormGroup>}
}

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop} keyboard={keyboard}>
  <ModalHeader toggle={resetdata}>Essay {props.numb} <h6 class='pull-left d-block'><small>{timer !== '' ? timeText(timeused) : 'No Timer'}</small></h6></ModalHeader>
        <ModalBody>
            <Form>
        <div class="card" >
        <div class="card-header">
          {type === 1 ? 'Choose the correct option':''}
          {type === 2 ? 'Choose all the correct options':''}
          {type === 3 ? 'Give the answer that best fit the empty space':''}
          {type === 4 ? 'Using a short sentence or phrase answer the question below':''}
          {type === 5 ? 'Essay':''}
        </div>
            <div class="card-body">
            <Container>
                    <Row xs='12'>
                      <Col xs='9'>
                          <p><div dangerouslySetInnerHTML={{__html:question}}/></p>
                      </Col>
                      <Col xs='3'>
                        <small>{`${points} points`}</small>
                      </Col>
                    </Row>
               </Container>
                
                <Container xs='12'>
                    <Row xs='12'>
                        {ret}
                    </Row>
                </Container>
            </div>          
        </div>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
          {score.length > 0 ? <h3>{score}</h3> :
          <>
          <Button color="warning" onClick={saveMyAnswer} >Save for Later</Button>
          <Button color="info" onClick={submitMyAnswer} >Submit</Button>
          </>
          }
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({ 
    user: state.userstudentReducer.user
  })
  
export default connect(mapStateToProps,{updateCoursescore})(Modals);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import { updateCoursescore } from './../../actions/coursescore';
import { SERVER_URL } from "./../../actions/common.js";

const imgx = require("assets/img/place.png");
const imgs = require("assets/img/bg3.jpg");

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [optionx, setOptionx] = useState(null);
  const [type, setType] = useState(null);
  const [points, setPoints] = useState();
  const [timer, setTimer] = useState();
  const [timeused, setTimeused] = useState(0);
  const [corr, setCorr] = useState('');
  const [score, setScore] = useState('');
  const [marked, setMarked] = useState(0);
  const [submitted, setSubmitted] = useState(0);
  const [all, setAll] = useState({});
  const [keyz, setKeyz] = useState([]);
  const [ind, setInd] = useState(-1);
  const [backdrop, setBackdrop] = useState('static');
  const [keyboard, setKeyboard] = useState(false)

    const toggle = () =>setModal(!modal);
    /**
     * 
     * POPULATE THE QUESTION DATA BY UPDATING
     * THE STATES
     */
    const loaddata = (index) =>{
        let d = all[index];
        if(d && d instanceof Object)
        {
        let ops = 'options' in d && d.options.length > 0 ? d.options.split('::::::') : [];
        let ops_arr =  {};
        if(ops.length > 0){
        for(let i = 0; i < ops.length; i++)
        {
            try{
            let op1 = ops[i].toString();
            let op2= op1.spilt('::::');
            ops_arr[op2[0]] = op2[1];
            }catch(err)
            {
                //console.log(err);
            }
        }
        }
        setQuestion(d.question);
        setType(d.type);
        setPoints(d.points);
        setOptionx(ops_arr);
        }
    }

    const moveF = () =>{
        let inds = {...keyz}
        let newIndex = ind + 1 <= Object.keys(inds).length ? ind + 1 : ind;
        setInd(newIndex);
        loaddata(newIndex);
    }
    const moveB = () =>{
        let newIndex = ind - 1 > -1 ? ind - 1 : ind;
        setInd(newIndex);
        loaddata(newIndex);
    }

    const resetdata = () =>{
      setModal(false);
      props.handleClose();
    }
 /**
  * 
  * @param {*} inds 
  * @param {*} val 
  * SAVE ANSWERS FROM OPTION ONE AND THREE
  */
    const saveAnswer = (inds, val) =>{
        let ans = {...answer};
        ans[inds] = val;
        setAnswer(ans);
    }
    /**
     * 
     * @param {*} inds 
     * @param {*} val 
     * SAVE ANSWERS FROM OPTION 2 MULTIPLE CHOICE
     */
    const saveAnswerMultiple = (inds, val) =>{
        let ans = {...answer};
        if(ans[inds] )
        {
            if( ans[inds] instanceof Array && ans[inds].includes(val))
            {
                ans[inds].splice(val, 1);
            }else
            {
                ans[inds].push(val);
            }

        }else
        {
            ans[inds] = []
            ans[inds].push(val);
        }
        setAnswer(ans);
    }

    const shuffles =(array)=>{
        return array.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
      
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     toggle(!modal);
     let dt = props.data;
     let sc = props.score;
     shuffles(dt);
     let keyzs = {};
     let vals = {};
     for(let i = 0; i < dt.length; i++)
     {
         keyzs[i] = dt[i][0];
         vals[i] = dt[i][1];
     }

     setKeyz(keyzs);
     setAll(vals);
     loaddata(-1);
     setAnswer(sc.answer); //STUDENT ANSWER
     setTimer(props.timer); //TIMER
     setTimeused(sc.timeused); //TIME LET BY STUDENTS
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
},[props.mid]);

useEffect(()=>{
   if(timer !== ''){
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

 const saveMyAnswer = () =>{
     let ans = {...answer};
     let fd = new FormData();
     fd.append('answer', ans);
     fd.append('id', id);
     fd.append('timer', timeused);
     fd.append('cat', 'update');
     fd.append('table', 'course_scores');
     props.updateCoursescore(fd);
 }

 const submitMyAnswer = () =>{
    //RUN THROUGH INDEX
    return new Promise((resolve, reject)=>{
    let ans = {...answer};
    let fd = new FormData();
    let sc = calculateScore();
    fd.append('answer', ans);
    fd.append('id', id);
    fd.append('timer', timeused);
    fd.append('is_submitted', 1);
    fd.append('score', sc);
    fd.append('cat', 'update');
    fd.append('table', 'course_scores');
    
    try
    {
     props.updateCoursescore(fd);
     resolve('ok')
    }catch(err)
    {
      reject(err);
    }
   })
   resetdata();
 }
 const calculateScore = () =>{

       let my_answers = {...answer};
       let all_questions = props.data;
       let all_points = [];
       let all_scores = [];
       //LOOP TROUGH MY ANSWERS
       let my_answer_keys = Object.keys(my_answers);
       for(let i = 0; i < my_answer_keys.length; i++)
       {
         //GET ANSWER
         let single_answer = my_answers[my_answer_keys[i]];
         let single_question = all_questions[my_answer_keys[i]];
         let single_correct_answer = single_question && 'answer' instanceof single_question && single_question.answer.length  > 0 ? single_question.answer.split('::::::') : null;
         let single_correct_answers = single_question && 'options' instanceof single_question && single_question.options.length  > 0 ? single_question.options.split('::::::') : null ;
         let s_type = single_question.type;
         let s_points = single_question.points;
         all_points.push(s_points);
         //COMPARE
         if(s_type === 1)
         {
          if(single_answer[0] === single_correct_answer)
          {
            all_scores.push(s_points);
          }
         }else if(s_type === 2)
         {
           if(single_answer && Array.isArray(single_answer))
           {
              let g_sc = [];
              for(let v = 0; v < single_answer.length; v++)
              {
                if(single_answer[v] in single_correct_answer ){ g_sc.push(1)}
              }

              let sc = g_sc.length > 0 && single_correct_answer.length > 0 ? ( g_sc.length / single_correct_answer.length ) * s_points : 0;
              all_scores.push(sc);
           }
         }else if(s_type === 3)
         {
            if(single_answer[0] in single_correct_answers ){all_scores.push(s_points);}
         }
       }

       let final_points = all_scores.reduce((a, b)=>a + b, 0);
       return final_points / all_points;
 }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop} keyboard={keyboard}>
  <ModalHeader toggle={resetdata}>Question {ind + 1} <br/><h6 class='pull-left d-block'><small>{timer !== '' ? timeText(timeused) : 'No Timer'}</small></h6></ModalHeader>
        <ModalBody>
        <div class="card" >
        <div class="card-header">
          {type === 1 ? 'Choose the correct option':''}
          {type === 2 ? 'Choose all the correct options':''}
          {type === 3 ? 'Give the answer that best fit the empty space':''}
          {type === 4 ? 'Using a short sentence or phrase answer the question below':''}
          {type === 5 ? 'Essay':''}
        </div>
            <div class="card-body">
            {ind > -1 ? <> <Container>
                    <Row xs='12'>
                      <Col xs='9'>
                          <p style={{color:'#000000'}}><div dangerouslySetInnerHTML={{__html:question}}/></p>
                      </Col>
                      <Col xs='3'>
                        <small>{`${points} points`}</small>
                      </Col>
                    </Row>
               </Container>
                
                <Container>
                {type === 1 ?
                    Object.keys(optionx).map((prop, index)=>{
                        return <Button
                                    key={index}
                                    color={answer[keyz[ind]] && answer[keyz[ind]] !== undefined && answer[keyz[ind]] === prop ? 'info' : 'secondary'}
                                    onClick={()=>saveAnswer(keyz[ind], prop)}
                                    size='sm'
                                    block
                                    >
                                     {optionx[prop]}
                                </Button>
                    })
                : ''}
                 {type === 2 ?
                         Object.keys(optionx).map((prop, index)=>{
                            return <Button
                                        key={index}
                                        color={answer[keyz[ind]] && answer[keyz[ind]] !== undefined && answer[keyz[ind]].includes(prop) ? 'info' : 'secondary'}
                                        onClick={()=>saveAnswerMultiple(keyz[ind], prop)}
                                        size='sm'
                                        block
                                        >
                                        {optionx[prop]}
                                    </Button>
                        })
                : ''}
                 {type === 3 ?
                        Object.keys(optionx).map((prop, index)=>{
                        return <Button
                                    key={index}
                                    color={answer[keyz[ind]] && answer[keyz[ind]] !== undefined && answer[keyz[ind]].includes(prop) ? 'info' : 'secondary'}
                                    onClick={()=>saveAnswerMultiple(keyz[ind], prop)}
                                    size='sm'
                                    block
                                    >
                                    {optionx[prop]}
                                </Button>
                    })
                : ''}
                </Container></> : <h3>{timer !== '' ? timeText(timeused) : 'Next to start'}</h3>  } 
            </div> 
            <div class="card-footer">
                <Button color="secondary" onClick={moveB} className='pull-left' ><i class='fa fa-backward'></i> Previos</Button>
                <Button color="secondary" onClick={moveF} className='pull-right'>Next <i class='fa fa-forward'></i></Button>
                  </div>    
        </div>
        </ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={resetdata}>Cancel</Button>
          {score.length > 0 ? <h3>{score}</h3> :
          <>
          <Button color="dark" onClick={saveMyAnswer} >Save for Later</Button>
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

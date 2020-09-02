import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Input} from 'reactstrap';
import { updateCoursescore } from './../../actions/coursescore';
import ShowImage from './ShowImage';
import { SERVER_URL, imgx } from "./../../actions/common.js";


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [instruction, setInstruction] = useState('');
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [optionx, setOptionx] = useState(null);
  const [optionxtype, setOptionxtype] = useState(null);
  const [type, setType] = useState(null);
  const [points, setPoints] = useState();
  const [timer, setTimer] = useState();
  const [timeused, setTimeused] = useState(0);
  const [imgs, setImgs] = useState('');
  const [vids, setVids] = useState('');
  const [auds, setAuds] = useState('');
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
          let opstype = 'optionstype' in d && d.optionstype.length > 0 ? d.optionstype.split('::::::') : [];
          let ops_arr =  {};
          let opx ={}; 
          let opxtype ={}; 
          for(let row of ops)
          {
              let r = row.split("::::");
              opx[r[0]] = r[1];
          }
          for(let row of opstype)
          {
              let r = row.split("::::");
              opxtype[r[0]] = r[1];
          }
          
          setQuestion(d.question);
          setType(d.type);
          setPoints(d.points);
          setOptionx(opx);
          setOptionxtype(opxtype);
          setInstruction(d.instruction);
          setImgs(d.imgs);
          setAuds(d.auds);
          setVids(d.vids);
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
 const saveAns = (inds, val) =>{
    let ans = {...answer};
    ans[inds] = val;
    setAnswer(ans);
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
     setAnswer(JSON.parse(sc.answer)); //STUDENT ANSWER
     setTimer(props.timer); //TIMER
     if(props.timer && parseInt(props.timer) > 0)
     {
      let tt = parseInt(sc.timer) * 1000;
      setTimeused(tt); //TIME LET BY STUDENTS
     }else
     {
      setTimeused(null); 
     }
    
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
   if(timeused !== null){
    const runtimer = setTimeout(() => {
      let newtime = timeused - 1000;
      if(newtime > 0)
      {
        setTimeused(newtime)
      }else
      {
        setTimeused('TIME UP');
        submitMyAnswerauto()
        .then((data)=>{
          resetdata();
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
     fd.append('answer', JSON.stringify(ans));
     fd.append('id', id);
     fd.append('timer', timeused/1000);
     fd.append('cat', 'update');
     fd.append('table', 'course_scores');
     props.updateCoursescore(fd);
 }

 const submitMyAnswerauto = () =>{
    //RUN THROUGH INDEX
    return new Promise((resolve, reject)=>{
    let ans = {...answer};
    let fd = new FormData();
    let sc = calculateScore();
    fd.append('answer', JSON.stringify(ans));
    fd.append('id', id);
    fd.append('timer', timeused/1000);
    fd.append('is_submitted', 1);
    fd.append('is_marked', 1);
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
 const submitMyAnswer = () =>{
    //RUN THROUGH INDEX
    let ans = {...answer};
    let fd = new FormData();
    let sc = calculateScore();
    fd.append('answer', JSON.stringify(ans));
    fd.append('id', id);
    fd.append('timer', timeused/1000);
    fd.append('is_submitted', 1);
    fd.append('is_marked', 1);
    fd.append('score', sc);
    fd.append('cat', 'update');
    fd.append('table', 'course_scores');
    props.updateCoursescore(fd);
   
    resetdata();
}
 const calculateScore = () =>{

       let my_answers = {...answer};
       let all_questions = props.data;
       let all_points = [];
       let all_scores = [];
       //LOOP TROUGH MY ANSWERS
       for(let qu in all_questions)
       {
         //GET ANSWER
         let que = all_questions[qu][0];
         let single_answer = my_answers[que];
         let single_question = all_questions[qu][1];;
         /**
          * CONFIRM IF ANSWER WAS CHOOSEN
          * CONFIRM IF CORRECT
          */
        if(single_answer && single_answer !== undefined)
        {
          /**
           * GET CORRECT ANSWER
           * NEEDED TO CONFIRM
           * MULTIPLE CHOICE QUESTIONS
           */
         let single_correct_answer = single_question && single_question instanceof Object && single_question.answer.length  > 0 ? single_question.answer.split('::::::') : null;
          /**
           * GET ALL OPTIONS
           * NEEDED TO CONFIRM
           * FILL IN THE BLANKS
           */
         let single_correct_answers = single_question && single_question instanceof Object && single_question.options.length  > 0 ? single_question.options.split('::::::') : null ;
          //GET THE QUESTION TYPE
         let s_type = single_question.type;
          //GET THE POINTS ALLOCATED TO THE QUESTION
         let s_points = single_question.points;
         //STORE THE POINTS
         all_points.push(parseInt(s_points));
         //CONFIRM IF IT IS SINGE SELECT QUESTION
         if(s_type === 1)
         {
           /**
            * CONPARE STUDENT ANSWER KEY WITH 
            * THE KEY OF THECORRECT ANSWER
            * IF THE SAME STORE IN SCORE ARRAY
            * ELSE DO NOTHING
            */
          
          if(single_answer === single_correct_answer[0])
          {
            all_scores.push(s_points);
          }
         }
         //CONFIRM IF IT IS A MUTIPLE SELECT QUESTION
         else if(s_type === 2)
         {
           /**
            * STUDENT ANSWER IS EXPECTEDTO BE AN ARRAY OF ANSWERS
            * CONFIRM THAT IT IS AN ARRAY
            */
           if(single_answer && Array.isArray(single_answer))
           {
              /**
               * CREATE AN ARRAY TO STORE CORRECT SCORES
               * LOOP OVER THE STUDENT ANSWERS
               * THEN CONFIRM IF THE VALUE KEY CAN BE FOUND IN THE ANSWER ARRAY
               * IF FOUND USIE THE VALUE 1 TO INDCATE SUCCESS
               * STORE IN THE ARRAY
               */
              let g_sc = [];
              for(let v = 0; v < single_answer.length; v++)
              {
                if( single_correct_answer.includes(single_answer[v]) ){ g_sc.push(1)}
              }
              /**
               * GET THE NUMBER OF STUDENT CORRECT ANSWER
               * DIVIDE IT BY THE NUMBER OF CORRECT ANSWER
               * MULTIPLY IT BY THE TOTALSCORE FOR THE QUETION
               * STORE THE ANSWER
               */
              let sc = g_sc.length > 0 && single_correct_answer.length > 0 ? ( g_sc.length / single_correct_answer.length ) * s_points : 0;
              all_scores.push(parseFloat(sc));
           }
         }
         //CONFIRM IF IT IS A FILL IN THE BLANK QUESTION
         else if(s_type === 3)
         {
            let ops = single_correct_answers
            let opx = []; 
            for(let row of ops)
            {
                let r = row.split("::::");
                opx.push(r[1]);
            }
            //CONFIRM IF CORRECT ANSER IS IN OPTIONS VALUE 
            //IF SO SCORE AND STORE
            if(opx.includes(single_answer) ){all_scores.push(parseInt(s_points));}
         }
        }
        /**
         * IF NO ANSWER WAS GIVEN
         * SAVE THE POINTS ONLY
         */
        else
        {
          let s_points = single_question.points;
           all_points.push(parseInt(s_points));
        } 
       }
       
       //GET THE TOTAL POINTS
       //SUM THE TOTAL SCORES
       let all_point = all_points.reduce((a, b)=>a + b, 0); 
       let final_points = all_scores.reduce((a, b)=>a + b, 0);
       //DIVIDE TO GET SCORE IN FRACTION
       return final_points / all_point;
 }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop} keyboard={keyboard}>
  <ModalHeader toggle={resetdata}>Question {ind + 1} <br/><h6 class='pull-left d-block'><small>{timer !== null ? timeText(timeused) : 'No Timer'}</small></h6></ModalHeader>
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
                    {instruction && instruction.length > 0 ?
                    <Row xs='12' className='m-0 p-0' >
                      <div  dangerouslySetInnerHTML={{__html: instruction}} />
                    </Row>:''}
                    <Row xs='12'>
                      <Col sm='9'>
                          <p style={{color:'#000000'}}><div dangerouslySetInnerHTML={{__html:question}}/></p>
                      </Col>
                      <Col sm='3'>
                        <small>{`${points} points`}</small>
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
               </Container>
                
                <Container>
                {type === 1 ?
                    Object.keys(optionx).map((prop, index)=>{
                    { return optionxtype && optionxtype && parseInt(optionxtype[prop]) === 1 ?
                    <a
                      key={index}
                      style={{borderStyle:'solid',borderWidth:'2px', borderColor: answer[keyz[ind]] && answer[keyz[ind]] !== undefined && answer[keyz[ind]] === prop ? '#000000' : '#cfcfcf'}}
                      onClick={()=>saveAnswer(keyz[ind], prop)}
                      >
                        <ShowImage
                          path={SERVER_URL + optionx[prop]}
                          type={1}
                          width="100"
                          height="100"
                        />
                    </a>
                      :
                      <Button
                              key={index}
                              color={answer[keyz[ind]] && answer[keyz[ind]] !== undefined && answer[keyz[ind]] === prop ? 'info' : 'secondary'}
                              onClick={()=>saveAnswer(keyz[ind], prop)}
                              size='sm'
                              block
                              >
                                {optionx[prop]}
                          </Button>
                    
                    }
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
                        <Input
                          type ='textarea'
                          placeholder='Answer.....'
                          className='form-control'
                          value={answer[keyz[ind]] && answer[keyz[ind]] !== undefined ? answer[keyz[ind]] : ''}
                          onChange={(e)=>saveAns(keyz[ind], e.target.value)}
                        />
                  
                : ''}
                </Container></> : <h3>{timer !== '' ? timeText(timeused) : 'Next to start'}</h3>  } 
            </div> 
            <div class="card-footer">
                <Button color="link" onClick={moveB} className='pull-left' ><i class='fa fa-backward'></i> Previos</Button>
                <Button color="link" onClick={moveF} className='pull-right'>Next <i class='fa fa-forward'></i></Button>
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


import React from "react";
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from'axios';
import OpenObjTest from './OpenObjTest';
import OpenEssTest from './OpenEssTest';
import { API_PATHS, axiosConfig1 } from './../../actions/common';
// reactstrap components
import {
  Col,
  Container,
  Row
} from "reactstrap";
import { registerCoursescore, updateCoursescore, getCoursescore} from './../../actions/coursescore';
import { registerCoursecomment, updateCoursecomment, getCoursecomment, getCoursecommentstudent} from './../../actions/coursecomment';
import { SERVER_URL, imgx } from "actions/common";
import AudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-player';
import CardChatStudent from "./CardChatStudent";

let path = API_PATHS;
const pics = {
  1 : 'fa-file-text',
  2 : 'fa-file-pdf',
  3 : 'fa-file-image',
  4 : 'fa-file-video',
  5 : 'fa-file-audio',
  6 : 'fa-youtube',
  7 : 'fa-link',
  8 : 'fa-comment',
  9 : 'fa-question',
  10 : 'fa-file-text'
}
class TimeLine extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      qid:null,
      st:false,
      data:[],
      timer:null,
      score:{},
      qid1:null,
      numb1:0,
      st1:false,
      data1:[],
      timer1:null,
      score1:{},
      cst:false,
      cid:null
      
    }
  }
  
  onError = err =>{
    console.log(err);
  }

  lunchObjTest = (data, act, timer, starts, ends) =>{
    console.log(timer);
    let timers = timer && timer !== 'x' ? `test duration ${timer}` : '';
    let starter = starts && starts !== 'x' ? ` test starts ${ new  Date(starts).toString()} ` : '';
    let ender = ends && ends !== 'x' ? ` test ends ${ new  Date(ends).toString()}` : '';
    let fullText = timers + starter + ender; 
    if(act === 1)
    {
      //START TEST
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        html: fullText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, start!'
      }).then((result) => {
        if (result.value) {
          this.props.updateCoursescore();
          let fd = new FormData();
          fd.append('studentId', this.props.user.id);
          fd.append('materialId',  this.props.data.id);
          fd.append('timer',  timer * 60);
          fd.append('answer', JSON.stringify({}));
          fd.append('qid', 'multi');
          fd.append('cat', 'confirm');
          fd.append('table', 'course_scores');
          axios.post(path, fd, axiosConfig1)
          .then(res => {
              this.setState({
                qid:res.data.data.id,
                st:true,
                data:data,
                timer:res.data.data.timer,
                score:res.data.data
              })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to connect!',
              text: 'Please check you internet connection.'
            })
          })   
        }
      })

    }else if(act === 2)
    {
      //DONT START
      Swal.fire({
        icon: 'info',
        title: 'Not yet time',
        text: fullText,
      })

    }
    else if(act === 3)
    {
      //DONT START
      Swal.fire({
        icon: 'error',
        title: 'Test expired',
        html:
        fullText + ' <br/> Sorry, time up to log an start this test contact your teacher.!',
      })

    }

  }

  lunchEssTest = (keyed, data, act, timer, starts, ends, numb) =>{
    let timers = timer && timer !== 'x' ? `test duration ${timer}` : '';
    let starter = starts && starts !== 'x' ? ` test starts ${ new  Date(starts).toString()} ` : '';
    let ender = ends && ends !== 'x' ? ` test ends ${ new  Date(ends).toString()}` : '';
    let fullText = timers + starter + ender; 
    if(act === 1)
    {
      //START TEST
      Swal.fire({
        title: 'Are you ready?',
        text: "You won't be able to revert thiss!",
        html: fullText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, start!'
      }).then((result) => {
        if (result.value) {
          let fd = new FormData();
          fd.append('studentId', this.props.user.id);
          fd.append('materialId',  this.props.data.id);
          fd.append('timer', timer);
          fd.append('qid', keyed);
          fd.append('cat', 'confirm');
          fd.append('table', 'course_scores');
          axios.post(path, fd, axiosConfig1)
          .then(res => {
              this.setState({
                qid1:res.data.data.id,
                st1:true,
                numb1:numb,
                data1:data,
                timer1:timer,
                score1:res.data.data
              })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to connect!',
              text: 'Please check you internet connection.'
            })
          })   
        }
      })

    }else if(act === 2)
    {
      //DONT START
      Swal.fire({
        icon: 'info',
        title: 'Not yet time',
        text: fullText,
      })

    }
    else if(act === 3)
    {
      //DONT START
      Swal.fire({
        icon: 'error',
        title: 'Test expired',
        html:
        fullText + ' <br/> Sorry, time up to log an start this test contact your teacher.!',
      })

    }

  }
   
  lunchPost = async() =>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Type your question here...',
        inputAttributes: {
          'aria-label': 'Type your question here'
        },
        showCancelButton: true,
        confirmButtonText: 'Send !',
        cancelButtonText: 'Others',
        reverseButtons: true
      })
        if (text) {
            let fd= new FormData();
            fd.append('chat', text);
            fd.append('userId', this.props.user.id);
            fd.append('materialId', this.props.data.id);
            fd.append('qid', 'mat');
            fd.append('grp', 0);
            fd.append('cat', 'insert');
            fd.append('table', 'course_comments')
            Swal.fire({
                title: 'Make it',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Public',
                cancelButtonText: 'Private',
              }).then((results) => {
                if (results.value) {
                    fd.append('types', 1);
                    this.props.registerCoursecomment(fd);
                }else{
                    fd.append('types', 2);
                    this.props.registerCoursecomment(fd);
                }
              })
        } else{
            Swal.fire({
                title: 'Close',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Remove',
                cancelButtonText: 'Close',
              }).then((res) => {
                
                    swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'No Action',
                    'error'
                    )
                
                })
        }
      
    
  }

  lunchComments = () =>{
    this.props.getCoursecommentstudent({
      'studentId':this.props.user.id,
      'materialId':this.props.data.id,
      'qid':'mat',
      'grp': 0,
      'types':0,
      'numb': 1
    });
    this.setState({cst:true, cid:this.props.data.id})
  }
  render() {
    let { description, title, types, links, question, settings, weight, sizes, id } = this.props.data || '';
    let allScores = this.props.coursescores.coursescores && Array.isArray(this.props.coursescores.coursescores) ? this.props.coursescores.coursescores : [];
  
    let filteredScore = allScores.filter((row)=>parseInt(row.materialId) === parseInt(id)); 
    let obj_array = [1, 2, 3];
    let ess_array = [4, 5, 6, 7];
    let themeColor = 'info';
    let type = parseInt(types);
    let path = SERVER_URL + links;
    let que = JSON.parse(question);
    let sets = JSON.parse(settings);
    let weightd = weight ? weight : 0;
    let sizesd = sizes && parseInt(sizes) > 0 ? Math.round(parseInt(sizes)/1024) : 0;
    let sizedd = sizesd + ' mb';

    let obj = [];
    let ess = [];
    let total_obj = [];
    let total_ess = [];
    let points_obj = {};
    let points_obj_student = {};

    for(let prop in que)
    {
     let rw = que[prop] && que[prop] !== undefined ? que[prop] : {} ;
     if(ess_array.includes(parseInt(rw.type)))
     {
       let ar = [prop, rw];
       ess.push(ar);
       total_ess.push(parseInt(rw.points));
       points_obj[prop] = rw.points;
     }else if(obj_array.includes(parseInt(rw.type)))
     {
        let ar1 = [prop, rw];
        obj.push(ar1);
        total_obj.push(parseInt(rw.points));
     }
    };
    let total_obj_points = total_obj.reduce((a, b)=>a + b, 0);
    let total_ess_points = total_ess.reduce((a, b)=> a + b, 0);
    points_obj['multi'] = total_obj_points;
    points_obj_student['multi'] = 0;
    //GET NUMBER OFQUESTIONS
    let obj_num = obj ? obj.length : 0;
    let ess_num = ess ? ess.length : 0;
    //SET MULTICHOICE QUESTIONS
    let obj_buttons = '';
    //CONFIRM QUESTION AVAILABILITY
    if(obj_num > 0)
    {
      let keyed = 'multi';
      //GET SETTINGS
      let timer = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'timer' in sets[keyed] ? sets.multi.timer : 0;
      let starts = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'starts' in sets[keyed] ? sets.multi.starts : 0;
      let ends = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'ends' in sets[keyed] ? sets.multi.ends : 0;
      let showTimer = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'showtimer' in sets[keyed] ? sets.multi.showtimer : false;
      let showStarts = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'showstarts' in sets[keyed] ? sets.multi.showstarts : false;
      let showEnds = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'showends' in sets[keyed] ? sets.multi.showends : false;
      let timers = showTimer && parseInt(timer) > 0 ? parseInt(timer) : 'x';
      let startDate = showStarts & starts && starts !== 0 && Object.prototype.toString.call(starts) === "[object Date]" && !isNaN(starts) ? new Date(starts).getTime() : 'x' ;
      let endDate = showEnds & ends && ends !== 0 && Object.prototype.toString.call(ends) === "[object Date]" && !isNaN(ends) ? new Date(ends).getTime() : 'x';
      let canStart = true; //DEFAULT START ANYTIME
      let canEnd = false;  //DEFAULT DO NOT END

      /**
       * CONFIRM IF THE STUDENT HAS ASCORE DATAFOR THIS TOPIC
       * IF HE.SHE HAS GET THE DATA
       */
      let checkScoreData = filteredScore.filter((row)=>row.qid === keyed);
      let scoreData = checkScoreData && Array.isArray(checkScoreData) && checkScoreData.length > 0 ? checkScoreData[0] : null;
     
      let score = null;
      
      if(scoreData && scoreData !== null)
      {
       
        if(parseInt(scoreData.is_marked) === 1)
        { 
          if(Object.keys(points_obj).includes(keyed))
          {
            let scoree = scoreData.score * points_obj[keyed];
            points_obj_student[keyed] = scoree;
            score = Number(scoree).toFixed(1);
          }else
          {
            score = 0;
          }
        }else if(scoreData.is_marked === 0 && (scoreData.is_submitted === 1))
        {
          score = parseInt(scoreData.is_submitted) === 1 ? 'pending' : '--.--';
        }
      }
      
      canStart = startDate !== 'x' && startDate > new Date('now').getTime() ? true : false ; //PASS START DATE TRUE
      canEnd = endDate !== 'x' && endDate > new Date('now').getTime() ? true : false; //PASS END DATE TRUE
      let butn = !canStart  && !canEnd ? 'secondary' : canStart && canEnd ? 'dark': 'info';
      let act = !canStart  && !canEnd ? 2 : canStart && canEnd ? 3 : 1 ;
      
      if(score !== null)
      {
        obj_buttons = <button 
        className={`btn btn-success btn-sm`} 
        >
          Multichoice <span class="badge">{`${score}/${points_obj[keyed]}`}</span> 
        </button>
      }else
      {
        obj_buttons = <button 
        className={`btn btn-${butn} btn-sm`} 
        onClick={ canStart && !canEnd ? ()=>this.lunchObjTest(obj, act,  timers, startDate, endDate) : ()=>this.lunchObjTest(obj, 1,  timers, startDate, endDate)}  
        >
            Multichoice <span class="badge">{ obj.length }</span><span className='sr-only'> questions</span> 
       </button>
      }
      
    }
    
    //SET MULTICHOICE QUESTIONS
    let ess_buttons = '';
    //CONFIRM QUESTION AVAILABILITY
    if(ess_num > 0)
    {
      ess_buttons = ess.map((prop, index)=>{
      let keyed = prop[0];
      let valed = prop[1];
      //GET SETTINGS
      let timer = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'timer' in sets[keyed] ? sets.multi.timer : 0;
      let starts = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'starts' in sets[keyed] ? sets.multi.starts : 0;
      let ends = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'ends' in sets[keyed] ? sets.multi.ends : 0;
      let showTimer = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'showtimer' in sets[keyed] ? sets.multi.showtimer : false;
      let showStarts = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'showstarts' in sets[keyed] ? sets.multi.showstarts : false;
      let showEnds = sets instanceof Object && keyed in sets && sets[keyed] instanceof Object && 'showends' in sets[keyed] ? sets.multi.showends : false;
      let timers = showTimer && parseInt(timer) > 0 ? parseInt(timer) : 'x';
      let startDate = showStarts & starts && starts !== 0 && Object.prototype.toString.call(starts) === "[object Date]" && !isNaN(starts) ? new Date(starts).getTime() : 'x' ;
      let endDate = showEnds & ends && ends !== 0 && Object.prototype.toString.call(ends) === "[object Date]" && !isNaN(ends) ? new Date(ends).getTime() : 'x';
      let canStart = true; //DEFAULT START ANYTIME
      let canEnd = false;  //DEFAULT DO NOT END
      

      /**
       * CONFIRM IF THE STUDENT HAS ASCORE DATAFOR THIS TOPIC
       * IF HE.SHE HAS GET THE DATA
       */
      let checkScoreData = filteredScore.filter((row)=>row.qid === keyed);
      let scoreData = checkScoreData && Array.isArray(checkScoreData) && checkScoreData.length > 0 ? checkScoreData[0] : null;
      let score = null;
      if(scoreData !== null)
      {
        if(parseInt(scoreData.is_marked) === 1)
        {
          if(Object.keys(points_obj).includes(keyed))
          {
            let scoree = scoreData.score * points_obj[keyed];
            points_obj_student[keyed] = scoree;
            score = Number(scoree).toFixed(1);
          }else
          {
            score = 0;
          }
        }else
        {
          score = scoreData.is_submitted === 1 ? 'pending' : '--.--';
        }
      }
      
      canStart = startDate !== 'x' && startDate > new Date('now').getTime() ? true : false ; //PASS START DATE TRUE
      canEnd = endDate !== 'x' && endDate > new Date('now').getTime() ? true : false; //PASS END DATE TRUE
      let butn = !canStart  && !canEnd ? 'secondary' : canStart && canEnd ? 'dark': 'info';
      let act = !canStart  && !canEnd ? 1 : canStart && canEnd ? 3 : 1 ;
      
      /**
       * CREATE BUTTON
       */
      let ess_button = '';
      if(score !== null)
      {
         ess_button = <button 
                  className={`btn btn-success btn-sm`} 
                  >
                    Essay {index + 1} <span className='badge badge-light'>{`${score}/${points_obj[keyed]}`}</span>
                </button>
      }else
      {
          ess_button = <button 
                  className={`btn btn-${butn} btn-sm `} 
                  onClick={ canStart && !canEnd ? ()=>this.lunchEssTest(keyed, valed, act, timers, startDate, endDate) : ()=>this.lunchEssTest(keyed, valed, act,  timers, startDate, endDate)}  
                  >
                    Essay {index + 1}
                </button>
      }
      return ess_button;
      })
    }

    let sum_student_scores = Object.values(points_obj_student).reduce((a, b)=> a + b, 0);
    let sum_total_max_points = total_obj_points + total_ess_points;
    let final_scoress = (sum_student_scores / sum_total_max_points) * parseInt(weightd);
    let final_score = Number(final_scoress).toFixed(1);
    return (
      <>
        {this.state.st ? 
          <OpenObjTest
              st={this.state.st}
              mid={this.state.qid}
              data={this.state.data} 
              timer={this.state.timer}
              score={this.state.score}
              handleClose={()=>this.setState({st:false, qid:null, data:{}, timer:null, score:{}})}
              /> : ''
        }
        
        {this.state.st1 ? 
          <OpenEssTest
              st={this.state.st1}
              mid={this.state.qid1}
              numb={this.state.numb1}
              data={this.state.data1} 
              timer={this.state.timer1}
              score={this.state.score1}
              handleClose={()=>this.setState({st1:false, qid1:null, data1:{}, timer1:null, score1:{}})}
              /> : ''
        }
        {this.state.cst ? 
        <CardChatStudent
          materialId={this.state.data.id}
          studentId={this.props.user.id}
          data={this.state.data}
          st={this.state.cst}
          mmid={this.props.user.id}
          pid='2'
          handleClose={()=>this.setState({cst:false, studentId:null})}
        />: null}
       <li class="timeline-inverted">
            <div class={`timeline-badge ${themeColor}`}>
                <i class={`fa ${pics[types]}`}></i>
            </div>
            <div class="timeline-panel">
                <div class="timeline-heading">
                    <span class={`badge badge-${themeColor}`}>{title}</span>
                </div>
                <div class="timeline-body">
                  {description && description.length > 0 && description != 'null' ? <p >
                    <div  dangerouslySetInnerHTML={{__html: description}} />
                  </p>:null}
                  <Container xs='12' style={{minHeight:'100px'}}>
                    {type === 2 ? 
                    <>
                     <h5>File</h5>
                     <iframe src={`https://docs.google.com/gview?url=${path}&embedded=true`} style={{width:'100%', height:'100%'}} frameborder="0"></iframe>
                      </>
                      : ''}
                    {type === 3 ? 
                    <>
                    <h5>Image</h5>
                     <img 
                        src={SERVER_URL + links}
                        width='100%'
                        height='100%'
                        className='img-fluid'
                     />
                     </>
                      : ''}
                    {type === 4 ? 
                    <>
                      <h5>Video</h5>
                      <VideoPlayer
                        url={path}
                        onError={this.onError}
                        width='100%'
                        height='100%'
                        className='player'
                        light
                        controls
                      />
                      
                    </>
                      : ''}
                    {type === 5 ? 
                    <>
                    <h5>Audio File</h5>
                      <AudioPlayer
                        src={path}
                        autoplay
                        controls
                        onError={this.onError}
                        style={{width:'100%'}}
                      />
                      </> 
                      : ''}
                    {type === 6 ? 
                    <>
                     <h5>Youtube link</h5>
                      <VideoPlayer
                        url={path}
                        onError={this.onError}
                        width='100%'
                        height='100%'
                        light
                        controls
                      /></>
                      : ''}
                    {type === 7 ? 
                    <>
                    <h5>External link</h5>
                    <a href={path} target="_blank" class={`btn btn-link btn-block btn-bg`}>Click link</a>
                     </> : ''}
                  </Container>
                </div>
                { type === 2 || type === 3 || type === 4 || type === 5 ?
                    <a href={path} target="_blank" class={`btn btn-${themeColor} btn-block btn-bg`}><i className="fa fa-cloud-download"></i> Download File {sizedd}</a>
                : ''}
                    <button  className={`btn btn-${themeColor} btn-sm`} onClick={this.lunchPost}><i className="fa fa-comment"></i> Comment</button>
                    <button  className={`btn btn-${themeColor} btn-sm`} onClick={this.lunchComments}><i className="fa fa-comments"></i> Chat</button>
                    <p>
                        {obj_buttons}
                        {ess_buttons}
                    </p>
                <h6>
                  <Container>
                    <Row xs='12'>
                      <Col xs='6'>
                        <i class="fa fa-tag"></i>{""}
                        <b>Weight:</b>{" "}{`${weightd}`}
                      </Col>
                      <Col xs='6'>
                        <i class="fa fa-check"></i>{""}
                        <b>Score : </b>{Math.round(final_score)}
                      </Col>
                    </Row>
                    </Container>
                </h6>
        </div>
        </li>
         
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer,
  userstudent: state.userstudentReducer.userstudent,
  coursescores: state.coursescoreReducer,
  user: state.userstudentReducer.user,
})

export default connect(mapStateToProps, 
  { 
    updateCoursescore, 
    registerCoursescore, 
    getCoursescore,
    registerCoursecomment,
    updateCoursecomment,
    getCoursecomment,
    getCoursecommentstudent
  })(TimeLine)

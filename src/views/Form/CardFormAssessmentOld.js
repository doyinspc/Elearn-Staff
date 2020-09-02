import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {callError} from './../../actions/common';

import CardFitb from './../Table/CardFitb';
import CardMulti from './../Table/CardMulti';
import CardQuestion from './../Table/CardQuestion';
import CardFitbForm from './CardFitbForm';
import CardMultiForm from './CardMultiForm';
import CardQuestionForm from './CardQuestionForm';


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [type, setType] = useState(0);

  const [editquestion, setEditquestion] = useState({});
  const [editmulti, setEditmulti] = useState({});
  const [editfitb, setEditfitb] = useState({});

  const [question, setQuestion] = useState([]);
  const [multi, setMulti] = useState([]);
  const [fitb, setFitb] = useState([]);
 
 
  const toggle = () => setModal(!modal);
  const toggles = (rid) => {
    toggle();
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
        let all = {};
        all['q1'] = multi;
        all['q2'] = fitb;
        all['q3'] = question;
        props.updateCoursematerial({question:JSON.stringify(all)}, props.id);
        toggle();
  }
  const setSubmitQuestion = data =>{
    try{
      let q = [...question, data]
      setQuestion(q);
    }catch(err)
    {
        callError(err);
    }
  }
  const setUpdateQuestion = (data, id) =>{
    let q = [...question];
    q[id] = data;
    setQuestion(q);
  }
  const setsEditQuestion = indx =>{
     let ed = question && Array.isArray(question) && question.length > 0 ? [...question] : [];
     let eds = ed.filter((r, i)=>i === indx)[0];
     if(eds && Object.keys(eds).length > 0 )
     { 
       eds.indx = indx ;
       setEditquestion(eds);
      }
  }
  const setsDeleteQuestion = indx =>{
    let ed = [...question];
    let eds = ed.filter((prop, index)=>index !== indx);
    setQuestion(eds);
 }
  const setSubmitMulti = data =>{
    let q = [...multi, data]
    setMulti(q);
  }
  const setSubmitFitb = data =>{
    let q = [...fitb, data]
    setFitb(q);
  }
 

    const populate = async(data) =>{
        let ques = JSON.parse(data.question);
        ques && ques['q1'] && Array.isArray(ques['q1']) && ques['q1'].length > 0 ? setMulti(ques['q1']) : setMulti([]);
        ques && ques['q2'] && Array.isArray(ques['q2']) && ques['q2'].length > 0 ? setFitb(ques['q2']) : setFitb([]);
        ques && ques['q3'] && Array.isArray(ques['q3']) && ques['q3'].length > 0 ? setQuestion(ques['q3']) : setQuestion([]);
      }

   
    let loadMulti = null;
    if(multi && Array.isArray(multi) && multi.length > 0)
    {
      loadMulti = multi.map((prop, index)=>{
        return <CardMulti key={`AA_${index}_${prop.id}`} index={index} data={prop} />
      });
    };

    let loadFitb = null;
    if(fitb && Array.isArray(fitb) && fitb.length > 0)
    {
      loadFitb = fitb.map((prop, index)=>{
        return <CardFitb 
                      key={`AB_${index}_${prop.id}`} 
                      index={index} 
                      data={prop} 
                      />
      });
    };

    let loadQuestion = null;
    if(question && Array.isArray(question) && question.length > 0)
    {
      loadQuestion = question.map((prop, index)=>{
        return <CardQuestion 
                      key={`AC_${index}_${prop.id}`} 
                      index={index}
                      data={prop}
                      setsEditQuestion={(d)=>setsEditQuestion(index)}
                      setsDeleteQuestion={(d)=>setsDeleteQuestion(index)}
                      />
      });
    };

  let editColor = 'primary';

  return (
    <div>
       <div class="dropup">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-plus"></i> Add Assessment
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" onClick={()=>toggles(1)}><i class='fa fa-question'></i> Multichoice</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(2)}><i class="fa fa-question"></i> Fill-in-the-blanks</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(3)}><i class='fa fa-question'></i> Question</a>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} contentClassName={{width:'800px', height:400}} >
        <ModalHeader toggle={toggle}>Assessments</ModalHeader>
        <ModalBody>
        <div class="card card-nav-tabs ">
          <div class="card-header card-header-danger">
                  <div class="card-title h6" >{`${props.data.title}`}</div>
              <div class="nav-tabs-navigation">
                  <div class="nav-tabs-wrapper">
                      <ul class="nav nav-tabs" data-tabs="tabs">
                          <li class="nav-item">
                              <a class="nav-link active"  href={`#stage1x${props.data.id}`} data-toggle="tab"><i class="fa fa-home"></i> <span class="d-none d-md-inline">Multichoice</span></a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link"  href={`#stage2x${props.data.id}`} data-toggle="tab"><i class="fa fa-book"></i> <span class="d-none d-md-inline">Fill in the Blanks</span></a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link"  href={`#stage3x${props.data.id}`} data-toggle="tab"><i class="fa fa-user"></i> <span class="d-none d-md-inline">Question</span></a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="card-body ">
              <div class="tab-content ">
                  <div class="tab-pane" id={`stage1x${props.data.id}`}>
                      <div class="card-body" style={{ margin:0, padding:0 }}>
                      <div class="card card-plain" style={{margin:0, padding:1 }} >
                        <div class="card-header" role="tab" style={{border:1, borderColor:'grey', backgroundColor:'#ccc', color:'#000' , margin:2, padding:5}} id={`headingTwoxx_${props.data.id}`}>
                            <a data-toggle="collapse" data-parent="#accordion" href={`#collapseTwoxx_${props.data.id}`} aria-expanded="true" aria-controls="collapseTwoxx" style={{color:'#000'}}>
                              Add Multichoice Questions{' '}<i class="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                        </div>
                        <div id={`collapseTwoxx_${props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingTwox">
                        <div class="card-body">
                            <CardMultiForm id={props.data.id} data={editmulti} setSubmitMulti={(e)=>{setSubmitMulti(e)}}/> 
                        </div>
                      </div>
                    </div>
                      <div class="card card-plain" style={{margin:0, padding:0 }}>
                        <div class="card-header" role="tab" style={{border:1, borderColor:'grey', backgroundColor:'#ccc', color:'#000' , margin:2, padding:5}} id={`headingOnexx_${props.data.id}`}>
                            <a data-toggle="collapse" data-parent="#accordion" href={`#collapseOnexx_${props.data.id}`} aria-expanded="true" aria-controls="collapseOnexx" style={{color:'#000'}}>
                              Multichoice Questions List{' '}<i class="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                        </div>
                        <div id={`collapseOnexx_${props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingOnexx">
                        <div class="card-body">
                              {loadMulti}
                        </div>
                      </div>
                    </div>
                    
                    </div>
                  </div>
                  <div class="tab-pane" id={`stage2x${props.data.id}`}>
                  <div class="card-body" style={{ margin:0, padding:0 }}>
                      <div class="card card-plain" style={{margin:0, padding:1 }} >
                        <div class="card-header" role="tab" style={{border:1, borderColor:'grey', backgroundColor:'#ccc', color:'#000' , margin:2, padding:5}} id={`headingTwox_${props.data.id}`}>
                            <a data-toggle="collapse" data-parent="#accordion" href={`#collapseTwox_${props.data.id}`} aria-expanded="true" aria-controls="collapseTwox" style={{color:'#000'}}>
                              Add Fill-in-the-blanks Questions{' '}<i class="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                        </div>
                        <div id={`collapseTwox_${props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingTwox">
                        <div class="card-body">
                            <CardFitbForm id={props.data.id} data={editfitb} setSubmitFitb={(e)=>{setSubmitFitb(e)}}/> 
                        </div>
                      </div>
                    </div>
                      <div class="card card-plain bg-dark" style={{margin:0, padding:0, backgroundColor:'#ccc' }}>
                        <div class="card-header" role="tab" style={{border:1, borderColor:'grey', backgroundColor:'#ccc', color:'#000' , margin:2, padding:5}} id={`headingOnexx_${props.data.id}`}>
                            <a data-toggle="collapse" data-parent="#accordion" href={`#collapseOnexx_${props.data.id}`} aria-expanded="true" aria-controls="collapseOnexx" style={{color:'#000'}}>
                              Fill-in-the-blanks Questions List{' '}<i class="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                        </div>
                        <div id={`collapseOnexx_${props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingOnexx">
                        <div class="card-body">
                              {loadFitb}
                        </div>
                      </div>
                    </div>
                    
                    </div>
                  </div>
                  <div class="tab-pane" id={`stage3x${props.data.id}`}>
                  <div class="card-body" style={{ margin:0, padding:0 }}>
                      <div class="card card-plain" style={{margin:0, padding:0, backgroundColor:'#ccc' }} >
                        <div class="card-header" role="tab" style={{border:1, borderColor:'grey', backgroundColor:'#ccc', color:'#000' , margin:2, padding:5}} id={`headingTwoxxx_${props.data.id}`}>
                            <a data-toggle="collapse" data-parent="#accordion" href={`#collapseTwoxxx_${props.data.id}`} aria-expanded="true" aria-controls="collapseTwoxxx" style={{color:'#000'}}>
                              Add Questions{' '}<i class="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                        </div>
                        <div id={`collapseTwoxxx_${props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingTwoxxx">
                        <div class="card-body">
                            <CardQuestionForm id={props.data.id} data={editquestion} setUpdateQuestion={(d, e)=>{setUpdateQuestion(d, e)}} setSubmitQuestion={(e)=>{setSubmitQuestion(e)}}/> 
                        </div>
                      </div>
                    </div>
                      <div class="card card-plain" style={{margin:0, padding:0 }}>
                        <div class="card-header" role="tab" style={{border:1, borderColor:'grey', backgroundColor:'#ccc', color:'#000' , margin:2, padding:5}} id={`headingOnexxx_${props.data.id}`}>
                            <a data-toggle="collapse" data-parent="#accordion" href={`#collapseOnexxx_${props.data.id}`} aria-expanded="true" aria-controls="collapseOnexxx" style={{color:'#000'}}>
                              Questions List{' '}<i class="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                        </div>
                        <div id={`collapseOnexxx_${props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingOnexxx">
                        <div class="card-body bg-muted">
                              {loadQuestion}
                        </div>
                      </div>
                    </div>
                    
                    </div>
                  </div>
              </div>
          </div>
        </div> 
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={handleSubmit}>Save</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
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

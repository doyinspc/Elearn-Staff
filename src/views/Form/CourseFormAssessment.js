import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col, Container, Row, FormText } from 'reactstrap';


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
     populate(props.coursematerials.coursematerial);
    } 
},[props.mid]);

  
  const handleSubmit = (e) =>{
        
        
  }

  const handleLoad = sid => {
    let ar = {};
    ar['moduleId'] = sid;
    props.getCoursematerials(ar);
  }

    const populate = async(data) =>{
      let ques = data.questions;
      ques[0] && Array.isArray(ques[0]) && ques[0].length > 0 ? setMulti(ques[0]) : setMulti([]);
      ques[1] && Array.isArray(ques[1]) && ques[1].length > 0 ? setFitb(ques[1]) : setFitb([]);
      ques[2] && Array.isArray(ques[2]) && ques[2].length > 0 ? setQuestion(ques[2]) : setQuestion([]);
      }

   
    let loadMulti = null;
    if(multi && Array.isArray(multi) && multi.length > 0)
    {
      loadMulti = multi.map((prop, index)=>{
        return <CardMulti key={`AA_${index}_${prop.id}`} data={prop} />
      });
    };

    let loadFitb = null;
    if(fitb && Array.isArray(fitb) && fitb.length > 0)
    {
      loadFitb = fitb.map((prop, index)=>{
        return <CardFitb key={`AB_${index}_${prop.id}`} data={prop} />
      });
    };

    let loadQuestion = null;
    if(question && Array.isArray(question) && question.length > 0)
    {
      loadQuestion = question.map((prop, index)=>{
        return <CardQuestion key={`AC_${index}_${prop.id}`} data={prop} />
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
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Assessments</ModalHeader>
        <ModalBody>
        <div class="card card-nav-tabs ">
          <div class="card-header card-header-danger">
                  <div class="card-title h6" >{`${props.data.title}`}</div>
              <div class="nav-tabs-navigation">
                  <div class="nav-tabs-wrapper">
                      <ul class="nav nav-tabs" data-tabs="tabs">
                          <li class="nav-item">
                              <a class="nav-link active"  href={`#stage1${props.data.id}`} data-toggle="tab"><i class="fa fa-home"></i> <span class="d-none d-md-inline">Multichoice</span></a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link"  href={`#stage2${props.data.id}`} data-toggle="tab"><i class="fa fa-book"></i> <span class="d-none d-md-inline">Fill in the Blanks</span></a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link"  href={`#stage3${props.data.id}`} data-toggle="tab"><i class="fa fa-user"></i> <span class="d-none d-md-inline">Question</span></a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="card-body ">
              <div class="tab-content ">
                  <div class="tab-pane active" id={`stage1${props.data.id}`}>
                      <div class="card-body">
                      <Container>
                        <Row>
                          <Col sm="6">
                            {loadMulti}
                          </Col>
                          <Col sm="6">
                            <CardMultiForm data={multi}/>
                          </Col>
                        </Row>
                      </Container>
                      </div>
                  </div>
                  <div class="tab-pane" id={`stage2${props.data.id}`}>
                      <div class="card-body">
                      <Container>
                      <Row>
                          <Col sm="6">
                            {loadFitb}
                          </Col>
                          <Col sm="6">
                            <CardFitbForm data={fitb}/>
                          </Col>
                        </Row>
                      </Container>
                      </div>
                  </div>
                  <div class="tab-pane" id={`stage3${props.data.id}`}>
                      <div class="card-body">
                      <Container>
                      <Row>
                          <Col sm="6">
                            {loadQuestion}
                          </Col>
                          <Col sm="6">
                            <CardQuestionForm data={multi}/>
                          </Col>
                        </Row>
                      </Container>
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

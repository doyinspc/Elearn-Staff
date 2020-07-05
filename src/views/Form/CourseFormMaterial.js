import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import {getCoursematerials, getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col,  FormText } from 'reactstrap';

import CardFitb from './CardFitb';
import CardMulti from './CardMulti';
import CardQuestion from './CardQuestion';
import CardFitbForm from './../Form/CardFitbForm';
import CardMultiForm from './../Form/CardMultiForm';
import CardQuestionForm from './../Form/CardQuestionForm';
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
        if(id && id > 0)
        {
          datax.append('cat','update');
          datax.append('id', id);
          props.registerCoursematerial(datax);
        }else{
          datax.append('cat','insert');
          datax.append('moduleId', props.moduleId);
          props.registerCoursematerial(datax);
        }
        
  }

  const populate = async(data) =>{
    let ques = data.questions;
    ques[0] && Array.isArray(ques[0]) && ques[0].length > 0 ? setMulti(ques[0]) : setMulti([]);
    ques[1] && Array.isArray(ques[1]) && ques[1].length > 0 ? setFitb(ques[1]) : setFitb([]);
    ques[2] && Array.isArray(ques[2]) && ques[2].length > 0 ? setQuestion(ques[2]) : setQuestion([]);
    }

   

    const handleLoad = sid => {
      let ar = {};
      ar['moduleId'] = sid;
      props.getCoursematerials(ar);
    }
  
  let editId = id ? id : null;
  let editName = 'Add';
  let editIcon = 'fa-plus';
  let editColor = 'primary';

  return (
    <div>
      <div class="btn-group dropup">
      <Button className="btn-sm" color="default" onClick={()=>handleLoad(props.moduleId)} ><i class="fa fa-refresh"></i> Reload Modules</Button>
        <button class="btn btn-secondary dropdown-toggle btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <i class="fa fa-plus"></i> Add Learning Resource
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" onClick={()=>toggles(1)}><i class='fa fa-file'></i> Input Text</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(2)}><i class="fa fa-file-pdf" ></i> Upload Document</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(3)}><i class='fa fa-file-image'></i> Upload Image</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(4)}><i class='fa fa-file-video'></i> Upload Video</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(5)}><i class='fa fa-file-audio'></i> Upload Audio</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(6)}><i class='fa fa-youtube'></i> Youtube link</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(7)}><i class='fa fa-link'></i> Links/Code</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(8)}><i class='fa fa-comment'></i> Discussion/Chat</a>
          <a class="dropdown-item" href="#" onClick={()=>toggles(9)}><i class='fa fa-question'></i> Questions only</a>    
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Materials</ModalHeader>
        <ModalBody>
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
  
export default connect(mapStateToProps, {getCoursematerials, getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)

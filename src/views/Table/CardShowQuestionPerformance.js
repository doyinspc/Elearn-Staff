import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from '../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Container } from 'reactstrap';
import { deleteCoursescore } from 'actions/coursescore';
import FormStudentscore from 'views/Form/FormStudentscore';
import FormScoresheet from 'views/Form/FormScoresheet';

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
const Modals = (props) => {
  
  const [modal, setModal] = useState(props.st);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [value, setValue] = useState(null);
 
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
   
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(true);
     setData(props.data);
    } 
},[props.mid]);
  
resetdata = () =>{
    setId(null);
    setData({});
    props.handleCloseQuestion()
}

let { question, answer, option, points } = data;
let td = props.coursescores.coursescores && Array.isArray(props.coursescores.coursescores) ? props.coursescores.coursescores: [];
let qd = props.coursecomments.coursecomments && Array.isArray(props.coursecomments.coursecomments) ? props.coursecomments.coursecomments : [];
let tdstudents = td.map((prop, ind)=>{
    return <FormStudentscore
                key={ind}
                data={prop}
            />
});
let tdevaluate = td.map((prop, ind)=>{
    return <FormScoresheet
                 key={ind}
                 data={prop}
            />
});
let tdquestions = qd.map((prop, ind)=>{
    return <FormQuestion
                 key={ind}
                 data={prop}
            />
})
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
  <ModalHeader toggle={resetdata}><i className={`fa fa-question`}></i>Learning</ModalHeader>
        <ModalBody>
          <Container>
          <div class="card card-nav-tabs card-plain">
            <div class="card-header card-header-danger">
                <div class="nav-tabs-navigation">
                    <div class="nav-tabs-wrapper">
                        <ul class="nav nav-tabs" data-tabs="tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#home" data-toggle="tab">Students</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#updates" data-toggle="tab">Evaluate</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#history" data-toggle="tab">Questions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div><div class="card-body ">
                <div class="tab-content text-left">
                    <div class="tab-pane active" id="home">
                        <table className='table' >
                            <thead>
                                <tr>
                                    <th>FULNAME</th>
                                    <th>SCORE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tdstudents}
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane" id="updates">
                        <Container>
                            {tdevaluate}
                        </Container>
                    </div>
                    <div class="tab-pane" id="history">
                        <Container>
                            {tdquestions}
                        </Container>
                    </div>
                </div>
            </div>
        </div>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    courses: state.courseReducer,
    coursematerials: state.coursematerialReducer,
  })
  
export default connect(mapStateToProps, { getCoursematerials, getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)
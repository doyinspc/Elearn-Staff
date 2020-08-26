import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from '../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Container } from 'reactstrap';
import FormStudentscore from 'views/Form/FormStudentscore';
import FormScoresheet from 'views/Form/FormScoresheet';
import FormChat from 'views/Form/FormChat';

const Modals = (props) => {
  
  const [modal, setModal] = useState(props.st);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [value, setValue] = useState(null);
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
    if(props.mid !== null )
    {
     setId(props.mid);
     setModal(true);
     setData(props.data);
    } 
},[props.mid]);
  
const resetdata = () =>{
    setId(null);
    setData({});
    props.handleClose()
}


let td = props.coursescores.coursescores && Array.isArray(props.coursescores.coursescores) ? props.coursescores.coursescores: [];
let qd = props.coursecomments.coursecomments && Array.isArray(props.coursecomments.coursecomments) ? props.coursecomments.coursecomments : [];
let marked = props.coursescores.coursescores && Array.isArray(props.coursescores.coursescores) ? props.coursescores.coursescores.filter(rw=>parseFloat(rw.score) > 0).length : 0;
let totaled = props.coursescores.coursescores && Array.isArray(props.coursescores.coursescores) ? props.coursescores.coursescores.length : 0;
let unmarked = totaled - marked;
let tdstudents = td.map((prop, ind)=>{
    return <FormStudentscore
                key={ind}
                data={prop}
            />
});
let tdevaluate = td.map((prop, ind)=>{
    return <FormScoresheet
                 key={ind}
                 mid={1}
                 data={prop}
                 que={data}
                 maxscore={parseInt(props.data.points)}
            />
});
let tdquestions = qd.map((prop, ind)=>{
    return <FormChat
                 key={ind}
                 data={prop}
                 que={data}
                 
            />
})
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} keyboard='false' backdrop='static' >
  <ModalHeader toggle={resetdata}><span style={{fontSize:'1em'}}>
  <div dangerouslySetInnerHTML={{__html:props.data.question}} />
  </span>
  </ModalHeader>
        <ModalBody>
          <Container classname='m-0 p-0'>
          <div class="card card-nav-tabs card-plain">
            <div class="card-header card-header-danger small">
                <span className='badge badge-info'>{props.data.points} points</span>
                <span className='badge badge-success'>{marked} Marked</span>
                <span className='badge badge-danger'>{unmarked} Unmarked</span>
                <span className='badge badge-primary'>{totaled} Candidates</span>
            </div><div class="card-body m-0 p-0">
            <div class="nav-tabs-navigation">
                    <div class="nav-tabs-wrappers">
                        <ul class="nav nav-tabs" data-tabs="tabs">
                            <li class="nav-item">
                                <a class="nav-link active" href="#home" data-toggle="tab">Scores</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#updates" data-toggle="tab">Grade</a>
                            </li>
                           
                        </ul>
                    </div>
                </div>
                <div class="tab-content text-left">
                    <div class="tab-pane active" id="home">
                        <table className='tablex' width='100%' >
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
                        <Container class='m-0 p-0 '>
                            {tdevaluate}
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
    coursescores: state.coursescoreReducer,
    coursecomments: state.coursecommentReducer,
  })
  
export default connect(mapStateToProps, { getCoursematerials, getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)
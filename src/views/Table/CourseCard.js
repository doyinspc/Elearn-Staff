
import React from "react";
import { connect } from 'react-redux';
import { Link, Redirect }  from 'react-router-dom';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
import { getCoursemodules, getCoursemodule} from './../../actions/coursemodule';
import { getCoursematerials, getCoursematerial } from './../../actions/coursematerial';
import { getCoursetutors, getCoursetutor } from './../../actions/coursetutor';
import { getCoursestudents, getCoursestudent } from './../../actions/coursestudent';
import { getCourseprogresss, getCourseprogress } from './../../actions/courseprogress';
import CourseFormModule from "./../Form/CourseFormModule";
import CourseFormMaterial from "./../Form/CourseFormMaterial";
import CourseFormTutor from "./../Form/CourseFormTutor";
import CourseFormStudent from "./../Form/CourseFormStudent";

import CourseModule from "./CourseModule";
import CourseTutor from "./CourseTutor";
import CourseStudent from "./CourseStudent";

import CardStudentMiniData from "./CardStudentMiniData";
import CardStudentMiniProgress from "./CardStudentMiniProgress";
import CardStudentMiniQuestion from "./CardStudentMiniQuestion";
// reactstrap components
import {
  Card,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      idt:null,
      stt:false,
      idm:null,
      stm:false,
      ids:null,
      sts:false,
      studentId:null,
      courseId:null,
      pou:false,
      poq:false,
      poa:false,
      poe:false,
    }
  }
  
  componentDidMount(){

  }
 handleModule=id=>{
   this.props.getCoursemodules({'courseId':id});
 }
 handleEditModule=id=>{
  this.setState({stm:true, idm:id})
 }
 handleMaterial=id=>{
  this.props.getCoursematerials({'courseId':id});
}

handleTutor=id=>{
  this.props.getCoursetutors({'courseId':id});
}
handleEditTutor=id=>{
  this.props.getCoursetutor(id);
  this.setState({stt:true, idt:id});
 }

loadUserStudent=(studentId, courseId, data)=>{
  this.setState({pou:true, studentId, courseId, data});
}
loadWhatsappStudent=(id, phone, fullname)=>{
  return <Link to={`${phone} ${fullname}`} target="_blank"/>;
}
loadQuestionStudent=(studentId, courseId, data)=>{
 // this.props.getCoursestudent(id);
  this.setState({poq:true, studentId, courseId, data});
}
loadAssignmentStudent=(studentId, courseId, data)=>{
  this.props.getCourseprogresss({studentId, courseId});
  this.setState({poa:true, studentId, courseId, data});
}
handleEditStudent=(id, studentId, courseId, data)=>{
  this.props.getCoursestudent(id);
  this.setState({poe:true, studentId, courseId, data});
}
handleDeleteStudent=id=>{
  this.props.deleteCoursestudent(id);
}
handleStudent=id=>{
  this.props.getCoursestudents({'courseId':id});
}


  render() {
    let coursetutors = this.props.coursetutors.coursetutors;
    let {course_code, course_objective, course_description, course_name, cid:id, departmentname, levelname} = this.props.data || "";
    let {courseId, studentId} = this.state;
    let loadTutor = null;
    if(coursetutors && Array.isArray(coursetutors) && coursetutors.length > 0 && id){
      let cts = coursetutors.filter(row =>parseInt(row.courseId) === parseInt(id))
      loadTutor = cts && Array.isArray(cts) && cts.length > 0 ? cts.map((prop, index)=>{
        return <CourseTutor 
                  key={`A_${index}_${prop.cid}`} 
                  data={prop} 
                  handleEdit={(rid)=>this.handleEditTutor(prop.cid)}
                  handleDelete={(rid)=>this.handleDeleteTutor(rid)}
                  />
      }):null;
    };

    let coursemodules = this.props.coursemodules.coursemodules;
    let loadModule = null;
    if(coursemodules && Array.isArray(coursemodules) && coursemodules.length > 0 && id){
      let cms = coursemodules.filter(row => parseInt(row.courseId) === parseInt(id))
      loadModule = cms && Array.isArray(cms) && cms.length > 0 ? cms.map((prop, index)=>{
        return <CourseModule 
                  key={`B_${index}_${prop.id}`} 
                  data={prop} 
                  handleEdit={(rid)=>this.handleEditModule(rid)}
                  handleDelete={(rid)=>this.handleDeleteModule(rid)}
                  />
      }):null;
    };

    let coursestudents = this.props.coursestudents.coursestudents;
    let loadStudent = null;
    if(coursestudents && Array.isArray(coursestudents) && coursestudents.length > 0){
      let css = coursestudents.filter(row => parseInt(row.courseId) === parseInt(id))
      loadStudent = css && Array.isArray(css) && css.length > 0 ? css.map((prop, index)=>{
        return <CourseStudent 
                  key={`C_${index}_${prop.id}`} 
                  data={prop} 
                  loadUser={(rid)=>this.loadUserStudent(prop.studentId, prop.courseId, prop)}
                  loadWhatsapp={(rid)=>this.loadWhatsappStudent(rid)}
                  loadQuestion={(rid)=>this.loadQuestionStudent(prop.studentId, prop.courseId, prop)}
                  loadAssignment={(rid)=>this.loadAssignmentStudent(prop.studentId, prop.courseId, prop)}
                  handleEdit={(rid)=>this.handleEditStudent(prop.cid)}
                  handleDelete={(rid)=>this.handleDeleteStudent(prop.cid)}
                  />
      }):null;
    };

   
     
    return (
      <>
      {/*SMALL MINI MODALS FOR FUTHER DATA */}
        {this.state.pou ? <CardStudentMiniData
          courseId={courseId}
          studentId={studentId}
          data={this.state.data}
          st={this.state.pou}
          mid={this.state.id}
          handleClose={()=>this.setState({pou:false, studentId:null})}
        />: null}
        {this.state.poq ? <CardStudentMiniQuestion
          courseId={courseId}
          studentId={studentId}
          data={this.state.data}
          st={this.state.poq}
          mid={this.state.id}
          handleClose={()=>this.setState({poq:false, studentId:null})}
        />: null}
        {this.state.poa ? <CardStudentMiniProgress
          courseId={courseId}
          studentId={studentId}
          data={this.state.data}
          st={this.state.poa}
          mid={this.state.studentId}
          handleClose={()=>this.setState({poa:false, studentId:null})}
        />: null}
        <div className="card card-nav-tabs ">
          <div className="card-header card-header-danger">
               <h5 className="card-category">{`${departmentname  +" " +levelname }`}</h5>
                  <div className="row">
                    <div className="col-sm-9">
                    <div className="card-title h4" >{`${course_code  +" " +course_name }`}
                    </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="btn-group">
                      <button className="btn btn-sm" onClick={()=>{this.props.handleClick(id)}}><i className='fa fa-edit'></i></button>
                      <button className="btn btn-sm" onClick={()=>{this.props.handleDelete(id)}}><i className='fa fa-trash'></i></button>
                      </div>
                    </div>
                    
                  </div>
              <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                      <ul className="nav nav-tabs flex-row" data-tabs="tabs">
                      <li className="nav-item">
                              <a className="nav-link active"  href={`#stage0${id}`} data-toggle="tab"><i className="fa fa-home"></i> <span className="d-none d-md-inline">Home</span></a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link"  href={`#stage1${id}`} data-toggle="tab"><i className="fa fa-dashboard"></i> <span className="d-none d-md-inline">Dashboard</span></a>
                          </li>
                          
                          <li className="nav-item">
                              <a className="nav-link"  href={`#stage3${id}`} data-toggle="tab"><i className="fa fa-book"></i> <span className="d-none d-md-inline">Modules</span></a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link"  href={`#stage2${id}`} data-toggle="tab"><i className="fa fa-user"></i> <span className="d-none d-md-inline">Facilitators</span></a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link"   href={`#stage4${id}`} data-toggle="tab"><i className="fa fa-users"></i> <span className="d-none d-md-inline">Students</span></a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className="card-body ">
              <div className="tab-content ">
              <div className="tab-pane active" id={`stage0${id}`}>
                  <div className="card-body">
                    <p className="card-text">
                   
                    </p>
                  </div>
                  </div>
                  <div className="tab-pane" id={`stage1${id}`}>
                  <div className="card-body">
                    <div className="card-text">
                    <div className='title h5'>Introduction</div>
                      {`${course_description}`}
                     </div>
                    <div className="card-text">
                      <div className='title h5'>Objective</div>
                      {`${course_objective}`}
                    </div>
                  </div>
                  </div>
                  <div className="tab-pane" id={`stage2${id}`}>
                    <Container>
                      <Row>
                        
                        <CourseFormTutor 
                          courseId={id}
                          st={this.state.stt}
                          mid={this.state.idt}
                          handleClose={()=>this.setState({stt:false, idt:null})}
                          />
                        
                      </Row>
                      <Row>
                      <Col xs={12} md={12}>
                        <Card className="card-tasks">
                          <CardBody>
                            <div className="table-full-width table-responsive">
                              <Table>
                                <tbody>
                                  {loadTutor}
                                </tbody>
                              </Table>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      </Row>
                  </Container>
                  </div>
                  <div className="tab-pane" id={`stage3${id}`}>
                  <Container>
                      <Row>
                        <Col>
                        <CourseFormModule 
                            courseId={id}
                            st={this.state.stm}
                            mid={this.state.idm}
                            handleClose={()=>this.setState({stm:false, idm:null})}
                            />
                        </Col>
                      </Row>
                      <Row>
                      <Col xs={12} md={12}>
                        <Card className="card-tasks">
                          <CardBody>
                            <div id={`accordion${id}`} role="tablist" aria-multiselectable="true" className="card-collapse">
                              {loadModule}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      </Row>
                     </Container>
                  </div>
                  <div className="tab-pane" id={`stage4${id}`}>
                  <Container>
                      <Row>
                        <Col>
                          <CourseFormStudent 
                            courseId={id}
                            st={this.state.sts}
                            mid={this.state.ids}
                            handleClose={()=>this.setState({sts:false, ids:null})}
                          />
                        </Col>
                      </Row>
                      <Row>
                      <Col xs={12} md={12}>
                        <Card className="card-tasks">
                          <CardBody>
                            <div className="table-full-width table-responsive">
                              <Table>
                                <tbody>
                                  {loadStudent}
                                </tbody>
                              </Table>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      </Row>
                     </Container>
                  </div>
              </div>
          </div>
        </div>
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer,
  coursematerials: state.coursematerialReducer,
  coursemodules: state.coursemoduleReducer,
  coursetutors: state.coursetutorReducer,
  coursestudents: state.coursestudentReducer,
})

export default connect(mapStateToProps, 
  { getCourses, 
    getCourse, 
    updateCourse,
    getCoursemodules, 
    getCoursemodule, 
    getCoursematerials, 
    getCoursematerial, 
    getCoursetutors, 
    getCoursetutor, 
    getCoursestudents, 
    getCoursestudent, getCourseprogresss  })(Course)
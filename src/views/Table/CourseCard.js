
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
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
import Modals from "./../Form/CourseForm";
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
      id:null,
      st:false,
      pid:1
    }
  }
  
  componentDidMount(){

  }
handleModule=id=>{
   this.props.getCoursemodules({'courseId':id});
 }

 handleMaterial=id=>{
  this.props.getCoursematerials({'courseId':id});
}

 handleTutor=id=>{
  this.props.getCoursetutors({'courseId':id});
}

handleStudent=id=>{
  this.props.getCoursestudents({'courseId':id});
}

  render() {
    let coursetutors = this.props.coursetutors.coursetutors;
    
    let loadTutor = null;
    if(coursetutors && Array.isArray(coursetutors) && coursetutors.length > 0){
      let cts = coursetutors.filter(row =>parseInt(row.courseId) === parseInt(this.props.data.id))
      loadTutor = cts && Array.isArray(cts) && cts.length > 0 ? cts.map((prop, index)=>{
        return <CourseTutor key={`A_${index}_${prop.id}`} data={prop} />
      }):null;
    };

    let coursemodules = this.props.coursemodules.coursemodules;
    let loadModule = null;
    if(coursemodules && Array.isArray(coursemodules) && coursemodules.length > 0){
      let cms = coursemodules.filter(row => parseInt(row.courseId) === parseInt(this.props.data.id))
      loadModule = cms && Array.isArray(cms) && cms.length > 0 ? cms.map((prop, index)=>{
        return <CourseModule key={`B_${index}_${prop.id}`} data={prop} />
      }):null;
    };

    let coursestudents = this.props.coursestudents.coursestudents;
    let loadStudent = null;
    if(coursestudents && Array.isArray(coursestudents) && coursestudents.length > 0){
      let css = coursestudents.filter(row => parseInt(row.courseId) === parseInt(this.props.data.id))
      loadStudent = css && Array.isArray(css) && css.length > 0 ? css.map((prop, index)=>{
        return <CourseStudent key={`C_${index}_${prop.id}`} data={prop} />
      }):null;
    };
     
    return (
      <>
        <div class="card card-nav-tabs ">
          <div class="card-header card-header-danger">
               <h5 className="card-category">Backend Development</h5>
                  <div className="row">
                    <div className="col-sm-9">
                    <div class="card-title h4" >{`${this.props.data.course_code+" " +this.props.data.course_name}`}
                    </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="btn-group">
                      <button class="btn btn-sm" onClick={()=>{this.props.handleClick(this.props.data.id)}}><i className='fa fa-edit'></i></button>
                      <button class="btn btn-sm" onClick={()=>{this.props.handleDelete(this.props.data.id)}}><i className='fa fa-trash'></i></button>
                      </div>
                    </div>
                    
                  </div>
              <div class="nav-tabs-navigation">
                  <div class="nav-tabs-wrapper">
                      <ul class="nav nav-tabs" data-tabs="tabs">
                      <li class="nav-item">
                              <a class="nav-link active"  href={`#stage0${this.props.data.id}`} data-toggle="tab"><i class="fa fa-home"></i> <span class="d-none d-md-inline">Home</span></a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link"  href={`#stage1${this.props.data.id}`} data-toggle="tab"><i class="fa fa-dashboard"></i> <span class="d-none d-md-inline">Dashboard</span></a>
                          </li>
                          
                          <li class="nav-item">
                              <a class="nav-link" onClick={()=>this.handleModule(this.props.data.id)} href={`#stage3${this.props.data.id}`} data-toggle="tab"><i class="fa fa-book"></i> <span class="d-none d-md-inline">Modules</span></a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" onClick={()=>this.handleTutor(this.props.data.id)} href={`#stage2${this.props.data.id}`} data-toggle="tab"><i class="fa fa-user"></i> <span class="d-none d-md-inline">Facilitators</span></a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" onClick={()=>this.handleStudent(this.props.data.id)} href={`#stage4${this.props.data.id}`} data-toggle="tab"><i class="fa fa-users"></i> <span class="d-none d-md-inline">Students</span></a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="card-body ">
              <div class="tab-content ">
              <div class="tab-pane active" id={`stage0${this.props.data.id}`}>
                  <div class="card-body">
                    <p class="card-text">
                   
                    </p>
                  </div>
                  </div>
                  <div class="tab-pane" id={`stage1${this.props.data.id}`}>
                  <div class="card-body">
                    <p class="card-text">
                    <h5 className='title'>Introduction</h5>
                      {`${this.props.data.course_description}`}
                     </p>
                    <p class="card-text">
                      <h5 className='title'>Objective</h5>
                      {`${this.props.data.course_objective}`}
                      </p>
                  </div>
                  </div>
                  <div class="tab-pane" id={`stage2${this.props.data.id}`}>
                    <Container>
                      <Row>
                        <Col>
                        <CourseFormTutor courseId={this.props.data.id}/>
                        </Col>
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
                  <div class="tab-pane" id={`stage3${this.props.data.id}`}>
                  <Container>
                      <Row>
                        <Col><CourseFormModule courseId={this.props.data.id}/></Col>
                      </Row>
                      <Row>
                      <Col xs={12} md={12}>
                        <Card className="card-tasks">
                          <CardBody>
                            <div id={`accordion${this.props.data.id}`} role="tablist" aria-multiselectable="true" class="card-collapse">
                              {loadModule}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      </Row>
                     </Container>
                  </div>
                  <div class="tab-pane" id={`stage4${this.props.data.id}`}>
                  <Container>
                      <Row>
                        <Col><CourseFormStudent courseId={this.props.data.id}/></Col>
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
    getCoursestudent,  })(Course)
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
import { getCoursemodules, getCoursemodule, deleteCoursemodule} from './../../actions/coursemodule';
import { getCoursematerials, getCoursematerial, deleteCoursematerial } from './../../actions/coursematerial';
import { getCoursetutors, getCoursetutor, deleteCoursetutor } from './../../actions/coursetutor';
import { getCoursestudents, getCoursestudent, deleteCoursestudent, updateCoursestudent } from './../../actions/coursestudent';
import { getCourseprogresss } from './../../actions/courseprogress';
import { getCoursecommentstudentcourse} from './../../actions/coursecomment';
import CourseFormModule from "./../Form/CourseFormModule";
import CourseFormTutor from "./../Form/CourseFormTutor";
import CourseFormStudent from "./../Form/CourseFormStudent";

import CourseModule from "./CourseModule";
import CourseTutor from "./CourseTutor";
import CourseStudent from "./CourseStudent";

import CardStudentMiniData from "./CardStudentMiniData";
// reactstrap components
import {
  Card,
  CardBody,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
import { SERVER_URL } from "actions/common";
import CardChat from "./CardChat";
import CardReport from "./CardReport";

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
 handleActiveStudent=(id, act)=>{
   let fd = new FormData();
   fd.append('id', id);
   fd.append('is_active', act);
   fd.append('cat', 'update');
   fd.append('table', 'course_students')
  this.props.updateCoursestudent(fd);
 }
loadUserStudent=(studentId, courseId, data)=>{
  this.setState({pou:true, studentId, courseId, data});
}
loadWhatsappStudent=(id, phone, fullname)=>{
  return <Link to={`${phone} ${fullname}`} target="_blank"/>;
}
loadQuestionStudent=(studentId, courseId, data)=>{
  this.props.getCoursecommentstudentcourse({'studentId':studentId, 'courseId':courseId});
  this.setState({poq:true, poa: false, studentId, courseId, data});
}
loadAssignmentStudent=(studentId, courseId, data)=>{
  this.setState({poa:true, studentId, courseId, data});
}
handleEditStudent=(id, studentId, courseId, data)=>{
  this.props.getCoursestudent(id);
  this.setState({poe:true, studentId, courseId, data});
}
handleDeleteStudent=id=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this! You lose all test records",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.props.deleteCoursestudent({'id':id});
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}
handleDeleteTutor=id=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this! You lose all test records",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.props.deleteCoursetutor({'id':id});
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}
handleDeleteModule=id=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this! You lose all test records",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.props.deleteCoursemodule({'id':id});
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}
handleStudent=id=>{
  this.props.getCoursestudents({'courseId':id});
}


  render() {
    let coursetutors = this.props.coursetutors.coursetutors;
    let {course_code, course_objective, course_description, course_name, id, departmentname, levelname, pics, staffname, course_start, course_end} = this.props.data || "";
    let {courseId, studentId} = this.state;
    let loadTutor = null;
    if(coursetutors && Array.isArray(coursetutors) && coursetutors.length > 0 && id){
      let cts = coursetutors.filter(row =>parseInt(row.courseId) === parseInt(id))
      loadTutor = cts && Array.isArray(cts) && cts.length > 0 ? cts.map((prop, index)=>{
        return <CourseTutor 
                  key={`A_${index}_${prop.cid}`} 
                  data={prop} 
                  handleEdit={(rid)=>this.handleEditTutor(prop.cid)}
                  handleDelete={(rid)=>this.handleDeleteTutor(prop.cid)}
                  />
      }):null;
    };

    let coursemodules = this.props.coursemodules.coursemodules;
    let loadModule = null;
    if(coursemodules && Array.isArray(coursemodules) && coursemodules.length > 0 && id){
      let cms = coursemodules.filter(row =>parseInt(row.courseId) === parseInt(id))
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
                  loadQuestion={()=>this.loadQuestionStudent(prop.studentId, prop.courseId, prop)}
                  loadAssignment={()=>this.loadAssignmentStudent(prop.studentId, prop.courseId, prop)}
                  handleEdit={(rid)=>this.handleEditStudent(prop.cid)}
                  handleDelete={(rid)=>this.handleDeleteStudent(prop.cid)}
                  handleActive={(rid)=>this.handleActiveStudent(prop.cid, rid)}
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
        {this.state.poq ? 
        <CardChat
          courseId={courseId}
          studentId={studentId}
          data={this.state.data}
          st={this.state.poq}
          mmid={this.state.studentId}
          pid='1'
          handleClose={()=>this.setState({poq:false, studentId:null})}
        />: null}
        {this.state.poa ? 
        <CardReport 
        st={this.state.poa}
        data={this.state.data}
        user={this.state.data}
        mid={this.state.studentId}
        courseId={courseId}
        studentId={studentId}
        handleClose={()=>{this.setState({poa:false, studentId})}}
      />: null}
        
        <div className="card card-nav-tabs ">
          <div className="card-header card-header-danger">
               <h5 className="card-category">{`${course_code  +" " +course_name }`}</h5>
                  <div className="row">
                    <div className="col-sm-9">
                    <div className="card-title h4" >{`${departmentname  +" " +levelname }`}
                    </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="btn-group">
                      <button type="button" className="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className='fa fa-ellipsis-v'></i>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#" onClick={()=>{this.props.handleClick(id)}}><i className='fa fa-edit'></i> Edit</a>
                        <a className="dropdown-item" href="#"  onClick={()=>{this.props.handleDelete(id)}}><i className='fa fa-trash'></i> Delete</a>
                       </div>
                    </div>
                     
                    </div>
                    
                  </div>
              <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                      <ul className="nav nav-tabs flex-row" data-tabs="tabs">
                      <li className="nav-item">
                              <a className="nav-link active"   href={`#stage0${id}`} data-toggle="tab"><i className="fa fa-home"></i> Home</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link"  href={`#stage1${id}`} data-toggle="tab"><i className="fa fa-dashboard"></i> About</a>
                          </li>
                          
                          <li className="nav-item">
                              <a className="nav-link"  href={`#stage3${id}`} data-toggle="tab"><i className="fa fa-book"></i> Content</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link"  href={`#stage2${id}`} data-toggle="tab"><i className="fa fa-user"></i> Facilitators</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link"   href={`#stage4${id}`} data-toggle="tab"><i className="fa fa-users"></i> Students</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className="card-body ">
              <div className="tab-content ">
              <div className="tab-pane active" id={`stage0${id}`}>
                  <div className="card-body" style={{backgroundImage:`${SERVER_URL + pics}`, backgroundRepeat:'no-repeat', backgroundAttachment:'fixed', backgroundSize:'cover'}}>
                    <p className="card-text">
        <i className='fa fa-mortar-board'></i>{" "}<span>{staffname}{" | "} {moment(course_start).format('MMM Do YYYY, h:mm:ss a')}{"  | "} {moment(course_start).format('MMM Do YYYY, h:mm:ss a')}</span>
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
    getCoursestudent, 
    getCourseprogresss,
    getCoursecommentstudentcourse,
    deleteCoursematerial,
    deleteCoursemodule,
    deleteCoursestudent,
    deleteCoursetutor ,
    updateCoursestudent,
   })(Course)
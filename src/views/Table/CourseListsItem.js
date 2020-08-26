
import React from "react";
import { connect } from 'react-redux';
import { getCoursemodules, getCoursemodule } from './../../actions/coursemodule';
import { getCoursematerials } from './../../actions/coursematerial';
import { getCourseprogresss } from './../../actions/courseprogress';
import { getCoursescoresall} from './../../actions/coursescore';
import CourseTimelist from './CourseTimelist';
import CourseTime from './CourseTime';
// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col,
  CardBody
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";
import { Link } from "react-router-dom";
import CardReport from "./CardReport";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      page:null,
      subtitle:'',
      data: {},
      rid:null,
      rst:false,
      rdata:{}
    }
  }
  
  componentDidMount()
  {
    let ids = this.props.userstudentcourses.userstudentcourse.id;
    this.props.getCoursemodules({'courseId':ids,'is_active':0});
    this.setState({data:this.props.userstudentcourses.userstudentcourse})
  }
  componentWillReceiveProps(nextProps, nexState)
   {
     if(nextProps.userstudentcourses.userstudentcourse.cid !== this.state.data.id)
     {
       this.setState({data:nextProps.userstudentcourses.userstudentcourse});
     }

   }
   loadModuls= (id) =>{
    this.props.getCoursemodule(id);
   }

  loadMaterial =(id) =>{
    this.props.getCoursemodule(id);
    this.props.getCoursematerials({'is_active': 1, 'moduleId':id});
    this.props.getCoursescoresall({'moduleId':id, 'studentId':this.props.user.id});
    this.props.getCourseprogresss({'is_active': 0, 'moduleId':id, 'studentId':this.props.user.id});
  }

  loadReport =() =>{
    this.setState({rid:this.state.cid, rst:true })
  }

  render() {
    let {course_code, course_objective, course_description, course_name, cid:id, departmentname, levelname} = this.state.data;
      let tableTitle = course_name;
      let tableSubTitle = levelname +" "+departmentname;
      let listmodules = this.props.coursemodules.coursemodules.map((prop, ind)=>{
      let diz = new Date(prop.starts) < new Date() && new Date(prop.ends) > new Date() ? false: true;
      if(diz)
      {
       return <a class="dropdown-item" href="#" onClick={()=>{this.loadModuls(prop.id)}} >
       <Container class='my-0 py-0'>
         <Row xs='12' class='my-0 py-0'>
           <Col xs='11' class='my-0 py-0 bg-dark'>
             <i class="fa fa-forward my-0 py-0"></i> 
             <small class='my-0 py-0'>{prop.modulename}</small>
             <br class='my-0 py-0'/>
             <h6  class='my-0 py-0' style={{lineHeight:1}} ><small >{prop.title}</small></h6>
           </Col>
         </Row>
         </Container>
         </a>
      }else
      {
        return <a class="dropdown-item" href="#" onClick={()=>{this.loadMaterial(prop.id)}} >
        <Container class='my-0 py-0'>
          <Row xs='12' class='my-0 py-0'>
            <Col xs='11' class='my-0 py-0 bg-dark'>
              <i class="fa fa-forward my-0 py-0"></i> 
              <small class='my-0 py-0'>{prop.modulename}</small>
              <br class='my-0 py-0'/>
              <h6  class='my-0 py-0' style={{lineHeight:1}} ><small className='text-info' style={{ fontWeight:'bold'}}>{prop.title}</small></h6>
            </Col>
          </Row>
          </Container>
          </a>
      }
      });
    return (
      <>
      { this.state.rst ?
      <CardReport
        st={this.state.rst}
        data={this.state.data}
        user={this.props.user} 
        mid={this.state.data.id}
        handleClose={()=>{this.setState({rst:false, studentId:null})}}
        mid={this.props.user.id}
        courseId={this.state.data.id}
        studentId={this.props.user.id}
      />:''}
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                    <CardTitle tag="h4">
                      <Container>
                        <Row>
                          <Col xs="8">
                          <i className="fa fa-file-text "></i>{" "+tableTitle} <small>{course_code}</small>
                          <p className="category"> {tableSubTitle}</p>
                          </Col>
                          <Col xs="4" className="pull-right"> 
                          <div class="btn-group">
                          <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className='fa fa-ellipsis-v'></i>
                          </button>
                          <div class="dropdown-menu">
                            <Link class="dropdown-item" to="/admin/courses">My Classes</Link>
                            <a class="dropdown-item" href="#" onClick={this.loadReport}>Report</a>
                            <div class="dropdown-divider"></div>
                            {listmodules}
                          </div>
                        </div>
                          </Col>
                        </Row>
                      </Container>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <p>{course_description}</p>
                    <p>{course_objective}</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4} className='d-none d-md-block d-xl-block'>
                <CourseTimelist 
                    loadMaterials={(rid)=>{this.loadMaterial(rid)}}
                    loadModuls={(rid)=>{this.loadModuls(rid)}}
                />
            </Col>
            <Col md={8}>
            <CourseTime mid={this.state.id}/>
            </Col>
          </Row>
          
        </div>
        
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer,
  userstudentcourses: state.userstudentcourseReducer,
  user: state.userstudentReducer.user,
  coursemodules: state.coursemoduleReducer
})

export default connect(mapStateToProps, { getCoursemodule, getCoursescoresall,  getCoursemodules, getCoursematerials, getCourseprogresss})(Course)
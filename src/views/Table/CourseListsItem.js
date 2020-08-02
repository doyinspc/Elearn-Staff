
import React from "react";
import { connect } from 'react-redux';
import { getCoursemodules } from './../../actions/coursemodule';
import { getCoursematerials } from './../../actions/coursematerial';
import { getCourseprogresss } from './../../actions/courseprogress';
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

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      page:null,
      subtitle:'',
      data: {}
    }
  }
  
  componentDidMount()
  {
    let ids = this.props.userstudentcourses.userstudentcourse.cid;
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

  loadMaterial = (id) =>{
        this.setState({id});
       // this.props.getCoursematerials({'moduleId':id,'is_active': 1});
       // this.props.getCourseprogresss({'is_active': 0, 'moduleId':id, 'studentId':this.props.user.id});
  }
  

  render() {
    let {course_code, course_objective, course_description, course_name, cid:id, departmentname, levelname} = this.state.data;
      let tableTitle = course_name;
      let tableSubTitle = course_code;
      
    return (
      <>
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
                          <i className="fa fa-file-text "></i>{" "+tableTitle}
                          <p className="category"> {tableSubTitle}</p>
                          </Col>
                          <Col xs="4" className="pull-right"> 
                            <Link to="/admin/courses">
                            <button className="btn btn-sm btn-info" >Show My Classes</button>
                            </Link>
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
            <Col md={4}>
                <CourseTimelist 
                    loadMaterial={(rid)=>{this.loadMaterial(rid)}}
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
})

export default connect(mapStateToProps, { getCoursemodules, getCoursematerials, getCourseprogresss})(Course)

import React from "react";
import { connect } from 'react-redux';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
import { getCoursetutors } from './../../actions/coursetutor';
import { getUserstudentcourses } from './../../actions/userstudentcourse';
import CourseCards from "./CourseCards";
import CourseCardsStudent from "./CourseCardsStudent";
// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";


class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      page:null,
      subtitle:''
    }
  }
  
  componentDidMount(){
    this.props.getUserstudentcourses({'studentId':this.props.user.id});
    this.setState({page:2, subtitle:'My Classes'});
  }

  loadAllCourses = () =>{
    this.props.getCourses({'courses.is_active':0});
    this.setState({page:1, subtitle:'All Classes'});
  }
  loadMyCourses = () =>{
    this.props.getUserstudentcourses({'studentId':this.props.user.id });
    this.setState({page:2, subtitle:'My Classes'});
  } 

  loadRegister = id =>{
    this.props.getCourse(id);
    this.props.getCoursetutors({'courseId':id});
    this.setState({st:true, id:id});
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) === 0 ? 1 : 0;
    this.props.updateCourse({'active': act}, id);
  }

  loadNext = id =>{
    this.props.getCourse(id);
  }

  closer = id =>{
    this.props.getCourse(id);
    this.setState({st:false, id:null});
  }

  render() {
      
      let tableTitle = "Class";
      let tableSubTitle = this.state.subtitle;
      let tbody = this.props.courses.courses;
      let tbody1 = this.props.userstudentcourses.userstudentcourses;
      
      let tablerows = [];
      if(this.state.page === 1){
       tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <CourseCardsStudent key={key} data={prop} id={prop.cid} handleRegister={(rid)=>this.loadRegister(rid)}  />
      )):null;
      }
      else if(this.state.page === 2){
        tablerows = tbody1 && Array.isArray(tbody1) && tbody1.length > 0 ? tbody1.map((prop, key) => (
            <CourseCards key={key} data={prop} id={prop.id} handleRegister={(rid)=>this.loadRegister(rid)}  />
        )):null;
        }
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
                          <Col sm="6">
                          <i className="fa fa-file-text "></i>{" "+tableTitle}
                          <p className="category"> {tableSubTitle}</p>
                          </Col>
                          <Col sm="6" className="pull-right"> 
                            <button className="btn btn-sm btn-block btn-default" onClick={this.loadAllCourses} >Show All Classes</button>
                            <button className="btn btn-sm btn-block btn-info" onClick={this.loadMyCourses} >Show My Classes</button>
                          </Col>
                        </Row>
                      </Container>
                    </CardTitle>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <div class="row justify-content-center">
            {tablerows}
          </div>
          
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

export default connect(mapStateToProps, { getCourses, getCourse, updateCourse, getCoursetutors, getUserstudentcourses })(Course)
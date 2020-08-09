
import React from "react";
import { connect } from 'react-redux';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
import { getUserstaffcourses } from './../../actions/userstaffcourse';
import Modals from "./../Form/CourseForm";
import CourseCard from "./CourseCard";

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
      page:1,
      subtitle:'My Classes'
    }
  }
  
  componentDidMount(){
    this.props.getCourses({"course_owner":this.props.user.id});
    this.props.getUserstaffcourses({'staffId':this.props.user.id});
  }

  loadModal = id =>{
    this.props.getCourse(id);
    this.setState({st:true, id:id});
  }

  loadDelete = id =>{
    this.props.getCourse(id);
    this.setState({st:true, id:id});
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) === 0 ? 1 : 0;
    this.props.updateCourse({'active': act}, id);
  }

  loadNext = id =>{
    this.props.getCourse(id);
  }

  loadMyCourse = () =>{
    this.setState({page:1, subtitle:'My Classes'});
  }

  loadOtherCourse = () =>{
    this.setState({page:2, subtitle:'Co-teacher'});
  }

  closer = id =>{
    this.props.getCourse(id);
    this.setState({st:false, id:null});
  }

  render() {
      let tableTitle = "Class";
      let tableSubTitle = this.state.subtitle;
      let tbody = [];
      if(this.state.page === 2)
      {
        tbody = this.props.userstaffcourses.userstaffcourses;
      }else if(this.state.page === 1)
      {
        tbody = this.props.courses.courses;
      }
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <CourseCard 
            key={key} 
            data={prop} 
            handleDelete={(rid)=>this.loadDelete(rid)} 
            handleClick={(rid)=>this.loadModal(rid)} />
      )):null;
      
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
                        <Row cs='12'>
                          <Col xs="4"><i className="fa fa-file-text"></i>{" "+tableTitle}
                          <p className="category"> {tableSubTitle}</p>
                          </Col>
                          <Col xs="8" className="pull-right"> 
                          <div className="btn-group">
                            <button className="btn btn-sm btn-info" onClick={this.loadMyCourse}>My Classes</button>
                            <button className="btn btn-sm btn-info" onClick={this.loadOtherCourse}>Co-teacher</button>
                            <Modals 
                              mid={this.state.id} 
                              toggle={this.state.st}
                              handleClose={()=>this.setState({id:null, st:false})}
                            />
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </CardTitle>
                   
                </CardHeader>
              </Card>
            </Col>
          </Row>
          {tablerows}
        </div>
        
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer,
  userstaffcourses: state.userstaffcourseReducer,
  user:state.userstaffReducer.user
})

export default connect(mapStateToProps, { getCourses, getCourse, updateCourse, getUserstaffcourses })(Course)
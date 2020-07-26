
import React from "react";
import { connect } from 'react-redux';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
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
      st:false
    }
  }
  
  componentDidMount(){
    this.props.getCourses({course_owner:this.props.user.id});
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

  closer = id =>{
    this.props.getCourse(id);
    this.setState({st:false, id:null});
  }

  render() {
      let props = {};
      let tableTitle = "Course";
      let tableSubTitle = props.subtitle;
      let tbody = this.props.courses.courses;
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <CourseCard key={key} data={prop} handleDelete={(rid)=>this.loadDelete(rid)} handleClick={(rid)=>this.loadModal(rid)} />
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
                        <Row>
                          <Col sm="8"><i className="fa fa-file-text"></i>{" "+tableTitle}
                          </Col>
                          <Col sm="3" className="pull-right"> 
                            <Modals 
                            mid={this.state.id} 
                            toggle={this.state.st}
                            handleClose={()=>this.setState({id:null, st:false})}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </CardTitle>
                    <p className="category"> {tableSubTitle}</p>
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
  user:state.userstaffReducer.user
})

export default connect(mapStateToProps, { getCourses, getCourse, updateCourse })(Course)
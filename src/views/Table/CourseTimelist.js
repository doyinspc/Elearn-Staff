import React from "react";
import { connect } from 'react-redux';
import {Col, Container, Row} from "reactstrap";
import { getCoursematerials} from './../../actions/coursematerial';
import { getCourseprogresss} from './../../actions/courseprogress';


class CardUserCourse extends React.Component {
  loadMaterial =(id) =>{
    
    this.props.getCoursematerials({'is_active': 1, 'moduleId':id});
    this.props.getCourseprogresss({'is_active': 0, 'moduleId':id, 'studentId':this.props.user.id});
    this.props.loadMaterial(id);
  }
  
  render() {
    let material = this.props.coursemodules.coursemodules;
    
    let listitem = material && Array.isArray(material) ? material.map((prop, index)=>{
        var d =  <li class="list-group-item" key={index}>
                    <div>
                      <Container>
                        <Row xs='12'>
                          <Col xs='9'>
                            <i class="fa fa-forward"></i> 
                            <small>{prop.modulename}</small>
                            <br/>
                            <h6>{prop.title}</h6>
                            
                          </Col>
                          <Col xs='3'>
                              <button className='btn-link' onClick={()=>{this.loadMaterial(prop.id)}}>
                              <i class="fa fa-forward"></i> 
                            </button>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                </li>
        return d;
    }): null;
   
    return (
      <>
        <Col xs="12">
        <div class="card card-nav-tabs">
          <div class="card-header card-header-danger title" style={{textTransform:'capitalize'}}>
           Modules 
          </div>
          <ul class="list-group list-group-flush">
              {listitem}
          </ul>
        </div>
        </Col>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) =>({
  coursemodules: state.coursemoduleReducer,
  userstudentcourses: state.userstudentcourseReducer,
  user: state.userstudentReducer.user
})
export default connect(mapStateToProps, {getCoursematerials, getCourseprogresss}) (CardUserCourse);

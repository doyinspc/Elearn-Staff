import React from "react";
import { connect } from 'react-redux';
import {Col, Container, Row} from "reactstrap";
import { getCoursematerials} from './../../actions/coursematerial';
import { getCoursescoresall} from './../../actions/coursescore';
import { getCourseprogresss} from './../../actions/courseprogress';
import { getCoursemodule } from './../../actions/coursemodule';

class CardUserCourse extends React.Component {
  loadMaterial =(id) =>{
    this.props.loadMaterials(id);
  }
  
  loadMode =(id) =>{
   this.props.loadModuls(id);
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
                            { new Date(prop.starts).getTime() < new Date('today').getTime() ?
                              <button className='btn-link' onClick={()=>{this.loadMaterial(prop.id)}}>
                              <i class="fa fa-forward"></i> 
                            </button>:
                            <button className='btn-link' onClick={()=>{this.loadMode(prop.id)}}>
                            <i class="fa fa-lock"></i> 
                          </button>}
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
export default connect(mapStateToProps, {getCoursematerials, getCourseprogresss, getCoursescoresall, getCoursemodule}) (CardUserCourse);

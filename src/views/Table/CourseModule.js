
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
import CourseMaterial from './CourseMaterial';
import CourseFormMaterial from './../Form/CourseFormMaterial';
// reactstrap components
import {
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


  render() {
    let coursematerials = this.props.coursematerials.coursematerials;
    
    let loadMaterial = null;
    if(coursematerials && Array.isArray(coursematerials) && coursematerials.length > 0)
    {
      let cts = coursematerials.filter(row =>parseInt(row.moduleId) === parseInt(this.props.data.id))
      loadMaterial = cts && Array.isArray(cts) && cts.length > 0 ? cts.map((prop, index)=>{
        return <CourseMaterial key={`AB_${index}_${prop.id}`} data={prop} />
      }):null;
    };
     
    return (
      <>
          <div class="card card-plain">
            <div class="card-header" role="tab" id={`headingOne_${this.props.data.id}`}>
                <a data-toggle="collapse" data-parent="#accordion" href={`#collapseOne_${this.props.data.id}`} aria-expanded="true" aria-controls="collapseOne">
                  {this.props.data.module} : {this.props.data.title.toUpperCase()}
                {' '}<i class="now-ui-icons arrows-1_minimal-up"></i>
                </a>
            </div>

            <div id={`collapseOne_${this.props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingOne">
              <div class="card-body">
                <p>{this.props.data.description}</p>
                <p>{this.props.data.objective}</p>
                <CourseFormMaterial moduleId={this.props.data.id} data={this.props.data} />
                <Container>
                  <Table responsive id={`tabl${this.props.data.id}`}>
                  <tbody>
                    {loadMaterial}
                   </tbody>
                  </Table>
                </Container>
              </div>
            </div>
          </div>
          
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer,
  coursematerials: state.coursematerialReducer
})

export default connect(mapStateToProps, { getCourses, getCourse, updateCourse })(Course)
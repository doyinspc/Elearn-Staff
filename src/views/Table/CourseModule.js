
import React from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
import { getCoursemodule, deleteCoursemodule } from './../../actions/coursemodule';
import { getCoursematerial, deleteCoursematerial } from './../../actions/coursematerial';
import CourseMaterial from './CourseMaterial';
import CourseFormMaterial from './../Form/CourseFormMaterial';
// reactstrap components
import {
  Table,
  Container,
  Button,
  Row,
  Col
} from "reactstrap";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false
    }
  }
  
  componentDidMount(){

  }

  handleEdit = id =>{
    this.props.getCoursemodule(id)
    this.props.handleEdit(id);
  }
  handleEditMaterial = id =>{
    this.props.getCoursematerial(id)
    this.setState({st:true, id:id});
  }
  handleDeleteMaterial = id =>{
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
        this.props.deleteCoursematerial({'id':id});
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  handleDelete = id =>{
    //delete row
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

  handleClose = () =>{
    this.setState({id:null, st:false});
  }




  render() {
    let coursematerials = this.props.coursematerials.coursematerials;
    let startx = this.props.data.starts ? moment(this.props.data.starts).format('MMM Do YYYY, h:mm:ss a') : '--';
    let endx = this.props.data.ends ? moment(this.props.data.ends).format('MMM Do YYYY, h:mm:ss a'): '--';
   
    let loadMaterial = null;
    if(coursematerials && Array.isArray(coursematerials) && coursematerials.length > 0)
    {
      let cts = coursematerials.filter(row =>parseInt(row.moduleId) === parseInt(this.props.data.id))
      loadMaterial = cts && Array.isArray(cts) && cts.length > 0 ? cts.map((prop, index)=>{
        return <CourseMaterial 
            key={`AB_${index}_${prop.id}`} 
            title={this.props.data.modulename}
            title1={this.props.data.title.toUpperCase()}
            data={prop} 
            handleEdit={(rid)=>this.handleEditMaterial(rid)}
            handleDelete={(rid)=>this.handleDeleteMaterial(rid)}
            />
      }):null;
    };
     
    return (
      <>
          <div class="card card-plain">
            <div class="card-header" role="tab" id={`headingOne_${this.props.data.id}`}>
                <a data-toggle="collapse" data-parent="#accordion" href={`#collapseOne_${this.props.data.id}`} aria-expanded="true" aria-controls="collapseOne">
                  {this.props.data.modulename} : {this.props.data.title.toUpperCase()} <small>{startx}{" <=> "}{endx}</small>
                {' '}<i class="now-ui-icons arrows-1_minimal-up"></i>
                </a>
            </div>

            <div id={`collapseOne_${this.props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingOne">
              <div class="card-body">
                <p>
                <div class="btn-group dropup">
      <Button className="btn-sm" size='sm' color="link" onClick={()=>this.handleEdit(this.props.data.id)} ><i class="fa fa-edit"></i> </Button>
      <Button className="btn-sm" size='sm' color="link" onClick={()=>this.handleDelete(this.props.data.id)} ><i class="fa fa-trash"></i></Button>
                </div>
                </p>
                <p>{this.props.data.description}</p>
                <p>{this.props.data.objective}</p>
                <p>
                  <Container style={{fontSize:'0.9em', fontFamily:'fantasy'}}>
                    <Row xs='12'>
    <Col sm='4'><i className="fa fa-hourglass-half"></i> {this.props.data.dailyduration} hours daily</Col>
    <Col sm='4'><i className="fa fa-hourglass"></i> {this.props.data.weeklyduration} Weeks</Col>
    <Col small='4'><i className="fa fa-check-circle"></i> {this.props.data.weight !== null ? this.props.data.weight : 0}{' Point(s)'}</Col>
                    </Row>
                  </Container>
                </p>
                <CourseFormMaterial 
                  moduleId={this.props.data.id} 
                  mid={this.state.id}
                  st={this.state.st}
                  data={this.props.data} 
                  handleClose={this.handleClose}
                />
                <Container id={`tabl${this.props.data.id}`}>
                    {loadMaterial}
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

export default connect(mapStateToProps, { getCourses, getCourse, updateCourse, getCoursemodule, getCoursematerial, deleteCoursematerial, deleteCoursemodule })(Course)
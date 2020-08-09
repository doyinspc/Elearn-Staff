
import React from "react";
import { connect } from 'react-redux';
import { getCourses, getCourse, updateCourse } from './../../actions/course';
import { getCoursemodule } from './../../actions/coursemodule';
import { getCoursematerial, deleteCoursematerial } from './../../actions/coursematerial';
import CourseMaterial from './CourseMaterial';
import CourseFormMaterial from './../Form/CourseFormMaterial';
// reactstrap components
import {
  Table,
  Container,
  Button
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
    this.props.deleteCoursematerial(id)
  }
  handleDelete = id =>{
    //delete row
  }

  handleClose = () =>{
    this.setState({id:null, st:false});
  }




  render() {
    let coursematerials = this.props.coursematerials.coursematerials;
    let startx = this.props.data.starts ? new Date(this.props.data.starts).toDateString() : '--';
    let endx = this.props.data.ends ? Date.parse(parseInt(this.props.data.ends, 10)) : '--';
   
    let loadMaterial = null;
    if(coursematerials && Array.isArray(coursematerials) && coursematerials.length > 0)
    {
      let cts = coursematerials.filter(row =>parseInt(row.moduleId) === parseInt(this.props.data.id))
      loadMaterial = cts && Array.isArray(cts) && cts.length > 0 ? cts.map((prop, index)=>{
        return <CourseMaterial 
            key={`AB_${index}_${prop.id}`} 
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
                  {this.props.data.modulename} : {this.props.data.title.toUpperCase()} <small>{startx}{" "}{endx}</small>
                {' '}<i class="now-ui-icons arrows-1_minimal-up"></i>
                </a>
            </div>

            <div id={`collapseOne_${this.props.data.id}`} class="collapse" role="tabpanel" aria-labelledby="headingOne">
              <div class="card-body">
                <p>
                <div class="btn-group dropup">
      <Button className="btn-sm" color="default" onClick={()=>this.handleEdit(this.props.data.id)} ><i class="fa fa-edit"></i> </Button>
      <Button className="btn-sm" color="default" onClick={()=>this.handleDelete(this.props.data.id)} ><i class="fa fa-trash"></i></Button>
                </div>
                </p>
                <p>{this.props.data.description}</p>
                <p>{this.props.data.objective}</p>
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

export default connect(mapStateToProps, { getCourses, getCourse, updateCourse, getCoursemodule, getCoursematerial, deleteCoursematerial })(Course)
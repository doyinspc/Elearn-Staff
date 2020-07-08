
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { getCoursematerials, getCoursematerial, updateCoursematerial, deleteCoursematerial } from './../../actions/coursematerial';
import CourseFormAssessment from './../Form/CourseFormAssessment';
import CourseMaterialForm from './../Form/CourseFormMaterial'
import { SERVER_PATHS } from './../../actions/common';
// reactstrap components
import {
  Button
} from "reactstrap";

const pics = {
  1 : 'fa-file-text',
  2 : 'fa-file-pdf',
  3 : 'fa-file-image',
  4 : 'fa-file-video',
  5 : 'fa-file-audio',
  6 : 'fa-youtube',
  7 : 'fa-link',
  8 : 'fa-comment',
  9 : 'fa-question',
  10 : 'fa-file-text'
}
class Material extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
    }
  }

  handleActive = id =>{
    this.props.updateCoursematerial({'is_active':id}, this.props.data.id)
  }
  handleEdit = id =>{
    return <CourseMaterialForm mid={this.props.data.id}/>
  }
  handleDelete = id =>{
    this.props.deleteCoursematerial({'id':this.props.data.id})
  }

  render() {
     
    return (
      <>
         <tr>
            <td><a href={`${SERVER_PATHS}/${this.props.data.links}`} target="_blank" download><h4><i class={`fa ${pics[this.props.data.types]}`}></i> <small style={{fontSize:14}}>{this.props.data.title}</small></h4></a></td>
            <td className="text-right"> 
              <div class='btn-group'>
                <CourseFormAssessment id={this.props.data.id} data={this.props.data}/>
                {parseInt(this.props.data.is_active) === 0 ? 
                <Button class="btn-primary btn-sm" onClick={()=>this.handleActive(1)}><i class="fa fa-eye text-danger"></i></Button>:
                <Button class="btn-primary btn-sm" onClick={()=>this.handleActive(0)}><i class="fa fa-eye-slash"></i></Button>}
                <Button class="btn-primary btn-sm" onClick={()=>this.handleEdit(1)}><i class="fa fa-edit"></i></Button>
                <Button class="btn-danger btn-sm" onClick={()=>this.handleDelete(1)}><i class="fa fa-trash"></i></Button>
              </div>
            </td>
          </tr>
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer
})

export default connect(mapStateToProps, { getCoursematerials, getCoursematerial, updateCoursematerial , deleteCoursematerial})(Material)
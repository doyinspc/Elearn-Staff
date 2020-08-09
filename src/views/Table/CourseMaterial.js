
import React from "react";
import { connect } from 'react-redux';
import { getCoursematerials, getCoursematerial, updateCoursematerial, deleteCoursematerial } from './../../actions/coursematerial';
import { getCoursescores } from './../../actions/coursescore';
import { getCoursecomments } from './../../actions/coursecomment';
import CourseFormAssessment from './../Form/CourseFormAssessment';
import CourseMaterialForm from './../Form/CourseFormMaterial';

// reactstrap components
import {
  Button,
  Row,
  Col
} from "reactstrap";
import CardShow from "./CardShow";

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
      st:false,
      qid:null,
      qst:false,
      qdata:{}
    }
  }


  showQuestion = (id, data) =>{
    //SET STATES TO OPEN MODULE
    this.setState({qid:id, qst:true, qdata:data});
    //GET ALL SCORES FOR STUDENTS THAT ATTEMTED THE TEST
    //GET QUESTION UNIQUE ID
    //MATERIAL_ID
    this.props.getCoursescores({'materialId': this.props.data.id , 'qid': id});
    //GET ALL COMMENTS FOR THE TEST
    this.props.getCoursecomments({'materialId': this.props.data.id , 'qid': id});
  }
  handleCloseQuestion = () =>{
    this.setState({qid:null, qst:false, qdata:{}});
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
  showMaterial = () =>{
    this.setState({st:true})
  }
  showQuestion = () =>{
    //great
  }

  render() {
    let multichoice_array = [1, 2, 3];
    let essay_array = [4, 5, 6];
    let question = this.props.data.question;
    let que = JSON.parse(question);
    let am = que && Array.isArray(Object.keys(que)) ? Object.keys(que).map((row)=>{
        let obj = que[row];
        if(obj.type === 1 || obj.type === 2  ||  obj.type === 3 )
        {
          return [row, obj];
        }
    }):[];
  
    let tm= [];
    for(let prop in que){
      let rw = que[prop] && que[prop] !== undefined ? que[prop] : {} ;
      if(essay_array.includes(parseInt(rw.type)))
      {
        let ar = [];
        ar.push(prop);
        ar.push(rw);
        tm.push(ar);
      }
    };


    let settings = this.props.data.score;
    let {timer, starts, ends} = JSON.parse(settings) || {};
    
    return (
      <>
         <Row>
         {this.state.st ? <CardShow mid={this.props.data.id} data ={this.props.data} st={this.state.st}/>: ''}
            <Col md='6'><a href="#" onClick={this.showMaterial} className="text-default"><h4><i class={`fa ${pics[this.props.data.types]}`}></i> <small style={{fontSize:14}}>{this.props.data.title}</small></h4></a></Col>
            <Col md='6' className="text-right"> 
              <div class='btn-group btn-sm'>
                <CourseFormAssessment id={this.props.data.id} data={this.props.data}/>
                {parseInt(this.props.data.is_active) === 1 ? 
                <Button class="btn-primary btn-sm" onClick={()=>this.handleActive(0)}><i class="fa fa-eye"></i></Button>:
                <Button class="btn-primary btn-sm" onClick={()=>this.handleActive(1)}><i class="fa fa-eye-slash text-danger"></i></Button>}
                <Button class="btn-primary btn-sm" onClick={()=>this.props.handleEdit(this.props.data.id)}><i class="fa fa-edit"></i></Button>
                <Button class="btn-danger btn-sm" onClick={()=>this.props.handleDelete(this.props.data.id)}><i class="fa fa-trash"></i></Button>
              </div>
            </Col>
          </Row>
          <Row>
            {am.length > 0 ?
            <button  class="btn btn-info btn-sm" onClick={()=>this.showQuestion('mult', am)}>Multichoice <span className="badge badge-secondary">{am.length}</span>
            <span className="sr-only"> questions</span></button>
            : ''}
            {
              tm.map((r, i)=>{
              return <button  class="btn btn-info btn-sm" onClick={()=>this.showQuestion(r[0], r[1])}>Essay {i + 1}</button>
              })
            }
          </Row>
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer
})

export default connect(mapStateToProps, { getCoursematerials, getCoursematerial, updateCoursematerial , deleteCoursematerial, getCoursescores, getCoursecomments})(Material)
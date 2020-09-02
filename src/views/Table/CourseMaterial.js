
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
  Col,
  UncontrolledTooltip
} from "reactstrap";
import CardShow from "./CardShow";
import CardShowQuestionPerformance from "./CardShowQuestionPerformance";

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
      qdata:{},
      ast:null,
      poq:false
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
  

  render() {
    let multichoice_array = [1, 2, 3];
    let essay_array = [4, 5, 6, 7];
    let question = this.props.data.question;
    let que = JSON.parse(question);
    let am  = [];
    for(let prop in que)
    {
      let rw = que[prop] && que[prop] !== undefined ? que[prop] : {} ;
      if(multichoice_array.includes(parseInt(rw.type)))
      {
        let ar = [];
        ar.push(prop);
        ar.push(rw);
        am.push(ar);
      }
    }
    let tm = [];
    for(let prop in que)
    {
      let rw = que[prop] && que[prop] !== undefined ? que[prop] : {} ;
      if(essay_array.includes(parseInt(rw.type)))
      {
        let ar = [];
        ar.push(prop);
        ar.push(rw);
        tm.push(ar);
      }
    }

    let {qid, qst, qdata } = this.state;
    let butts =  tm.map((r, i)=>{
      return <Button key={i} type='button'  color='info' className="btn btn-info mx-1 mb-1" onClick={()=>this.showQuestion(r[0], r[1])}>Essay {i + 1}</Button>
      })

      
    return (
      <>
      
      {qst ? 
      <CardShowQuestionPerformance
          mid={qid}
          st={qst}
          data={qdata}
          handleClose={()=>this.setState({qid:null, qst:false, qdata:{}})}
       />:''}
       {this.state.st ? 
         <CardShow 
          mid={this.props.data.id} 
          data ={this.props.data} 
          st={this.state.st}
          handleClose={()=>this.setState({st:false, id:null, data:{}})}
          />: ''}
        {this.state.ast ? 
          <CourseFormAssessment 
            mid={this.props.data.id} 
            id={this.props.data.id} 
            st={this.state.ast}
            data={this.props.data}
            handleClose={()=>this.setState({ast:false})}
          /> : ''}
         <Row xs='12'>
         <div className="card">
            <div className="card-body">
              <blockquote className={`blockquote ${parseInt(this.props.data.is_active) === 1 ? 'blockquote-primary': 'blockquote-info' } mb-0`}>
                <p>{this.props.data.title}</p>
                <footer className="blockquote-footer">{this.props.title}{' '}<cite title="Source Title">{this.props.title1}</cite></footer>
              </blockquote>
            </div>
            <div className="card-footer">
                <button id={`too1${this.props.data.id}`} className="btn  mx-1 mb-1 btn-round btn-raised btn-icon"  onClick={()=>this.setState({ast:true})} type="button"  ><i className="now-ui-icons education_paper"></i></button> 
                {parseInt(this.props.data.is_active) === 1 ? 
                <button id={`too2${this.props.data.id}`} className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary " onClick={()=>this.handleActive(0)}><i className="now-ui-icons ui-1_lock-circle-open"></i></button>:
                <button id={`too2${this.props.data.id}`} className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-primary" onClick={()=>this.handleActive(1)}><i className="now-ui-icons business_bulb-63"></i></button>}
                <button id={`too4${this.props.data.id}`} className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-info " onClick={()=>this.props.handleEdit(this.props.data.id)}><i className="now-ui-icons ui-1_lock-circle-open"></i></button>
                <button id={`too5${this.props.data.id}`} className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-danger" onClick={()=>this.props.handleDelete(this.props.data.id)}><i className="now-ui-icons ui-1_simple-remove"></i></button>
                <button id={`too6${this.props.data.id}`} className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger" onClick={this.showMaterial}><i className={`fa ${pics[this.props.data.types]}`}></i></button>
                
                <UncontrolledTooltip target={`too1${this.props.data.id}`}>Questions</UncontrolledTooltip>
                {parseInt(this.props.data.is_active) === 1 ? 
                <UncontrolledTooltip target={`too2${this.props.data.id}`}>Show</UncontrolledTooltip>:
                <UncontrolledTooltip target={`too2${this.props.data.id}`}>Hide</UncontrolledTooltip>}
                <UncontrolledTooltip target={`too4${this.props.data.id}`}>Edit</UncontrolledTooltip>
                <UncontrolledTooltip target={`too5${this.props.data.id}`}>Remove</UncontrolledTooltip>
                <UncontrolledTooltip target={`too6${this.props.data.id}`}>Preveiw</UncontrolledTooltip>
                {am.length > 0 ?
                <Button  className="btn btn-info mx-1 mb-1" onClick={()=>{this.showQuestion('mult', am)}}>Multichoice <span className="badge badge-secondary">{am.length}</span>
                <span className="sr-only"> questions</span></Button>
                : ''}{' '}
                {butts}
            </div>
          </div>
            
          </Row>
         
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  courses: state.courseReducer,
  user:state.userstudentReducer.user,
})

export default connect(mapStateToProps, { getCoursematerials, getCoursematerial, updateCoursematerial , deleteCoursematerial, getCoursescores, getCoursecomments})(Material)

import React from "react";
import { connect } from 'react-redux';
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button
} from "reactstrap";
import CourseTimeLine from './CourseTimeline';
import { SERVER_URL } from "actions/common";
const imgx = require("assets/img/place.png");

class TimeLine extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:props.mid,
      data:[]
      
    }
  }
  componentWillReceiveProps(nextProps, nexState)
   {
     if(nextProps.userstudentcourses.userstudentcourse.cid !== this.state.id)
     {
       this.setState({data:nextProps.coursematerials.coursematerials});
     }

   }
  render() {
     let {title, modulename, description, objective, starts, ends } = this.props.coursemodules.coursemodule || '';
     let mate =  this.state.data;
     let material = mate && Array.isArray(mate) ? mate.map((prop, index)=>{
            return <CourseTimeLine  key={index} data={prop}/>
     }): null;
     let started = new Date(starts).toLocaleString();
     let ended = new Date(ends).toLocaleString();
    return (
      <>
        {!this.props.coursematerials.isLoading ?
         Object.keys(this.props.coursemodules.coursemodule).length > 0 ? <>
            <Card>
            <CardHeader>
                <h6 className='title'>{title}</h6>
                <small class='subtitle'>{modulename}{' '}</small>
                <small class='subtitle'>({started}{' '}{ended})</small>
            </CardHeader>
            <CardBody>
              <p>{description}</p>
              <p>{objective}</p>
            </CardBody>
            <CardFooter>
              <Button color='info' size='sm'>Report</Button>
              
            </CardFooter>

          </Card>
          
            <div class="card card-timeline card-plain">
                <div class="card-body">
                    <ul class="timeline timeline-simple">
                      {material}
                    </ul>
                </div>
            </div>
            </>: 
            <div class="card card-nav-tabs">
            
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>No data available </p>
                <footer class="blockquote-footer">Click module bar to open <cite title="Source Title">Contact Admin</cite></footer>
              </blockquote>
            </div>
          </div>
          
         :<Card><CardBody><h1 class='h1 m-0 p-0 justify-content-center w-100 d-block'><i className="fa fa-spinner"></i></h1></CardBody></Card>   }  
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ 
  coursematerials: state.coursematerialReducer,
  coursemodules: state.coursemoduleReducer,
  userstudentcourses:state.userstudentcourseReducer,
  user: state.userstudentReducer.user,
})

export default connect(mapStateToProps, { })(TimeLine)
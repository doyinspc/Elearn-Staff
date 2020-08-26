
import React from "react";
import { connect } from 'react-redux';
import { getCourses, getCourse, updateCourse, deleteCourse } from './../../actions/course';
import { getUserstaffcourses, getUserstaffcoursesx } from './../../actions/userstaffcourse';
import Swal from 'sweetalert2';
import Modals from "./../Form/CourseForm";
import CourseCard from "./CourseCard";

// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      page:1,
      subtitle:'My Classes'
    }
  }
  
  componentDidMount(){
    //this.props.getCourses({"course_owner":this.props.user.id});
    this.props.getUserstaffcourses({'staffId':this.props.user.id});
  }

  loadModal = id =>{
    this.props.getCourse(id);
    this.setState({st:true, id:id});
  }

  loadDelete = id =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.props.deleteCourse({'id':id});
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) === 0 ? 1 : 0;
    this.props.updateCourse({'active': act}, id);
  }

  loadNext = id =>{
    this.props.getCourse(id);
  }

  loadMyCourse = () =>{
    this.props.getUserstaffcourses({'staffId':this.props.user.id});
    this.setState({page:1, subtitle:'My Classes'});
  }

  loadOtherCourse = () =>{
    this.props.getUserstaffcoursesx({'staffId':this.props.user.id, 'is_delete':0})
    this.setState({page:2, subtitle:'Co-teacher'});
  }

  closer = id =>{
    this.props.getCourse(id);
    this.setState({st:false, id:null});
  }

  render() {
      let tableTitle = "Class";
      let tableSubTitle = this.state.subtitle;
      let tbody = [];
     
      tbody = this.props.userstaffcourses.userstaffcourses;
      
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <CourseCard 
            key={key} 
            data={prop} 
            handleDelete={(rid)=>this.loadDelete(prop.id)} 
            handleClick={(rid)=>this.loadModal(prop.id)} />
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
                        <Row xs='12'>
                          <Col xs="8" sm='10'><i className="fa fa-file-text"></i>{" "+tableTitle}
                          <p className="category"> {tableSubTitle}</p>
                          </Col>
                          <Col xs="4" sm='2' className="pull-right justify-content-end"> 
                          <div className="btn-group">
                          <div className='dropdown' >
                          <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-ellipsis-v"></i>
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" onClick={this.loadMyCourse}>My Classes</a>
                            <a class="dropdown-item" href="#"  onClick={this.loadOtherCourse}>Co-teacher</a>
                           <div class="dropdown-divider"></div>
                          </div>
                          </div>
                            
                            <Button 
                                size='sm'
                                color='primary'
                                onClick={()=>{this.setState({st:true})}}
                                >
                                  <i className={`fa fa-plus`}></i> 
                                  </Button>

                            {this.state.st ? <Modals 
                              mid={this.state.id} 
                              toggle={this.state.st}
                              handleClose={()=>this.setState({id:null, st:false})}
                            />: ''}
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </CardTitle>
                   
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
  userstaffcourses: state.userstaffcourseReducer,
  user:state.userstaffReducer.user
})

export default connect(mapStateToProps, { getCourses, getCourse, updateCourse, deleteCourse, getUserstaffcourses , getUserstaffcoursesx})(Course)
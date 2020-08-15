
import React from "react";
import { connect } from 'react-redux';
import { getStudents, getStudent, updateStudents, getStudentsClass } from './../../actions/student';
import {  Redirect } from "react-router-dom";
import StudentRow from "./StudentRow";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";


class Student extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      subtitle:''
    }
  }
  
  componentDidMount(){
    this.props.getStudents({'is_active':0, 'is_delete':0});
      this.setState({subtitle:'Active Students'});

     
  }

  handleSelect =(num) =>{
    
    if(num === 1)
    {
      this.props.getStudents({'is_active':0, 'is_delete':0});
      this.setState({subtitle:'Active Students'});
    }else if(num === 2)
    {
      this.props.getStudents({'is_active':1, 'is_delete':0});
      this.setState({subtitle:'Deactivated Students'});
    }else if(num === 3)
    {
      this.props.getStudents({'is_delete':1});
      this.setState({subtitle:'Deleted Students'});
    }else if(num === 4)
    {
      this.props.getStudents({'is_delete':0});
      this.setState({subtitle:'All Students'});
    }else if(num === 5)
    {
      this.props.getStudentsClass({'students.is_delete':0});
      this.setState({subtitle:'Students Class'});
    }
  }

  loadEdit = id =>{
    this.props.getStudent(id);
    this.setState({st:true, id:id});
  }
  loadWhatsapp = (id, phone) =>{
    return <Redirect to="" />
  }

  loadDelete = id =>{
    this.props.getStudent(id);
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) === 0 ? 1 : 0;
    this.props.updateStudents({'is_active': act}, id);
  }

  loadUser = id =>{
    this.props.getStudent(id);
  }

 
  render() {
     
      let tableTitle = "Students";
      let tableSubTitle = this.state.subtitle;
      let tbody = this.props.students.students;
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <StudentRow 
                key={key} 
                data={prop} 
                loadActive={(rid)=>this.loadActive(prop.id, rid)} 
                loadWhatsapp={(rid)=>this.loadWhatsapp(rid, prop.phone)} 
                loadEdit={(rid)=>this.loadEdit(rid)} 
                loadUser={(rid)=>this.loadUser(rid)} 
                />
      )):null;
      
    return (
      <>
        <PanelHeader size="sm" />
        
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                    <CardTitle >
                      <Container>
                        <Row>
                          <Col xs="7" tag="h4"><i className="fa fa-file-text"></i>{" "+tableTitle}
                          </Col>
                          <Col xs="5" className="pull-right"> 
                          <div class="btn-group dropdown">
                            <button class="btn btn-xs btn-secondary dropdown-toggle btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{zIndex:201}}>
                              <a class="dropdown-item" href="#" onClick={()=>this.handleSelect(1)}><i class='fa fa-user'></i> Active Students</a>
                              <a class="dropdown-item" href="#" onClick={()=>this.handleSelect(2)}><i class="fa fa-user" ></i> Inactive students</a>
                              <a class="dropdown-item" href="#" onClick={()=>this.handleSelect(3)}><i class='fa fa-user'></i> Deleted students</a>
                              <a class="dropdown-item" href="#" onClick={()=>this.handleSelect(4)}><i class='fa fa-user'></i> Registered students</a>
                            </div>
                         
                           
                          </div>
                          </Col>
                        </Row>
                      </Container>
                    </CardTitle>
                    <p className="category"> {tableSubTitle}</p>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
               <Card>

                <CardBody >
                <table id="myTable" className="table  table-striped table-bordered table-responsive w-100 d-block d-md-table" style={{width:'100%'}}>
                  <thead>
                    <tr>
                        <th>Sch. No.</th>
                        <th>Fullname</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                  </thead>
                  <tbody> {tablerows}</tbody>
                </table>
                </CardBody>
          </Card>
          </Col>
        </Row>
        </div>
        
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({ 
  students: state.studentReducer,
  user:state.userstaffReducer.user
})

export default connect(mapStateToProps, { getStudents, getStudent, updateStudents, getStudentsClass })(Student)
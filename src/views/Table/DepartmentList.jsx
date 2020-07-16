
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { getDepartments, getDepartment, updateDepartment } from './../../actions/department';
import { getSchool } from './../../actions/school';
import Modals from "./../Form/DepartmentForm"
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";

class Department extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      sid:null,
      id:null,
      st:false,
    }
  }
  
  componentDidMount(){
    let ids = this.props.id;
    this.setState({sid:ids});
    this.props.getDepartments({'sid':ids});
    this.props.getSchool(ids);
  }

  loadModal = id =>{
    this.props.getDepartment(id);
    this.setState({st:true, id:id});
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) == 0 ? 1 : 0;
    this.props.updateDepartment({'active': act}, id);
  }

  loadNext = id =>{
    this.props.getDepartment(id);
  }

  closer = id =>{
    this.props.getDepartment(id);
    this.setState({st:false, id:null});
  }

  render() {
      let props = {};
      let ids = this.props.id;
      let tableTitle = "DEPARTMENT";
      let tableSubTitle = this.props.schools.school.name;
      let thead = ['Department', "Abbrv.", "Action"];
      let tbody = this.props.departments.departments;
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <tr key={key}>
            <td className="text-left">{prop.name}</td>
            <td className="text-center">{prop.abbrv}</td>
            <td className="text-right">
               <Link to={`/admin/department/${prop.id}`}>
                <Button className="btn-icon" color="info" size="sm" key={`mdx${key}${prop.id}`}  onClick={()=>this.loadNext(prop.id)}>
                    <i className="fa fa-user"></i>
                </Button>
                </Link>{` `}
                <Button className="btn-icon" color="success" size="sm" key={`mdy${key}${prop.id}`}  mid={prop.id}  onClick={()=>this.loadModal(prop.id)} >
                    <i className="fa fa-edit"></i>
                </Button>{` `}             
                  <Button className="btn-icon" color= {prop.active == 0 ? 'default' : 'danger'} size="sm" key={`mdz${key}${prop.id}`}  onClick={()=>this.loadActive(prop.id, prop.active)}>
                      <i className="fa fa-times" />
                  </Button>
             </td>
          </tr>
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
                        <Row>
                          <Col sm="8">{tableTitle}
                          <p className="category"> {tableSubTitle}</p>
                          
                          </Col>
                          <Col sm="4" className="pull-right"> 
                              <Modals sid={this.state.sid} mid={this.state.id} toggle={this.state.st}/>
                              <Link to='/admin/school'><a className="btn btn-sm btn-info">Return</a></Link>
                          </Col>
                        </Row>
                      </Container>
                    </CardTitle>
                    
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        {thead.map((prop, key) => {
                          if (key === thead.length - 1)
                            return (
                              <th key={key} className="text-right">
                                {prop}
                              </th>
                            );
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                        {tablerows}
                    </tbody>
                  </Table>
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
  departments: state.departmentReducer,
  schools: state.schoolReducer,
  id: ownProps.match.params.id
})

export default connect(mapStateToProps, {getSchool,  getDepartments, getDepartment, updateDepartment })(Department)
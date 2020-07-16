
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { getSemesters, getSemester, updateSemester } from './../../actions/semester';
import { getSession } from './../../actions/session';
import Modals from "./../Form/SemesterForm"
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
  Button,
  Modal,
  NavLink,
  NavItem
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";

class Semester extends React.Component {
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
    this.props.getSemesters({'session':ids});
    this.props.getSession(ids);
  }

  loadModal = id =>{
    this.props.getSemester(id);
    this.setState({st:true, id:id});
  }

  loadActive = (id, active) =>{
    let act = active === 0 ? 1 : 0;
    this.props.updateSemester({'active': act}, id);
  }

  loadNext = id =>{
    this.props.getSemester(id);
  }

  closer = id =>{
    this.props.getSemester(id);
    this.setState({st:false, id:null});
  }

  render() {
      let props = {};
      let ids = this.props.id;
      let tableTitle = "SEMESTER";
      let tableSubTitle = this.props.sessions.session.session;
      let thead = ['Semester', 'Start', "End", "Action"];
      let tbody = this.props.semesters.semesters;
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <tr key={key}>
            <td className="text-left">{prop.semester}</td>
            <td className="text-center">{new Date(prop.starts).toLocaleDateString()}</td>
            <td className="text-center">{new Date(prop.ends).toLocaleDateString() }</td>
            <td className="text-right">
               <Link to={`/admin/semester/${prop.id}`}>
                <Button className="btn-icon" color="info" size="sm" key={`md${key}${prop.id}`}  onClick={()=>this.loadNext(prop.id)}>
                    <i className="fa fa-user"></i>
                </Button>
                </Link>{` `}
                <Button className="btn-icon" color="success" size="sm" key={`md${key}${prop.id}`}  mid={prop.id}  onClick={()=>this.loadModal(prop.id)} >
                    <i className="fa fa-edit"></i>
                </Button>{` `}             
                  <Button className="btn-icon" color= {prop.active === 0 ? 'default' : 'danger'} size="sm" key={`md${key}${prop.id}`}  onClick={()=>this.loadActive(prop.id, prop.active)}>
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
                              <Link to='/admin/calender'><a className="btn btn-sm btn-info">Return</a></Link>
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
  semesters: state.semesterReducer,
  sessions: state.sessionReducer,
  id: ownProps.match.params.id
})

export default connect(mapStateToProps, {getSession,  getSemesters, getSemester, updateSemester })(Semester)
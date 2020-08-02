
import React from "react";
import { connect } from 'react-redux';
import { getStaffs, getStaff, updateStaffs, getStaffsClass } from './../../actions/staff';
import { Redirect } from "react-router-dom";
import $ from 'jquery';
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


class Staff extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      subtitle:''
    }
  }
  
  componentDidMount(){
    this.props.getStaffs({'is_active':0, 'is_delete':0});
      this.setState({subtitle:'Active Staffs'});
  }

  handleSelect =(num) =>{
    
    if(num === 1)
    {
      this.props.getStaffs({'is_active':0, 'is_delete':0});
      this.setState({subtitle:'Active Staffs'});
    }else if(num === 2)
    {
      this.props.getStaffs({'is_active':1, 'is_delete':0});
      this.setState({subtitle:'Deactivated Staffs'});
    }else if(num === 3)
    {
      this.props.getStaffs({'is_delete':1});
      this.setState({subtitle:'Deleted Staffs'});
    }else if(num === 4)
    {
      this.props.getStaffs({'is_delete':0});
      this.setState({subtitle:'All Staffs'});
    }else if(num === 5)
    {
      this.props.getStaffsClass({'staffs.is_delete':0});
      this.setState({subtitle:'Staffs Class'});
    }
  }

  loadEdit = id =>{
    this.props.getStaff(id);
    this.setState({st:true, id:id});
  }
  loadWhatsapp = (id, phone) =>{
    return <Redirect to="" />
  }

  loadDelete = id =>{
    this.props.getStaff(id);
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) === 0 ? 1 : 0;
    this.props.updateStaffs({'is_active': act}, id);
  }

  loadUser = id =>{
    this.props.getStaff(id);
  }

 
  render() {
     
      let tableTitle = "Staffs";
      let tableSubTitle = this.state.subtitle;
      let tbody = this.props.staffs.staffs;
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
                              <a class="dropdown-item" href="#" onClick={()=>this.handleSelect(1)}><i class='fa fa-user'></i> Active Staffs</a>
                              <a class="dropdown-item" href="#" onClick={()=>this.handleSelect(2)}><i class="fa fa-user" ></i> Inactive staffs</a>
                              <a class="dropdown-item" href="#" onClick={()=>this.handleSelect(3)}><i class='fa fa-user'></i> Deleted staffs</a>
                              <a class="dropdown-item" href="#" onClick={()=>this.handleSelect(4)}><i class='fa fa-user'></i> Registered staffs</a>
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
  staffs: state.staffReducer,
  user:state.userstaffReducer.user
})

export default connect(mapStateToProps, { getStaffs, getStaff, updateStaffs, getStaffsClass })(Staff)
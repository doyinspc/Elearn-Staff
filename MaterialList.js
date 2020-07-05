
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { getMaterials, getMaterial, updateMaterial } from './../../actions/material';
import Modals from "./../Form/MaterialForm"
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

class Material extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      pid:1
    }
  }
  
  componentDidMount(){
    this.props.getMaterials({pid:1});
  }

  loadModal = id =>{
    this.props.getMaterial(id);
    this.setState({st:true, id:id});
  }

  loadActive = (id, active) =>{
    let act = active === 0 ? 1 : 0;
    this.props.updateMaterial({'active': act}, id);
  }

  loadNext = id =>{
    this.props.getMaterial(id);
  }

  closer = id =>{
    this.props.getMaterial(id);
    this.setState({st:false, id:null});
  }

  render() {
      let props = {};
      let tableTitle = "MATERIAL";
      let tableSubTitle = props.subtitle;
      let thead = ['Material', 'Start', "End", "Action"];
      let tbody = this.props.materials.materials;
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <tr key={key}>
            <td className="text-left">{prop.material}</td>
            <td className="text-center">{prop.abbrv}</td>
            <td className="text-right">
            <Link to={`/admin/semester/${prop.id}`}>
                <Button className="btn-icon" color="info" size="sm" key={`md${key}${prop.id}`}  onClick={()=>this.loadNext(prop.id)}>
                    <i className="fa fa-calendar"></i>
                </Button></Link>{` `}
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
                          <Col sm="10">{tableTitle}</Col>
                          <Col sm="2" className="pull-right"> 
                              <Modals mid={this.state.id} toggle={this.state.st}/>
                          </Col>
                        </Row>
                      </Container>
                    </CardTitle>
                    <p className="category"> {tableSubTitle}</p>
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
  materials: state.materialReducer
})

export default connect(mapStateToProps, { getMaterials, getMaterial, updateMaterial })(Material)
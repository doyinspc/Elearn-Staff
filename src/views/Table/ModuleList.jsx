
import React from "react";
import { connect } from 'react-redux';
import { getModules, getModule, updateModule } from './../../actions/module';
import Modals from "./../Form/ModuleForm"
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

class Module extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      pid:5
    }
  }
  
  componentDidMount(){
    this.props.getModules({sid:11});
  }

  loadModal = id =>{
    this.props.getModule(id);
    this.setState({st:true, id:id});
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) === 0 ? 1 : 0;
    this.props.updateModule({'active': act}, id);
  }

  loadNext = id =>{
    this.props.getModule(id);
  }

  closer = id =>{
    this.props.getModule(id);
    this.setState({st:false, id:null});
  }
  handleClose = () =>{
    this.setState({st:false, id:null});
  }


  render() {
      let props = {};
      let tableTitle = "MODULE";
      let tableSubTitle = props.subtitle;
      let thead = ['Module', 'Abbrv.', "Action"];
      let tbody = this.props.modules.modules;
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <tr key={key}>
            <td className="text-left">{prop.name}</td>
            <td className="text-center">{prop.abbrv}</td>
            <td className="text-right">
            
                <Button className="btn-icon" color="success" size="sm" key={`mdx${key}${prop.id}`}  mid={prop.id}  onClick={()=>this.loadModal(prop.id)} >
                    <i className="fa fa-edit"></i>
                </Button>{` `}
                <Button className="btn-icon" color= {parseInt(prop.active) === 0 ? 'default' : 'danger'} size="sm" key={`mdy${key}${prop.id}`}  onClick={()=>this.loadActive(prop.id, prop.active)}>
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
                          <Col xs="8">{tableTitle}</Col>
                          <Col xs="4" className="pull-right"> 
                              <Modals mid={this.state.id} toggle={this.state.st} handleClose={this.setStatehandleClose}/>
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
  modules: state.moduleReducer
})

export default connect(mapStateToProps, { getModules, getModule, updateModule })(Module)
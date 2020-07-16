
import React from "react";
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import { getProgrammes, getProgramme, updateProgramme } from './../../actions/programme';
import Modals from "../Form/ProgrammeForm"
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

class Programme extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      st:false,
      pid:6
    }
  }
  
  componentDidMount(){
    this.props.getProgrammes({pid:6});
  }

  loadModal = id =>{
    this.props.getProgramme(id);
    this.setState({st:true, id:id});
  }

  loadActive = (id, active) =>{
    let act = parseInt(active) === 0 ? 1 : 0;
    this.props.updateProgramme({'active': act}, id);
  }

  loadNext = id =>{
    this.props.getProgramme(id);
  }

  closer = id =>{
    this.props.getProgramme(id);
    this.setState({st:false, id:null});
  }

  render() {
      let props = {};
      let tableTitle = "PROGRAMME";
      let tableSubTitle = props.subtitle;
      let thead = ['Programme', 'Abbrv.', "Action"];
      let tbody = this.props.programmes.programmes;
      let tablerows = tbody && Array.isArray(tbody) && tbody.length > 0 ? tbody.map((prop, key) => (
          <tr key={key}>
            <td className="text-left">{prop.name}</td>
            <td className="text-center">{prop.abbrv}</td>
            <td className="text-right">
            <Link to={`/admin/department/${prop.id}`}>
                <Button className="btn-icon" color="info" size="sm" key={`md${key}${prop.id}`}  onClick={()=>this.loadNext(prop.id)}>
                    <i className="fa fa-calendar"></i>
                </Button></Link>{` `}
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
  programmes: state.programmeReducer
})

export default connect(mapStateToProps, { getProgrammes, getProgramme, updateProgramme })(Programme)
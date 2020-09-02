
import React from "react";
import ShowImage from './../Table/ShowImage';
// reactstrap components
import {
  Input,
  FormGroup,
  Col,
  Row
} from "reactstrap";
import { SERVER_URL } from "actions/common";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      que:'',
      quetype: 0
      
    }
  }

  componentDidMount(){
    this.setState({
      que:this.props.data, 
      quetype:this.props.datatype, 
      id:this.props.index
    })
    console.log('rufu', this.props.data, this.props.datatype)
  }
 
  render() {
     let que = this.state.que;
     let quetype = this.state.quetype;
     let index = this.state.id;
     let num = this.state.num;
    return (
      <>
        <FormGroup check >
            <Row sm={12}>
              <Col sm={1}>
                {this.props.type === 1 || this.props.type === 2  ?
                  this.props.answer ? <i className="now-ui-icons ui-1_check text-success"></i> : <i className="now-ui-icons ui-1_simple-remove text-danger"></i>
                : ''}
                 {this.props.type === 3 ?
                  <i className="now-ui-icons ui-1_check text-success"></i>
                : ''}
              </Col>
              <Col sm={10}>
              {parseInt(quetype) === 1 ?
                <div style={{width:'150px', height:'150px'}}>
                  <ShowImage
                    path={SERVER_URL + que}
                    type={1}
                    height='100'
                    width='100'
                  />
                </div>
               : que
              }
                </Col>      
            </Row>
        </FormGroup>
      </>
    );
  }
}


export default Course
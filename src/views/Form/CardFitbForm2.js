
import React from "react";

// reactstrap components
import {
  Input,
  FormGroup,
  Col,
  Row,
  Label
} from "reactstrap";
import { isJSDocNullableType } from "typescript";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      que:'',
      num:null,
      val:[]
      
    }
  }

  componentDidMount(){
    this.setState({
      que:this.props.data, 
      id:this.props.index, 
      num:this.props.num,
      val:this.props.val
    })
  }
  removeOption = (id)=>{
    this.props.removeOption(id);
  }
  handleChange = (e) =>{
    this.setState({que:e.target.value});
    this.props.handleChange(e.target.value, this.props.index);
  }
  
  render() {
     let que = this.state.que;
     let index = this.state.id;
    return (
      <>
        <FormGroup  check>
            <Row sm={12}>
              <Col sm={9}>
                <Input
                    className="form-control "
                    style={{height:30, maxWidth:250}}
                    name='que'
                    value={que}
                    defaultValue={que}
                    type="text"
                    onChange={this.handleChange}
                    placeholder={`Option ${index + 1}`}
                />
              </Col>
            <Col sm={1} style={{margin:0, padding:0}}>
                <button class="btn btn-sm btn-icon btn-neutral" style={{margin:0}}>
                    <i class="fa fa-image"></i>
                </button>
            </Col>
            <Col sm={1} style={{margin:0, padding:0}}>
                <button class="btn btn-sm btn-icon btn-neutral" type="button" onClick={()=>{this.removeOption(this.props.index)}} style={{margin:0}}>
                    <i class="fa fa-remove"></i>
                </button>
            </Col>  
                   
            </Row>
          
        </FormGroup>
      </>
    );
  }
}


export default Course

import React from "react";

// reactstrap components
import {
  Input,
  FormGroup,
  Col,
  Row
} from "reactstrap";


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
  handleAnswer = (e) =>{
    let st = e.target.checked;
    this.setState({val:e.target.value, num:st});
    this.props.handleChangeAnswer(e.target.value, st, this.props.index);
  }
  render() {
     let que = this.state.que;
     let index = this.state.id;
     let num = this.state.num;
     let val = this.state.val;
    return (
      <>
        <FormGroup  check>
            <Row xs={12}>
              <Col xs={9}>
                <div class="form-check form-check-radio">
                    <label class="form-check-label">
                        <input class="form-check-input" id={`rad${index}`} onClick={this.handleAnswer} type="radio" name='ques' value={que}/>
                        <span class="form-check-sign">
                        <Input
                          className="form-control"
                          style={{height:30, maxWidth:250}}
                          name='que'
                          defaultValue={que}
                          type="text"
                          onChange={this.handleChange}
                          placeholder={`Add option`}
                        />
                            <span class="check"></span>
                        </span>
                    </label>
                </div>
              </Col>
            <Col xs={1} style={{margin:0, padding:0}}>
                <button class="btn btn-sm btn-icon btn-neutral" style={{margin:0}}>
                    <i class="fa fa-image"></i>
                </button>
            </Col>
            <Col xs={1} style={{margin:0, padding:0}}>
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
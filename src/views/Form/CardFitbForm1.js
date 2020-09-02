
import React from "react";

// reactstrap components
import {
  Input,
  FormGroup,
  Col,
  Row
} from "reactstrap";
import ShowImage from './../Table/ShowImage';
import { SERVER_URL } from "actions/common";


class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      que:'',
      quetype:0,
      num:null,
      val:false,
      img:false 
      
    }
  }

  componentDidMount(){
    this.setState({
      que:this.props.data, 
      quetype:this.props.datatype,
      id:this.props.index, 
      num:this.props.num,
      val:this.props.val,
      img:false,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
    if(this.props.datatype !== prevProps.datatype)
    {
      this.setState({
        que:this.props.data, 
        quetype:this.props.datatype,
        id:this.props.index, 
        num:this.props.num,
        val:this.props.val,
        img:false,
      })
      console.log('Rogfile', this.props.index, this.props.data, this.props.datatype);
    }

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
    let quetype = this.state.quetype;
    let index = this.state.id;
    let img = this.state.img;
    let val = this.state.val;
    return (
      <>
        <FormGroup  check>
            <Row sm={12}>
              <Col sm={9}>
                <div class="form-check">
                    <label class="form-check-label">
                       {this.state.val ? <input class="form-check-input text-primary" id={`rad${index}`} onClick={this.handleAnswer} defaultChecked type="checkbox" value={que}/>:
                        <input class="form-check-input text-primary" id={`rad${index}`} onClick={this.handleAnswer}  type="checkbox" value={que}/>}
                        
                        <span class="form-check-sign">
                        {parseInt(quetype) === 1 ?
                        <div style={{maxWidth:'150px', maxHeight:'150px'}}>
                        <ShowImage
                          path={SERVER_URL + que}
                          type={1}
                          width='100'
                          height='100'
                          /></div>:
                            <Input
                              className="form-control "
                              style={{height:30, maxWidth:250}}
                              name='que'
                              defaultValue={que}
                              type="text"
                              onChange={this.handleChange}
                              placeholder={`Option ${index + 1}`}
                            />}
                            <span class="check"></span>
                        </span>
                    </label>
                </div>
              </Col>
            <Col sm={1} style={{margin:0, padding:0}}>
                <button class="btn btn-sm btn-icon btn-neutral" onClick={()=>{this.props.handleImg(this.props.index, 3)}} style={{margin:0}}>
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
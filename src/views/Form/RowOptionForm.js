
import React from "react";
import { Input } from 'reactstrap'
class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      val: ''
    }
  }

  componentDidMount(){
      this.setState({val :this.props.data});
  }
  
  handleChange = (e) =>{
    this.props.handleChange(e.target.value, this.props.index, this.props.st);
  }

  setDelete = (e) =>{
    this.props.setDelete(e, this.props.st);
  }

  render() {
     let { data } = this.props;
    return (
      <>
        <div class='form-group'>
        <div class="input-group">
            <Input type="text" name='data' id='data' placeholder="Search" onChange={this.handleChange} value={data} defaultValue={data} />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={()=>this.setDelete(this.props.index)}><i class="fa fa-trash"></i></button>
          </div>
        </div>
        </div>
      </>
    );
  }
}


export default Course
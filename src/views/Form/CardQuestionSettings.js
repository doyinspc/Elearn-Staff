import React from "react";

// reactstrap components
import {
  Input,
  FormGroup,
  Col,
  Row,
  FormText,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
        name:'',
      num:0,
      timer:0,
      starts:'',
      ends:'',
      showtimer:false,
      showstarts: false,
      showends: false,
      data:{}
    }
  }

  componentDidMount(){
      this.setState({
          name:this.props.name,
          num:this.props.num,
          timer:this.props.timer,
          starts:this.props.starts,
          ends:this.props.ends,
          showtimer:this.props.showtimer,
          showstarts:this.props.showstarts,
          showends:this.props.showends,
          data: this.props.data
      })
  }
  handleSubmit = () =>{
        this.props.handleSubmit(this.state);
  }
  
 
  render() {
    let {starts, ends, timer, showstarts, showends, showtimer, data, num, name} = this.state
    return (
      <>
      <Card>
      <CardHeader>
      <Row xs='12' style={{color:'#000000'}}>
      <Col xs='3'>
      { name == 'multi' ?  '' : `Essay${num} . ` }
      </Col>
      <Col>
      { name == 'multi' ? `Multicoice/Fill in the blanks ${num} questions` :  <div  dangerouslySetInnerHTML={{__html: data.question}} />}
      </Col>
      </Row>
      </CardHeader>
      <CardBody className='mx-4'> 
        <Row xs='12'>
          <div class="form-check form-check-inline">
          <label class="form-check-label">
            <input 
            class="form-check-input" 
            name='showtimer'
            type="checkbox" 
            id="inlineCheckbox1"
            checked={showtimer} 
            value={showtimer}
            onChange={(e)=>this.setState({'showtimer':e.target.checked})}
            /> Timer
            <span class="form-check-sign"></span>
        </label>
        </div>
        <div class="form-check form-check-inline">
        {showstarts ?
       
        <label class="form-check-label">
            <input 
            class="form-check-input" 
            name='showstarts'
            type="checkbox" 
            defaultChecked
            id="inlineCheckbox2" 
            onChange={(e)=>this.setState({'showstarts':e.target.checked})}
            value={showstarts}
            /> Start time
            <span class="form-check-sign"></span>
        </label>:
        <label class="form-check-label">
            <input 
            class="form-check-input" 
            name='showstarts'
            type="checkbox" 
            id="inlineCheckbox2" 
            onChange={(e)=>this.setState({'showstarts':e.target.checked})}
            value={showstarts}
            /> Start time
            <span class="form-check-sign"></span>
        </label>}
        </div>
       
          <div class="form-check form-check-inline">
          {showends ? <label class="form-check-label">
            <input 
            class="form-check-input" 
            name='showends'
            type="checkbox" 
            defaultChecked
            id="inlineCheckbox3" 
            onChange={(e)=>this.setState({'showends':e.target.checked})}
            value={showends}
            />Close time
            <span class="form-check-sign"></span>
        </label>:
         <label class="form-check-label">
         <input 
         class="form-check-input" 
         name='showends'
         type="checkbox" 
         id="inlineCheckbox3" 
         onChange={(e)=>this.setState({'showends':e.target.checked})}
         value={showends}
         />Close time
         <span class="form-check-sign"></span>
     </label>}
        </div>
          </Row>
          <br/>
        <Row>
      { showtimer ? <FormGroup row>
            <Col xs='12'>
            <Input
                name='timer'
                defaultValue={timer}
                type="number"
                className="form-control form-control-sm"
                style={{height:30}}
                placeholder="0000"
                onChange={(e)=>this.setState({'timer':e.target.value})}
                />
            <FormText><small>Set time in minutes, leave blank if no time limit is needed</small></FormText>
            </Col>
        </FormGroup>: ''}
      {showstarts ?<FormGroup row> <Col xs='12'>
            <Input
                name='starts'
                defaultValue={starts}
                type="datetime-local"
                className="form-control form-control-sm"
                style={{height:30}}
                onChange={(e)=>this.setState({'starts':e.target.value})}
                />
            <FormText><small>Shedule start</small></FormText>
            </Col></FormGroup>:''}
      { showends ? <FormGroup row><Col xs='12'>
            <Input
                name='ends'
                defaultValue={ends}
                type="datetime-local"
                className="form-control form-control-sm"
                style={{height:30}}
                onChange={(e)=>this.setState({'ends':e.target.value})}
                />
            <FormText><small>Shedule end</small></FormText>
            </Col></FormGroup>:''}  
        </Row>
        </CardBody>
        <CardFooter>
            <button className='btn btn-sm btn-secondary' onClick={this.handleSubmit}>Save</button>
            </CardFooter>
        </Card>
        <hr />
      </>
    );
  }
}


export default Course
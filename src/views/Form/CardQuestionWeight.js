
import React from "react";

// reactstrap components
import {
  Input,
  FormGroup,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormText,
  Label
} from "reactstrap";


class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      weight:10
      
    }
  }

  componentDidMount(){
    this.setState({
      weight:this.props.weight
    })
  }

  handleSubmit = () =>{
    this.props.handleSubmit(this.state.weight);
}
 
  render() {
     let weight = this.state.weight;
    return (
      <>
       <Card>
      <CardHeader>
      <Row xs='12' style={{color:'#000000'}}>
        
      </Row>
      </CardHeader>
      <CardBody className='mx-4'> 
        
          <br/>
        <Row>
            <FormGroup row>
              <Label>Total Weight</Label>
            <Col xs='12'>
            <Input
                name='weight'
                defaultValue={weight}
                type="number"
                className="form-control form-control-sm"
                style={{height:50}}
                placeholder="0"
                onChange={(e)=>this.setState({'weight':e.target.value})}
                />
            <FormText><small>The total assessment would be calculated base on this weight</small></FormText>
            </Col>
        </FormGroup>
     
        </Row>
        </CardBody>
        <CardFooter>
            <button className='btn btn-sm btn-secondary' onClick={this.handleSubmit}>Save</button>
            </CardFooter>
        </Card>
      </>
    );
  }
}


export default Course
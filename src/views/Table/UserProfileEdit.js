import React from "react";
import { connect } from 'react-redux';
import axios from "axios";
import Select  from 'react-select';
import { MAIN_TOKEN, API_PATHS, axiosConfig } from './../../actions/common';
import {
  Row, CardFooter, CardHeader, Col, Form, FormGroup, Card, CardBody, Input, Button, Container
} from "reactstrap";
import { SERVER_URL } from "./../../actions/common.js"
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import { getUserstaff } from "./../../actions/userstaff";
import { registerUserstaffPost } from "./../../actions/userstaff";
const path = API_PATHS;
const imgx = require("assets/img/place.png");
const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '2px dotted green',
      color: state.isSelected ? 'yellow' : 'black',
      backgroundColor: state.isSelected ? 'green' : 'white'
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "5%",
    })
  }
   
class UserProfileEdit extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          id:null,
          firstname:'',
          lastname:'',
          middlename:'',
          email:'',
          phone:'',
          photo:'',
          department:{},
          professional:'',
          title:'',
          dob: new Date(),
          description:'',
          files:'',
          address:'',
          deps:{},
          sex:{}
        }
      }
  componentDidMount(){
    let user = this.props.userstaffs.user;
    this.setState({
          id:user.id,
          password:user.passwd,
          username:user.username,
          firstname:user.firstname,
          lastname:user.lastname,
          middlename:user.middlename,
          email:user.email,
          phone:user.phone,
          photo:user.photo,
          department:user.department,
          professional:user.professional,
          title:user.title,
          dob:user.dob,
          description:user.description,
          address:user.address
    }) 
    this.launchDep();
  }

  onChange = e => {this.setState({
    [e.target.name] : e.target.value
  })}
  handleInputChange = (evt) => {
    this.setState({files:evt.target.files[0]});
  }


  handleSubmit = () => {
    let us = this.state;
    let fd = new FormData();
    fd.append('id', us.id );
    fd.append('username', us.username );
    fd.append('passwd', us.password );
    fd.append('firstname', us.firstname );
    fd.append('lastname', us.lastname );
    fd.append('middlename', us.middlename );
    fd.append('email', us.email );
    fd.append('phone', us.phone );
    fd.append('dob', us.dob );
    fd.append('address', us.address );
    fd.append('description', us.description );
    fd.append('title', us.title );
    fd.append('gender', us.gender.value );
    fd.append('professional', us.professional );
    fd.append('department', us.department.value );
    fd.append('cat', 'updatestaff' );
    fd.append('table', 'staffs' );

    this.props.registerUserstaffPost(fd);
  }

  handleSubmitPhoto = () => {
    let us = this.state;
    let fd = new FormData();
    fd.append('id', us.id );
    fd.append('files', us.files );
    fd.append('cat', 'updatestaffphoto' );
    fd.append('table', 'staffs' );

    this.props.registerUserstaffPost(fd);
  }

  handleChange = (selected) => {
    this.setState({ files:selected });
  }

  launchDep = () =>{
    let params = {
        data:{'sid':1},
        cat:'group',
        table:'datas',
        token:''
    }
  
      axios.get(path, {params}, axiosConfig)
      .then(res=>{
        let opt = res.data.map(row=>{
           let obs = {};
           obs['value'] = row.id;
           obs['label'] = row.name;
           return obs; 
        })
        return opt;
      })
      .then(optionx =>{
          this.setState({dep:optionx});
      })
      .catch(err=>{
          alert(JSON.stringify(err));
      })
  }

  
  render() {
      
      let {username, password, firstname, lastname, middlename, email, phone, photo, department, professional, title, dob, description, address, dep, files } = this.state;
    return (
      <>
         <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
              <Form>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={username}
                            name={username}
                            onChange={this.onChange}
                            placeholder="Username"
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                      <FormGroup>
                          <label>Password</label>
                          <Input
                            defaultValue={password}
                            name={password}
                            onChange={this.onChange}
                            placeholder="******"
                            type="password"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                      <FormGroup>
                          <label>Title</label>
                          <Input
                            defaultValue={title}
                            name={title}
                            onChange={this.onChange}
                            placeholder="Prof., Dr., Mr., etc"
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Firstname</label>
                          <Input
                            defaultValue={firstname}
                            name={firstname}
                            onChange={this.onChange}
                            placeholder="Firstname"
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                      <FormGroup>
                          <label>Lastname (Surname)</label>
                          <Input
                            defaultValue={lastname}
                            name={lastname}
                            onChange={this.onChange}
                            placeholder="Lastname"
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="middlename">
                            Middlename
                          </label>
                          <Input
                            defaultValue={middlename}
                            name={middlename}
                            onChange={this.onChange}
                            placeholder="Middlename"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                      <FormGroup>
                          <label>Professional</label>
                          <Input
                            defaultValue={professional}
                            name={professional}
                            onChange={this.onChange}
                            placeholder="MCPN, ICAN, FCP etc."
                            type="text"
                            required
                          />
                        </FormGroup>
                       
                      </Col>
                      <Col className="px-1" md="4">
                      <FormGroup>
                          <label htmlFor="email">
                            Email address
                          </label>
                          <Input
                            defaultValue={email}
                            name={email}
                            onChange={this.onChange}
                            placeholder="data@info.com"
                            type="email"
                            required
                          />
                        </FormGroup>
                       
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="phone">
                            Phone Number
                          </label>
                          <Input
                            defaultValue={phone}
                            name={phone}
                            onChange={this.onChange}
                            placeholder="phone"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>        
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Date of Birth</label>
                          
                          <Input
                            defaultValue={dob}
                            name={dob}
                            onChange={this.onChange}
                            placeholder="dob"
                            type="date"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                      <FormGroup>
                          <label>Gender</label>
                          <Input
                            defaultValue={phone}
                            name={phone}
                            onChange={this.onChange}
                            placeholder="phone"
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                      <FormGroup>
                          <label>Department</label>
                          <Select
                            styles = { customStyles }
                            defaulValue={department}
                            onChange={this.handleChange}
                            options={dep}
                            autoFocus={true}
                            />
                          <Input
                            defaultValue={phone}
                            name={phone}
                            onChange={this.onChange}
                            placeholder="phone"
                            type="text"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>                 
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            rows="4"
                            defaultValue={description}
                            name='description'
                            placeholder="Home Address"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            cols="80"
                            rows="4"
                            defaultValue={address}
                            name='address'
                            placeholder="Home Address"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>     
                </CardBody>
                <CardFooter>
                    <button className="btn btn-primary" name="submy1" onClick={this.handleSubmit}><i className="fa fa-"></i>Save</button>
                </CardFooter>
                </Form>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-userx">
              <CardHeader>
                  <h5 className="title">Edit Photo</h5>
                </CardHeader>
                <CardBody>
                 <Container>
                     <form>
                  <div className="author">
                  <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                    <div class="fileinput-new thumbnail img-circle img-raised">
                    <img 
                    alt="load passport"
                    src={`${SERVER_URL + photo}`}
                    onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                    />
                    </div>
                    <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                    <div >
                    <span class="btn btn-raised btn-round btn-default btn-file">
                    <span class="fileinput-exists" style={{width:100}}>Change</span>
                    <input 
                    style={{width:100}}
                    type="file" 
                    name="files"
                    onChange={this.handleInputChange} />
                    </span>
                        <br />
                        <a href="#pablo" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i> Remove</a>
                        <button onClick={on} href="#pablo" class="btn btn-danger btn-round fileinput-exists" ><i class="fa fa-ok"></i> Save</button>
                    </div>
                </div>
                    
                  </div>
                  </form>
                  </Container>
                </CardBody>
                <hr />
                <div className="button-container">
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-user-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-google-plus-g" />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      
      </>
    );
  }
}
const mapStateToProps = (state) => ({ 
    userstaffs: state.userstaffReducer,
  })
  
  export default connect(mapStateToProps, { getUserstaff, registerUserstaffPost})(UserProfileEdit)
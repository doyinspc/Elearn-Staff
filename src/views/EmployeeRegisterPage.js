import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { registerUserstudent } from "./../actions/userstudent";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footer/TransparentFooter.js";
class LoginPage extends React.Component{
  state =  {
    email:'',
    username:'',
    firstname:'',
    surname:'',
    middlename:'',
    password:'',
    upassword:'',
    emailFocus:false,
    firstnameFocus:false,
    surnameFocus:false,
    middlenameFocus:false,
    passwordFocus:false,
    upasswordFocus:false,
    wf: false
  }

  onChange = e => {this.setState({
    [e.target.name] : e.target.value
  })}

  onSubmit = e => {
    e.preventDefault();
    let email = this.state.email;
    let username = this.state.username;
    let surname = this.state.surname;
    let firstname = this.state.firstname;
    let middlename = this.state.middlename;
    let password = this.state.password;
    let upassword = this.state.upassword;
    let fd = new FormData();
    fd.append('email', email);
    fd.append('username', username);
    fd.append('firstname', firstname);
    fd.append('middlename', middlename);
    fd.append('surname', surname);
    fd.append('password', password);
    fd.append('cat' , 'registerstudent');
    fd.append('table' , 'students');
    if(password === upassword) 
    {
      this.props.registerUserstudent(fd);
    }
    
  };

  onHandleFocus = (wf, poos) => this.setState({
    wf : poos
  });

  onLoad = () => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  };

  render(){ 
    if (this.props.isAuthenticated) {
     // return <Redirect to="/admin/course" />;
    }
    
    this.onLoad()
    const { email, username, firstname, middlename, surname, upassword, password, emailFocus, usernameFocus, firstnameFocus, middlenameFocus, surnameFocus, upasswordFocus, passwordFocus } = this.state;
  return (
    <>
      <ExamplesNavbar />
      
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
          }}
        >
        </div>
        <br/><br/>
        <div className="content" style={{marginTop:10}} >
          <Container>
            <Col className="ml-auto mr-auto text-center" >
            
            
              <Card className="card-login card-plain" style={{zIndex:100}}>
                <Form action="" className="form" method="" onSubmit={this.onSubmit}>
                  <CardHeader className="text-center">
                    
                  </CardHeader>
                  <CardBody style={{ marginTop:5 }}>
                    <Row sm={12}>
                    <Col sm={6}>
                    <h3>i-Academy</h3>
                    <div className="logo-container" style={{ marginBottom:5 }}>
                      <img
                        alt="..."
                        src={require("assets/img/logo.png")}
                      ></img>
                    </div>
                    <p>Welcome complete the attached form</p>
                    </Col>
                    <Col sm={6}>
                    <h4 ><b>Student Sign Up</b></h4>
                   
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Employment Number"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(usernameFocus, true)}
                        onBlur={() => this.onHandleFocus(usernameFocus, false)}
                      ></Input>
                      
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(emailFocus, true)}
                        onBlur={() => this.onHandleFocus(emailFocus, false)}
                      ></Input>
                      
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstnameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Firstname"
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(firstnameFocus, true)}
                        onBlur={() => this.onHandleFocus(firstnameFocus, false)}
                      ></Input>
                      
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (middlenameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username"
                        type="text"
                        name="middlename"
                        value={middlename}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(middlenameFocus, true)}
                        onBlur={() => this.onHandleFocus(middlenameFocus, false)}
                      ></Input>
                      
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (surnameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Surname"
                        type="text"
                        name="surname"
                        value={surname}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(surnameFocus, true)}
                        onBlur={() => this.onHandleFocus(surnameFocus, false)}
                      ></Input>
                      
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (passwordFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password.."
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(passwordFocus, true)}
                        onBlur={() => this.onHandleFocus(passwordFocus, true)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (upasswordFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Repeat Password.."
                        type="upassword"
                        name="upassword"
                        value={upassword}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(upasswordFocus, true)}
                        onBlur={() => this.onHandleFocus(upasswordFocus, true)}
                      ></Input>
                    </InputGroup>
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      size="lg"
                    >
                      Sign Up
                    </Button>

                    </Col>
                    </Row>
                     </CardBody>
                  <CardFooter className="text-center">
                   
                    
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        
        <TransparentFooter />
      </div>
      
      
      
    </>
  );
  }
}

const mapStateToProps = state => ({ 
  isAuthenticated: state.userstudentReducer.isAuthenticated
})

export default connect(mapStateToProps, { registerUserstudent })(LoginPage);

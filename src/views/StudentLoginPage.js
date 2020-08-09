import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserstudentLogin } from "./../actions/userstudent";

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
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footer/TransparentFooter.js";
class LoginPage extends React.Component{
  state =  {
    email:'',
    password:'',
    emailFocus:false,
    passwordFocus:false,
    wf: false
  }

  onChange = e => {this.setState({
    [e.target.name] : e.target.value
  })}

  onSubmit = e => {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    if(email && password && email !== "" && password !== "") 
    {
      this.props.getUserstudentLogin({'username':email, password});
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
      return <Redirect to="/admin/student" />;
    }
    
    this.onLoad()
    const { email, password, emailFocus, passwordFocus } = this.state;
  return (
    <>
      <ExamplesNavbar />
      
      <div className="page-header clear-filter" filter-color="">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.png") + ")"
          }}
        >
        </div>
        <br/><br/>
        <div className="content" style={{marginTop:40}} >
          <Container>
            <Col className="ml-auto mr-auto text-center" md="6">
        <h3>{process.env.REACT_APP_WEBSITE_NAME}</h3>
              <Card className="card-login card-plain" style={{zIndex:100}}>
                <Form action="" className="form" method="" onSubmit={this.onSubmit}>
                  <CardHeader className="text-center">
                    <div className="logo-containers" style={{ marginBottom:5 }}>
                      <img
                        alt="..."
                        src={require("assets/img/logo.png")}
                        height="120px"
                        width="120px"
                      ></img>
                    </div>
                  
                  <h4 ><b>Student Login</b></h4>
                  </CardHeader>
                  <CardBody className='mb-2' style={{ marginTop:5 }}>
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
                        placeholder="Username"
                        type="text"
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
                  </CardBody>
                  <CardFooter className="text-center mt-2">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      size="lg"
                    >
                      Login
                    </Button>
                    <a
                      className="btn btn-sm btn-secondary btn-round mt-1"
                      type="button"
                      href="/staff"
                    >
                      Staff Login
                    </a>
                   
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

export default connect(mapStateToProps, { getUserstudentLogin })(LoginPage);

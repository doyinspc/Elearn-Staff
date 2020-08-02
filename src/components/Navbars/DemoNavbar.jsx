import React from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserstaffLogout} from "./../../actions/userstaff";
import { getUserstudentLogout} from "./../../actions/userstudent";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

import routes from "routes.js";

class Header extends React.Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    color: "transparent",
    editroute:''
  };
  sidebarToggle = React.createRef();
  toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "white"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  dropdownToggle = e => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  handleLogout = () =>{
    this.props.getUserstaffLogout();
    this.props.getUserstudentLogout();
  }
  getBrand = () => {
    var name;
    routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "white"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
   
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  render() {
    if(this.props.userstaffs.isAuthenticated || this.props.userstudents.isAuthenticated)
    {

    }
    else{
      return <Redirect to="/staff" />
    }
    let editRoute = '';
    let editProfile = '';
    if(this.props.userstaffs.isAuthenticated )
    {
      editRoute = '/admin/useredit';
      editProfile = '/admin/staff';
      
    }else if(this.props.userstudents.isAuthenticated )
    {
      editRoute = '/admin/usereditstudent';
      editProfile = '/admin/student';
    }
    
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "white"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <div>
      <h5>{process.env.REACT_APP_WEBSITE_NAME}</h5>
      <h6>{this.props.user.lastname+" "+this.props.user.firstname}</h6>
      </div>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="now-ui-icons ui-1_zoom-bold" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <Nav navbar>
              
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons users_single-02" />
                  <p>
                    <span className="d-lg-none d-md-block">Profile Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>

                  <DropdownItem tag="a" href={`${editProfile}`}>Profile</DropdownItem>
                  <DropdownItem tag="a" href={`${editRoute}`}>Edit Profile</DropdownItem>
                  <DropdownItem tag="a" onClick={this.handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
             
              </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({ 
  userstaffs: state.userstaffReducer,
  userstudents: state.userstudentReducer
})

export default connect(mapStateToProps, { getUserstaffLogout, getUserstudentLogout})(Header)

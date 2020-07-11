import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { checkImage } from "./../../actions/common";
import logo from "logo-white.svg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    let {username} = this.props.user;
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a
            href=""
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href=""
            className="simple-text logo-normal"
            target="_blank"
          >
           i-Academy
          </a>
        </div>
        <div className="logo">
          <a
            href=""
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="photo">
              <img className="avatar border-gray" src={checkImage("assets/img/bg5.jpg") ? require("assets/img/bg5.jpg"): require("assets/img/bg5.jpg") } />
            </div>
          </a>
          <a
            href=""
            className="simple-text logo-normal"
            target="_blank"
          >
           {`${username}`}
          </a>
        </div>
        
          
        <div className="sidebar-wrapper" id="sidebar-wrapper" ref="sidebar">
        <Nav>
            {this.props.routes.map((prop, key) => { if(prop.name){
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.layout + prop.path) +
                    ( "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={"now-ui-icons " + prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
           }})}
        </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;

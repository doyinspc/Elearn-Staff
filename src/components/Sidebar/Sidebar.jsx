import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import logo from "logo-white.svg";
import {SERVER_URL} from './../../actions/common';
const imgx = require("assets/img/place.png");
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
    let {username, photo} = this.props.user || {};
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
           {process.env.REACT_APP_WEBSITE_AKA}
          </a>
        </div>
        <div className="logo">
          <a
            href=""
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="photo">
              <img 
              height={30}
              className="rounded-circle img-circle avatar border-gray" 
              src={`${SERVER_URL + photo}`}
              onError={(e)=>{e.target.onerror = null; e.target.src=imgx}} 
              />
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
        
          
        <div className="sidebar-wrapper sc" id="sidebar-wrapper" ref="sidebar">
        <Nav>
            {this.props.routes.map((prop, key) => { 
              if(prop.name && prop.num === this.props.group && this.props.group  === 1 )
              {
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
           }
           
           
           
           })}
            {this.props.routes.map((prop, key) => { 
              if(prop.name && this.props.group  === 2 && prop.num === this.props.group)
              {
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
           }
           
           
           
           })}
            {this.props.routes.map((prop, key) => { 
              if(prop.name && this.props.group  === 3 && prop.num !== 1)
              {
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
           }
           
           
           
           })}
        </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;

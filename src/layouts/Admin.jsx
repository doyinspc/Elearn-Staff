import React from "react";
import { connect } from 'react-redux';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "blue",
    user:{},
    group:null
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }

    let user = {};
    let backgroundColor ='green';
    let group = null;
    if(this.props.userstaffs.isAuthenticated && !this.props.userstudents.isAuthenticated)
    {
        user = this.props.userstaffs.user;
       
        if(this.props.userstaffs.isAdmin)
        {
          backgroundColor = 'green';
          group = 3;
        }else
        {
          backgroundColor = 'orange';
          group = 2;
        }
    }
    else if(this.props.userstudents.isAuthenticated && !this.props.userstaffs.isAuthenticated)
    {
        user = this.props.userstudents.user;
        backgroundColor = 'blue';
        group = 1;
    }else
    {
      //logout
    }
    this.setState({user, backgroundColor, group});
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleColorClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
     
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          user={this.state.user}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
          group={this.state.group}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} user={this.state.user} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            <Redirect from="/admin" to="/admin/profile" />
          </Switch>
          <Footer fluid />
        </div>
        
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ 
  userstaffs: state.userstaffReducer,
  userstudents: state.userstudentReducer
})

export default connect(mapStateToProps, { })(Dashboard)


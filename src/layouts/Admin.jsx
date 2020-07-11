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
    backgroundColor: "blue"
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
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
    let user = {};
    if(this.props.userstaffs.isAuthenticated)
    {
        user = this.props.userstaffs.user;
    }
    else if(this.props.userstudents.isAuthenticated)
    {
        user = this.props.userstudents.userstudent;
    }
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          user={user}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} user={user} />
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
            <Redirect from="/admin" to="/admin/dashboard" />
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


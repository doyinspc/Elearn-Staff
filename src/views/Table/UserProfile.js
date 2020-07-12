import React from "react";
import { connect } from 'react-redux';

import {
  Row
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import CardUserProfile from "./CardUserProfile";
import CardUserData from "./CardUserData";
import CardUserCourse from "./CardUserCourse";
import { getUserstaff } from "./../../actions/userstaff";
import { getUserstaffcourses, getUserstaffcoursesx } from "./../../actions/userstaffcourse";

class UserProfile extends React.Component {
  componentDidMount(){
        this.props.getUserstaffcourses({'staffId': 1});
        this.props.getUserstaffcoursesx({'staffId': 1});
  }
  
  render() {
      let user = this.props.userstaffs.user;
      let course = this.props.userstaffcourses;
      let coursex = this.props.userstaffcoursesx;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
              <CardUserProfile user={user} />
              <CardUserData user={user} />
              <CardUserCourse user={user} data={course} datax={coursex} />
          </Row>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({ 
    userstaffs: state.userstaffReducer,
    userstaffcourses: state.userstaffcourseReducer.userstaffcourses,
    userstaffcoursesx: state.userstaffcourseReducer.userstaffcoursesx,
  })
  
  export default connect(mapStateToProps, { getUserstaff, getUserstaffcourses, getUserstaffcoursesx})(UserProfile)

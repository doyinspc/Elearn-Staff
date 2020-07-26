import React from "react";
import { connect } from 'react-redux';

import {
  Row
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import CardUserStudentProfile from "./CardUserStudentProfile";
import CardUserStudentData from "./CardUserStudentData";
import CardUserStudentCourse from "./CardUserStudentCourse";
import { getUserstudent } from "./../../actions/userstudent";
import { getUserstudentcourses, getUserstudentcoursesx } from "./../../actions/userstudentcourse";

class UserProfile extends React.Component {
  componentDidMount(){
        this.props.getUserstudentcourses({'studentId': this.props.userstudents.user.id});
        this.props.getUserstudentcoursesx({'studentId': this.props.userstudents.user.id});
  }
  
  render() {
      let user = this.props.userstudents.user;
      let course = this.props.userstudentcourses.userstudentcourses;
      let coursex = this.props.userstudentcourses.userstudentcoursesx;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
              <CardUserStudentProfile user={user} />
              <CardUserStudentData user={user} />
              <CardUserStudentCourse user={user} data={course} datax={coursex} />
          </Row>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({ 
    userstudents: state.userstudentReducer,
    userstudentcourses: state.userstudentcourseReducer
  })
  
  export default connect(mapStateToProps, { getUserstudent, getUserstudentcourses, getUserstudentcoursesx})(UserProfile)

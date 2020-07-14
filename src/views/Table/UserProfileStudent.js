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
        this.props.getUserstudentcourses({'studentId': 1});
        this.props.getUserstudentcoursesx({'studentId': 1});
  }
  
  render() {
      let user = this.props.userstudents.user;
      let course = this.props.userstudentcourses;
      let coursex = this.props.userstudentcoursesx;
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
    userstudentcourses: state.userstudentcourseReducer.userstudentcourses,
    userstudentcoursesx: state.userstudentcourseReducer.userstudentcoursesx,
  })
  
  export default connect(mapStateToProps, { getUserstudent, getUserstudentcourses, getUserstudentcoursesx})(UserProfile)

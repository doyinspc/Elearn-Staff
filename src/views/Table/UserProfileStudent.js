import React from "react";
import { connect } from 'react-redux';

import {
  Row
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import CardUserProfileStudent from "./CardUserProfileStudent";
import CardUserCourseStudent from "./CardUserCourseStudent";
import CardUserDataStudent from "./CardUserDataStudent";
import { getUserstudent } from "./../../actions/userstudent";
import { getUserstudentcourse } from "./../../actions/userstudentcourse";

class UserProfile extends React.Component {
  componentDidMount(){
        this.props.getUserstudentcourse({'studentId':this.props.userstudents.userstudent.id})
  }
  
  render() {
      let user = this.props.userstudents;
      let course = this.props.userstudentcourses;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
              <CardUserProfileStudent data={user} />
              <CardUserDataStudent data={user} />
              <CardUserCourseStudent data={course} />
          </Row>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({ 
    userstudents: state.userstudentReducer,
    userstudentcourses: state.userstudentcourseReducer,
  })
  
  export default connect(mapStateToProps, { getUserstudent, getUserstudentcourse })(UserProfile)

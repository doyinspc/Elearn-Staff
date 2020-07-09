import React from "react";
import { connect } from 'react-redux';

import {
  Row
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import CardUserProfile from "./CardUserProfile";
import CardUserCourse from "./CardUserCourse";
import { getUserstaff } from "./../../actions/userstaff";
import { getUserstaffcourse } from "./../../actions/userstaffcourse";

class UserProfile extends React.Component {
  componentDidMount(){
        this.props.getUserstaffcourse({'staffId':this.props.userstaffs.userstaff.id})
  }
  
  render() {
      let user = this.props.userstaffs;
      let course = this.props.userstaffcourses;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
              <CardUserProfile data={user} />
              <CardUserData data={user} />
              <CardUserCourse data={course} />
          </Row>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({ 
    userstaffs: state.userstaffReducer,
    userstaffcourses: state.userstaffcourseReducer,
  })
  
  export default connect(mapStateToProps, { getUserstaff, getUserstaffcourse })(UserProfile)

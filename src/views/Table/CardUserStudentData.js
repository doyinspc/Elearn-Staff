import React from "react";

import {Col} from "reactstrap";

class CardUserCourse extends React.Component {
  render() {
    let user = this.props.user;
    let {  firstname, middlename, lastname, dob } = this.props.user ||  {};
    let fullname = firstname+" "+ middlename+" "+ lastname;
    let qt = this.props.old ? null : 4;
    let grp = this.props.old ? true : false;
    return (
      <>
        <Col md={qt} style={{margin: grp ? null :'0px'}}>
        <div class="card card-nav-tabs">
          <div class="card-header card-header-danger title" style={{textTransform:'capitalize'}}>
           {`${fullname} Bio-Data`}  
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><div><i class="fa fa-calendar"></i> {new Date(dob).toLocaleDateString() }</div></li>
            <li class="list-group-item"><div style={{textTransform:'capitalize'}}><i class="fa fa-user-circle-o"></i> {parseInt(user.gender) === 0?"Male":"Female"}</div></li>
            <li class="list-group-item"><div><i class="fa fa-envelope-open-o"></i> {user.email}</div></li>
            <li class="list-group-item"><div><i class="fa fa-phone"></i> {user.phone}</div></li>
            <li class="list-group-item"><div style={{textTransform:'capitalize'}}><i class="fa fa-university"></i> {user.departmentname}</div></li>
            <li class="list-group-item"><div><i class="fa fa-map-marker"></i> {user.address}</div></li>
          </ul>
        </div>
        </Col>
      </>
    );
  }
}

export default CardUserCourse;

import React from "react";

import { SERVER_URL, imgx, imgb } from "./../../actions/common.js"

import {
  Button,
  Card,
  CardBody,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
class User extends React.Component {
  render() {


    let { professional, firstname, middlename, lastname, title, photo, username, description } = this.props.user ||  {};
    let fullname = firstname+" "+ middlename+" "+ lastname;
    let qt = this.props.old ? null : 4;
    let grp = this.props.old ? true : false;
    return (
      <>
        <Col md={qt} style={{margin: grp ? null :'0px'}}>
            <Card className="card-user">
            <div className="image">
                <img 
                alt={username} src={imgb} />
            </div>
            <CardBody>
                <div className="author">
                <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                    alt={fullname}
                    className="avatar border-gray"
                    src={`${SERVER_URL + photo}`}
                    onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                    />
                    <h5 className="title" style={{textTransform:'capitalize'}}>{fullname}</h5>
                    
                </a>
                <p className="description">{username}</p>
                </div>
                <p className="description text-center">
                {description}
                </p>
            </CardBody>
            <hr />
            <div className="button-container">
                { grp ? '' :<a
                className="btn-neutral btn-icon btn-round"
                color="default"
                href="/usereditstudent"
                size="lg"
                >
                <i className="fa fa-edit" />
                </a>}
               
            </div>
            </Card>
            <Link to='/admin/courses' className='btn btn-block btn-info btn-bg'>My Class(es)</Link>
          </Col>
          
        </>
    );
  }
}

export default User;

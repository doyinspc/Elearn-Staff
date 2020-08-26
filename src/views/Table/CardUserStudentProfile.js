import React from "react";

import { SERVER_URL, imgx } from "./../../actions/common.js"

import {
  Button,
  Card,
  CardBody,
  Col
} from "reactstrap";
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
                alt={username} src={require("assets/img/bg5.jpg")} />
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
                <a
                className="btn-neutral btn-icon btn-round"
                color="default"
                href="/usereditstudent"
                size="lg"
                >
                <i className="fa fa-envelope" />
                </a>
                <a
                className="btn-neutral btn-icon btn-round"
                color="default"
                href="#pablo"
                onClick={e => e.preventDefault()}
                size="lg"
                >
                <i className="fa fa-trash" />
                </a>
               
            </div>
            </Card>
          </Col>
        </>
    );
  }
}

export default User;

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
    let fullname = title +" "+firstname+" "+ middlename+" "+ lastname;
    return (
      <>
        <Col md="4">
            <Card className="card-user">
            <div className="image">
                <img 
                alt={username} src={imgb} 
                />
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
                    <h6><small><b>{professional}</b></small></h6>
                </a>
                <p className="description">{username}</p>
                </div>
                <p className="description text-center">
                {description}
                </p>
            </CardBody>
            <hr />
            <div className="button-container">
                <Button
                className="btn-neutral btn-icon btn-round"
                color="default"
                href="#pablo"
                onClick={e => e.preventDefault()}
                size="lg"
                >
                <i className="fab fa-facebook-f" />
                </Button>
                <Button
                className="btn-neutral btn-icon btn-round"
                color="default"
                href="#pablo"
                onClick={e => e.preventDefault()}
                size="lg"
                >
                <i className="fab fa-twitter" />
                </Button>
                <Button
                className="btn-neutral btn-icon btn-round"
                color="default"
                href="#pablo"
                onClick={e => e.preventDefault()}
                size="lg"
                >
                <i className="fab fa-google-plus-g" />
                </Button>
            </div>
            </Card>
          </Col>
          
        </>
    );
  }
}

export default User;

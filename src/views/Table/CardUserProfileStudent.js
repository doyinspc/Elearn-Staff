import React from "react";

import {
  Button,
  Card,
  CardBody,
  Col
} from "reactstrap";

class User extends React.Component {
  render() {
    return (
      <>
        <Col md="4">
            <Card className="card-user">
            <div className="image">
                <img alt="..." src={require("assets/img/bg5.jpg")} />
            </div>
            <CardBody>
                <div className="author">
                <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("assets/img/mike.jpg")}
                    />
                    <h5 className="title">Mike Andrew</h5>
                </a>
                <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                "Lamborghini Mercy <br />
                Your chick she so thirsty <br />
                I'm in that two seat Lambo"
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

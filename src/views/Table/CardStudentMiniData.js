import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CardUserStudentData from './CardUserStudentData';
import CardUserStudentProfile from "./CardUserStudentProfile";
import { Container } from 'reactstrap';
const Modals = (props) => {
  
  const [modal, setModal] = useState(props.st)
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 ){
     setModal(true);
    } 
},[props.mid]);

const resetdata = () =>{
    props.handleClose();
}


  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={resetdata}>Student Data</ModalHeader>
        <ModalBody>
          <Container >
            <CardUserStudentProfile old={1} user={props.data} />
            <CardUserStudentData  old={1}  user={props.data} />
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    courses: state.courseReducer
  })
  
export default connect(mapStateToProps, {  })(Modals)
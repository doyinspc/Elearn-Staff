import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CardUserStudentData from './CardUserStudentData';
import CardUserStudentProfile from "./CardUserStudentProfile";

const Modals = (props) => {
  
  const [modal, setModal] = useState(props.st)
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     
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
            <CardUserStudentProfile user={props.user} />
            <CardUserStudentData user={props.user} />
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
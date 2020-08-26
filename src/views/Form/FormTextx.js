import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from '../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col,Row, Container,  FormText } from 'reactstrap';
import { SERVER_URL, MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from 'actions/common';
const path = API_PATHS;

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [types, setTypes] = useState(false);
  const [files, setFiles] = useState(null);
  const [title, setTitle] = useState(false);
  const [icons, setIcons] = useState(false);
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
    setTypes(props.type);
    if(props.mid)
    {
     setId(props.mid);
     setModal(!modal);
     setFiles(props.val);
      switch (props.type) {
       case 1:
         setTitle('Format Question');
         setIcons('fa fa-expand')
         break;
       case 2:
         setTitle('Add Instruction');
         setIcons('fa fa-dedent')
         break;
       default:
         break;
     }
    } 
},[props.mid, props.type]);

    const resetdata = () =>{
        setId(null)
        setModal(false);
        props.handleClose()
    }

  const handleSubmit = () =>{
    props.getlink(files, id);
    resetdata();
  }
  
 
  let editColor = 'primary';

  return (
      <Modal isOpen={modal} toggle={toggle}  keyboard='false' backdrop='static' >
        <ModalHeader toggle={resetdata}> {title} </ModalHeader>
        <ModalBody>
        <Form method='post'>
            <Container>
            
            <FormGroup row>
            <Row xs={12} className="row" >
            <Col xs='12'>
            <CKEditor
                data ={files}
                onChange={e=>setFiles(e.editor.getData())}
            />
            </Col>
            </Row>
            </FormGroup>
            
          </Container>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={handleSubmit}>Load</Button>
          {' '}
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    courses: state.courseReducer,
    coursematerials: state.coursematerialReducer,
  })
  
export default connect(mapStateToProps, {  })(Modals)
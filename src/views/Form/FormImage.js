import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col,Row, Container,  FormText } from 'reactstrap';
import { SERVER_URL, MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from 'actions/common';
const path = API_PATHS;

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState(false);
  const [title, setTitle] = useState(false);
  const [icons, setIcons] = useState(false);
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => { 
    if(props.mid)
    {
     setId(props.mid);
     setTypes(props.type);
     switch (props.type) {
       case 3:
         setTitle('Load Image');
         setIcons('fa fa-image')
         break;
       case 4:
         setTitle('Load Audio');
         setIcons('fa fa-volume-up')
         break;
        case 5:
         setTitle('Load Video');
         setIcons('fa fa-video-camera')
         break;
     
       default:
         break;
     }
     setModal(!modal);
    } 
},[props.mid, props.type]);

    const resetdata = () =>{
        setId(null)
        setLoading(false);
        setModal(false);
        props.handleClose()
    }

  const handleSubmit = () =>{
    let num = Math.random() * 999999999;

    let fd = new FormData();
    fd.append('id', id);
    fd.append('files', files);
    fd.append('cat', 'pending' );
    fd.append('table', 'pending' );
    setLoading(true);
    axios.post(path, fd, axiosConfig1)
    .then(res => {
        props.getlink(res.data.url, 1);
        resetdata();
    })
    .catch(err => {
        props.getlink(err, 2);
        resetdata();
    })
  }
  const handleInputChange = (evt) => {
      setFiles(evt.target.files[0]);
    }
  
 
  let editColor = 'primary';

  return (
      <Modal isOpen={modal} toggle={toggle}  keyboard='false' backdrop='static' >
        <ModalHeader toggle={resetdata}> {title}</ModalHeader>
        <ModalBody>
        <Form method='post'>
            <Container xs='12' className='d-flex mx-auto px-auto justify-content-center' >
            
            <FormGroup >
            <Label for="files" xs={12}>Upload </Label>
            <Row xs={12} className="row fileinput fileinput-new text-center m-auto" data-provides="fileinput">
                    <Col className="fileinput-new thumbnail h-150" xs={12} >
                      <i className={icons} style={{fontSize:100}} aria-hidden="true"></i>
                    </Col> 
                    <Col xs='12'>
                        <span className="btn btn-raised btn-block btn-round btn-default btn-file">
                        <span class="fileinput-new">Add</span>
                        <span class="fileinput-exists">Change</span>
                        <input 
                        style={{width:400}}
                        type="file" 
                        name="files" 
                        id="files" 
                        onChange={handleInputChange}
                        />
                        </span>
                    </Col>
            </Row>
            </FormGroup>
          
          </Container>
        </Form>
        </ModalBody>
        <ModalFooter>
          { !loading ?
          <Button color={editColor} onClick={handleSubmit}>Load</Button>:
          <Button color='info' disabled>
            <span className='spinner-border spinner-border-sm'></span>{' '}
               Loading...
          </Button>}
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
  
export default connect(mapStateToProps, { getCoursematerials, getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select  from 'react-select';
import { getCoursestudents,getCoursestudent, registerCoursestudent, updateCoursestudent } from './../../actions/coursestudent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col, UncontrolledTooltip } from 'reactstrap';
import axios from 'axios';
import { MAIN_TOKEN, API_PATHS, axiosConfig, callError } from './../../actions/common';
const path = API_PATHS;
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState({});
  const [options, setOptions] = useState({});
  const toggle = () => setModal(!modal);

 const resetdata =()=>{
    setModal(false);
    setId(null);
    props.handleClose();
  }
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.coursestudents.coursestudent);
    }

    let params = {
      data:{'is_active':0},
      cat:'group',
      table:'students',
      token:MAIN_TOKEN
    }

    axios.get(path, {params}, axiosConfig)
    .then(res=>{
      let opt = res.data.map(row=>{
         let obs = {};
         obs['value'] = row.id;
         obs['label'] = row.username+" "+row.firstname+" "+row.lastname;
         return obs; 
      })
      return opt;
    })
    .then(optionx =>{
        setOptions(optionx);
    })
    .catch(err=>{
        callError(err);
    });
    
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        let fd = new FormData();
        fd.append('studentId', name.value);
        
        fd.append('table', 'course_students');
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateCoursestudent(fd);

        }else{
          fd.append('cat', 'insert');
          fd.append('courseId', props.courseId);
          props.registerCoursestudent(fd);
        }

        resetdata();
        
  }

  const populate = async(data) =>{
        let nm = {};
        nm['value'] = data.studentId;
        nm['label'] = data.fullname;
        setName(nm);
       
    }

    const handleChange = (selected) => {
      setName( selected );
    }
    const handleLoad = () => {
      props.getCoursestudents({'courseId':props.courseId});
    }

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '2px dotted green',
        color: state.isSelected ? 'yellow' : 'black',
        backgroundColor: state.isSelected ? 'green' : 'white'
      }),
      control: (provided) => ({
        ...provided,
        marginTop: "5%",
      })
    }
  
  let editId = id ? id : null;
  let editName = 'Add';
  let editIcon = 'fa-plus';
  let editColor = 'primary';

  return (
    <div>
      
      <div className="btn-group">
      <Button id='reloaderst' className="btn-sm" color="default" onClick={()=>handleLoad()} ><i className="now-ui-icons arrows-1_cloud-download-93"></i></Button>
      <Button id='adderst' className="btn-sm" color={editColor} onClick={toggle}><i className="now-ui-icons ui-1_simple-add"></i></Button>
      </div>
      <UncontrolledTooltip target='reloaderst'>Load all students</UncontrolledTooltip>
      <UncontrolledTooltip target='adderst'>Add a new student</UncontrolledTooltip>
      <Modal isOpen={modal} toggle={toggle} keyboard={false} backdrop='static' >
        <ModalHeader toggle={resetdata}>{editName} Facilitator</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="name" sm={3}>Select </Label>
                <Col sm={9}>
                <Select
                  styles = { customStyles }
                  value={name}
                  onChange={handleChange}
                  options={options}
                  autoFocus={true}
                />
                </Col>
            </FormGroup>
            
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={handleSubmit}>{editId ? 'Edit' : 'Submit'}</Button>{' '}
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursestudents: state.coursestudentReducer
  })
  
export default connect(mapStateToProps, { getCoursestudents, getCoursestudent, registerCoursestudent, updateCoursestudent })(Modals)

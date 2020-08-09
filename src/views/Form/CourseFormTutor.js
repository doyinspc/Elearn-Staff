import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getCoursetutors,getCoursetutor, registerCoursetutor, updateCoursetutor } from './../../actions/coursetutor';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import axios from 'axios';
import { MAIN_TOKEN, API_PATHS, axiosConfig } from './../../actions/common';
const path = API_PATHS;
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState({});
  const [position, setPosition] = useState(null);
  const [description, setDescription] = useState(null);
  const [options, setOptions] = useState({});
  const toggle = () => setModal(!modal);

 const resetdata =()=>{
    setModal(false);
    setId(null);
    setPosition(null);
    setDescription(null);
    props.handleClose();
  }
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.coursetutors.coursetutor);
    }

    let params = {
      data:{'is_active':0},
      cat:'group',
      table:'staffs',
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
        //alert(JSON.stringify(err));
    });
    
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        let fd = new FormData();
        fd.append('staffId', name.value);
        fd.append('position', position);
        fd.append('description', description);
        fd.append('table', 'course_tutors');
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateCoursetutor(fd);

        }else{
          fd.append('cat', 'insert');
          fd.append('courseId', props.courseId);
          props.registerCoursetutor(fd);
        }

        resetdata();
        
  }

  const populate = async(data) =>{
        let nm = {};
        nm['value'] = data.staffId;
        nm['label'] = data.fullname;
        setName(nm);
        setPosition(data.position);
        setDescription(data.descriptions);
    }

    const handleChange = (selected) => {
      setName( selected );
    }
    const handleLoad = () => {
      props.getCoursetutors({'courseId':props.courseId});
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
       <div class="btn-group">
          <Button className="btn-sm" color="default" onClick={()=>handleLoad()} ><i class="fa fa-refresh"></i></Button>
          <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i></Button>
        </div>
      <Modal isOpen={modal} toggle={toggle} >
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
            <FormGroup row>
                <Label for="position" sm={3}>Position</Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    title="position" 
                    id="title"  
                    required
                    defaultValue={position}
                    onChange={e=>setPosition(e.target.value)} 
                    placeholder="Assistant Cordinator" />
                </Col>
            </FormGroup>
            
            <FormGroup row>
              
                <Label  sm={12}>About </Label>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="description" 
                    id="desciption"  
                    required
                    defaultValue={description}
                    onChange={e=>setDescription(e.target.value)} 
                    placeholder="Brief profolio" />
                    
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
    coursetutors: state.coursetutorReducer
  })
  
export default connect(mapStateToProps, { getCoursetutors, getCoursetutor, registerCoursetutor, updateCoursetutor })(Modals)

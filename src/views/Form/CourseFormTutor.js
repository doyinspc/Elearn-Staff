import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import Select , { components } from 'react-select';
import { getCoursetutor, registerCoursetutor, updateCoursetutor } from './../../actions/coursetutor';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import axios from 'axios';
import { MAIN_TOKEN, API_PATHS, axiosConfig } from './../../actions/common';
const path = API_PATHS;
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [position, setPosition] = useState(null);
  const [description, setDescription] = useState(null);
  const [options, setOptions] = useState({});
  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.coursetutors.coursetutor);
    }

    let params = {
      data:{},
      cat:'all',
      table:'staffs',
      token:MAIN_TOKEN
    }

    axios.get(path, {params}, axiosConfig)
    .then(res=>{
      let opt = res.data.map(row=>{
         let obs = {};
         obs['value'] = row.id;
         obs['label'] = row.firstname+" "+row.lastname;
         return obs; 
      })
      return opt;
    })
    .then(optionx =>{
        setOptions(optionx);
    })
    .catch(err=>{
        alert(JSON.stringify(err));
    })
      ;
    
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        if(id && id > 0)
        {
          let data = {
            staffId:name, 
            position:position,
            description:description
          };
          props.updateCoursetutor(data, id);

        }else{
          let data = {
            staffId:name, 
            position:position, 
            courseId:props.courseId,
            description:description
          };;
          props.registerCoursetutor(data);
        }
        
  }

  const populate = async(data) =>{
        setName(data.name);
        setPosition(data.position);
        setDescription(data.description);
    }

    const handleChange = (selected) => {
      setName( selected.value );
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
      
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> Add Facilitator</Button>
      
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Facilitator</ModalHeader>
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
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursetutors: state.coursetutorReducer
  })
  
export default connect(mapStateToProps, { getCoursetutor, registerCoursetutor, updateCoursetutor })(Modals)

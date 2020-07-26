import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import Select from 'react-select';
import { getCoursemodule, registerCoursemodule, updateCoursemodule } from './../../actions/coursemodule';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import axios from 'axios';
import { MAIN_TOKEN, API_PATHS, axiosConfig } from './../../actions/common';
const path = API_PATHS;
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);
  const [objective, setObjective] = useState(null);
  const [description, setDescription] = useState(null);
  const [starts, setStarts] = useState(null);
  const [ends, setEnds] = useState(null);
  const [options, setOptions] = useState({});
  const [selected, setSelected] = useState(null);
  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.courses.course);
    }

    let params = {
      data:{'sid': 2},
      cat:'group',
      table:'datas',
      token:MAIN_TOKEN
    }

    axios.get(path, {params}, axiosConfig)
    .then(res=>{
      let opt = res.data.map(row=>{
         let obs = {};
         obs['value'] = row.id;
         obs['label'] = row.name;
         return obs; 
      })
      return opt;
    })
    .then(option =>{
        setOptions(options);
    })
    .catch(err=>{
        //no action
        alert(JSON.stringify(err));
    })
      ;
    
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        if(id && id > 0)
        {
          let data = {
            course_name:name, 
            course_title:title,
            course_description:description, 
            course_objective:objective, 
            course_starts:starts, 
            course_ends:ends
          };
          props.updateCoursemodule(data, id);

        }else{
          let data = {
            course_name:name, 
            course_title:title, 
            courseId:props.courseId,
            course_description:description, 
            course_objective:objective, 
            course_starts:starts, 
            course_ends:ends
          };;
          props.registerCoursemodule(data);
        }
        
  }

  const populate = async(data) =>{
        setName(data.name);
        setTitle(data.title);
        setObjective(data.objective);
        setDescription(data.description);
        setStarts(data.starts);
        setEnds(data.ends);
    }

    const handleChange = (selected) => {
      this.setState({ selected });
      console.log(`Option selected:`, selected);
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
  let editName = 'Create';
  let editIcon = 'fa-plus';
  let editColor = 'primary';

  return (
    <div>
      
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> Add Tutor</Button>
      
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Modules</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="name" sm={3}>Name </Label>
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
                <Label for="title" sm={3}>Title </Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    title="title" 
                    id="title"  
                    required
                    defaultValue={title}
                    onChange={e=>setTitle(e.target.value)} 
                    placeholder="Physics" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="starts" sm={3}>Starts </Label>
                <Col sm={9}>
                <Input 
                    type="datetime" 
                    name="starts" 
                    id="starts"  
                    required
                    defaultValue={starts}
                    onChange={e=>setStarts(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="ends" sm={3}>Ends </Label>
                <Col sm={9}>
                <Input 
                    type="datetime" 
                    name="ends" 
                    id="ends"  
                    required
                    defaultValue={ends}
                    onChange={e=>setEnds(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
              
                <Label  sm={12}>Objectives </Label>
                <Col sm={12}>
                <CKEditor
                      data={objective}
                      onChange={evt => setObjective( evt )}
                  />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label  sm={12}>Introduction/Description </Label>
                <Col sm={12}>
                <CKEditor
                      data={description}
                      onChange={evt => setDescription( evt )}
                  />
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
    courses: state.courseReducer
  })
  
export default connect(mapStateToProps, { getCoursemodule, registerCoursemodule, updateCoursemodule })(Modals)

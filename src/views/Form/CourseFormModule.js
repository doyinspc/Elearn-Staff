import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import Select  from 'react-select';
import { getCoursemodule, registerCoursemodule, updateCoursemodule } from './../../actions/coursemodule';
import { getCoursematerials } from './../../actions/coursematerial';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import axios from 'axios';
import { MAIN_TOKEN, API_PATHS, axiosConfig } from './../../actions/common';
const path = API_PATHS;
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);
  const [dailyduration, setDailyduration] = useState(null);
  const [weeklyduration, setWeeklyduration] = useState(null);
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
      data:{},
      cat:'all',
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
    .then(optionx =>{
        setOptions(optionx);
    })
    .catch(err=>{
        alert(JSON.stringify(err));
    })

    
    
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        if(id && id > 0)
        {
          let data = {
            name:name.value, 
            title:title,
            description:description, 
            dailyduration:dailyduration, 
            weeklyduration:weeklyduration, 
            objective:objective, 
            starts:starts, 
            ends:ends
          };
          props.updateCoursemodule(data, id);

        }else{
          let data = {
            name:name.value, 
            title:title, 
            courseId:props.courseId,
            description:description, 
            dailyduration:dailyduration, 
            weeklyduration:weeklyduration,
            objective:objective, 
            starts:starts, 
            ends:ends
          };;
          props.registerCoursemodule(data);
        }
        
  }

  const populate = async(data) =>{
        let nm = {};
        nm[data.name] = data.module;
        setTitle(nm);
        setObjective(data.objective);
        setDailyduration(data.dailyduration);
        setWeeklyduration(data.weeklyduration);
        setDescription(data.description);
        setStarts(data.starts);
        setEnds(data.ends);
    }

    const handleChange = (selected) => {
      setName( selected );
    }
    const handleLoad = sid => {
      props.getCoursematerials({'moduleId':sid});
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
      <Button className="btn-sm" color="default" onClick={()=>handleLoad()} ><i class="glyphicon glyphicon-refresh"></i> Reload Modules</Button>
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> {editName} Modules</Button>
      </div>
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
                    placeholder=" Introduction to Mechanics" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="weeklyduration" sm={3}>Duration (Week) </Label>
                <Col sm={9}>
                <Input 
                    type="number" 
                    name="weeklyduration" 
                    id="weeklyduration"  
                    required
                    defaultValue={weeklyduration}
                    onChange={e=>setWeeklyduration(e.target.value)} 
                    placeholder="2" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="dailyduration" sm={3}>Time needed daily (hour) </Label>
                <Col sm={9}>
                <Input 
                    type="number" 
                    name="dailyduration" 
                    id="dailyduration"  
                    required
                    defaultValue={dailyduration}
                    onChange={e=>setDailyduration(e.target.value)} 
                    placeholder="3" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="starts" sm={3}>Starts </Label>
                <Col sm={9}>
                <Input 
                    type="date" 
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
                    type="date" 
                    name="ends" 
                    id="ends"  
                    required
                    defaultValue={ends}
                    onChange={e=>setEnds(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
              
                <Label for="code" sm={12}>Course Objective </Label>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="objective" 
                    id="objective"  
                    required
                    defaultValue={objective}
                    onChange={e=>setObjective(e.target.value)} 
                     />
                
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="code" sm={12}>Course Introduction/Description </Label>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="description" 
                    id="description"  
                    required
                    defaultValue={description}
                    onChange={e=>setDescription(e.target.value)} 
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
  
export default connect(mapStateToProps, { getCoursemodule, registerCoursemodule, updateCoursemodule, getCoursematerials })(Modals)

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select  from 'react-select';
import { getCoursemodules, getCoursemodule, registerCoursemodule, updateCoursemodule } from './../../actions/coursemodule';
import { getCoursematerials } from './../../actions/coursematerial';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col, FormText } from 'reactstrap';
import axios from 'axios';
import { MAIN_TOKEN, API_PATHS, axiosConfig } from './../../actions/common';
const path = API_PATHS;
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState({});
  const [title, setTitle] = useState(null);
  const [dailyduration, setDailyduration] = useState(null);
  const [weeklyduration, setWeeklyduration] = useState(null);
  const [objective, setObjective] = useState(null);
  const [description, setDescription] = useState(null);
  const [starts, setStarts] = useState(new Date('now').getTime());
  const [ends, setEnds] = useState(new Date('now').getTime());
  const [options, setOptions] = useState({});
  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.coursemodules.coursemodule);
    }
    //GET MODULES
    let params1 = {
      data:JSON.stringify({'sid':11}),
      cat:'group',
      table:'datas',
      token:MAIN_TOKEN
    }
    //GET ALL SAVED MODULES FOR THE COURSE
    let params2 = {
      data:JSON.stringify({'courseId' : props.courseId}),
      cat:'group',
      table:'course_modules',
      token:MAIN_TOKEN
    }
    
    //GET BOTH REQUEST FILTER AND RETURN UNUSED MODELS
    let requestOne = axios.get(path, {params:params1}, axiosConfig);
    let requestTwo = axios.get(path, {params:params2}, axiosConfig);

    axios.all([requestOne, requestTwo])
    .then(axios.spread(async (...responses)=>{
        const res0 = responses[0]; //all modules
        const res1 = responses[1]; //used modules
        let opt0 = await res0.data.map(row=>{
          let obs = {};
          obs['value'] = row.id.toString();
          obs['label'] = row.name;
          return obs; 
       })
       let opt1 = await res1.data.map(row=>{
          return row.name; 
        })

        let option = await opt0.filter((row)=>{
          if(opt1.includes(row.value))
          {

          } else{
            return row;
          }
        })
        return option;
    }))
    .then(async(optionx) =>{
        await setOptions(optionx);
    })
    .catch(err=>{
        console.log(JSON.stringify(err));
    })
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        let fd = new FormData();
        fd.append('name', name.value);
        fd.append('description', description);
        fd.append('dailyduration', dailyduration);
        fd.append('weeklyduration', weeklyduration);
        fd.append('objective', objective);
        fd.append('starts', new Date(starts).getTime());
        fd.append('ends', new Date(ends).getTime());
        fd.append('table', 'course_modules');
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateCoursemodule(fd);
        }else
        {
          fd.append('courseId', props.courseId);
          fd.append('cat', 'insert');
          props.registerCoursemodule(fd);
        }
          
          resetdata();
  }

  const populate = async(data) =>{
        let nm = {};
        nm['value'] = data.name.toString();
        nm['label'] = data.modulename;
        setName(nm);
        setTitle(data.title);
        setObjective(data.objective);
        setDailyduration(data.dailyduration);
        setWeeklyduration(data.weeklyduration);
        setDescription(data.description);
        setStarts(data.starts  !== null ? new Date(parseInt(data.starts)).toISOString().substring(0, 19) : '-' );
        setEnds(data.ends  !== null ? new Date(parseInt(data.ends)).toISOString().substring(0, 19) : '-' );
    }

   const resetdata= async() =>{
        setModal(false);
        setId(null);
        setName({});
        setTitle('');
        setObjective('');
        setDailyduration(0);
        setWeeklyduration(0);
        setDescription('');
        setStarts();
        setEnds( );
        props.handleClose()
    }

    const handleChange = (selected) => {
      setName( selected );
    }
    const handleLoad = () => {
      props.getCoursemodules({'courseId':props.courseId});
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
  let editName = id ? 'Edit':'Add';
  let editIcon = id ? 'fa-edit': 'fa-plus';
  let editColor = 'primary';

  return (
    <div>
      <div class="btn-group">
      <Button className="btn-sm" color="default" onClick={()=>handleLoad()} ><i class="fa fa-refresh"></i></Button>
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i></Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{editName} Modules</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup row>
                <Label for="name" sm={3}>Module</Label>
                <Col sm={9}>
                <Select
                  styles = { customStyles }
                  defaultValue={name}
                  onChange={handleChange}
                  options={options}
                  autoFocus={true}
                />
                <FormText>Modules determine the order at which content would be presented to learners</FormText>
                </Col>
                
            </FormGroup>
            <FormGroup row>
                <Label for="title" sm={3}>Topic/Theme</Label>
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
                <Label for="weeklyduration" sm={3}>Duration</Label>
                <Col sm={4}>
                <Input 
                    type="number" 
                    name="weeklyduration" 
                    id="weeklyduration"  
                    required
                    defaultValue={weeklyduration}
                    onChange={e=>setWeeklyduration(e.target.value)} 
                    placeholder="2" />
                    <FormText>Weeks </FormText>
                </Col>
                <Col sm={5}>
                <Input 
                    type="number" 
                    name="dailyduration" 
                    id="dailyduration"  
                    required
                    defaultValue={dailyduration}
                    onChange={e=>setDailyduration(e.target.value)} 
                    placeholder="3" />
                    <FormText>Daily Hours </FormText>
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="starts" sm={3}>Shedule</Label>
                <Col sm={4}>
                <Input 
                    type="datetime-local" 
                    name="starts" 
                    id="starts"  
                    required
                    defaultValue={starts}
                    onChange={e=>setStarts(e.target.value)} 
                     />
                    <FormText>Start</FormText>
                </Col>
                <Col sm={5}>
                <Input 
                    type="datetime-local" 
                    name="ends" 
                    id="ends"  
                    required
                    defaultValue={ends}
                    onChange={e=>setEnds(e.target.value)} 
                     />
                    <FormText>Ends </FormText>
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
            
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={editColor} onClick={handleSubmit}>{editId ? 'Change' : 'Submit'}</Button>{' '}
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursemodules: state.coursemoduleReducer
  })
  
export default connect(mapStateToProps, {getCoursemodules, getCoursemodule, registerCoursemodule, updateCoursemodule, getCoursematerials })(Modals)

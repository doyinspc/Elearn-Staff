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
  const [weight, setWeight] = useState(5);
  const [dailyduration, setDailyduration] = useState(null);
  const [weeklyduration, setWeeklyduration] = useState(null);
  const [objective, setObjective] = useState(null);
  const [description, setDescription] = useState(null);
  const [starts, setStarts] = useState(new Date('now'));
  const [ends, setEnds] = useState(new Date('now'));
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
        //console.log(JSON.stringify(err));
    })
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
        let sdate = new Date(starts).toISOString().slice(0, 19).replace('T', ' ');
        let edate = new Date(ends).toISOString().slice(0, 19).replace('T', ' ');
        let fd = new FormData();
        fd.append('name', name.value);
        fd.append('title', title);
        fd.append('weight', weight);
        fd.append('description', description);
        fd.append('dailyduration', dailyduration);
        fd.append('weeklyduration', weeklyduration);
        fd.append('objective', objective);
        fd.append('starts', sdate);
        fd.append('ends', edate);
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
        setWeight(data.weight);
        setObjective(data.objective);
        setDailyduration(data.dailyduration);
        setWeeklyduration(data.weeklyduration);
        setDescription(data.description);
        setStarts(data.starts);
        setEnds(data.ends);
    }

   const resetdata= async() =>{
        setModal(false);
        setId(null);
        setName({});
        setTitle('');
        setWeight(5);
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
                    name="title" 
                    id="title"  
                    required
                    defaultValue={title}
                    onChange={e=>setTitle(e.target.value)} 
                    placeholder=" Introduction to Mechanics" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="title" sm={3}>Points</Label>
                <Col sm={9}>
                <Input 
                    type="number" 
                    name="weight" 
                    id="weight"  
                    required
                    defaultValue={weight}
                    onChange={e=>setWeight(e.target.value)} 
                    placeholder="0" />
                </Col>
            </FormGroup>
            <FormGroup row>
                
                <Col sm={6}>
                <Input 
                    type="number" 
                    name="weeklyduration" 
                    id="weeklyduration"  
                    required
                    defaultValue={weeklyduration}
                    onChange={e=>setWeeklyduration(e.target.value)} 
                    placeholder="2" />
                    <FormText> Durtion (Weeks) </FormText>
                </Col>
                <Col sm={6}>
                <Input 
                    type="number" 
                    name="dailyduration" 
                    id="dailyduration"  
                    required
                    defaultValue={dailyduration}
                    onChange={e=>setDailyduration(e.target.value)} 
                    placeholder="3" />
                    <FormText>Duration (Daily Hours) </FormText>
                </Col>
            </FormGroup>
            
            <FormGroup row>
                
                <Col sm={6}>
                <Input 
                    type="datetime-local" 
                    name="starts" 
                    id="starts"  
                    required
                    defaultValue={starts}
                    onChange={e=>setStarts(e.target.value)} 
                     />
                    <FormText>Shedule Start</FormText>
                </Col>
                <Col sm={6}>
                <Input 
                    type="datetime-local" 
                    name="ends" 
                    id="ends"  
                    required
                    defaultValue={ends}
                    onChange={e=>setEnds(e.target.value)} 
                     />
                    <FormText>Shedule Close </FormText>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="code" sm={12}>Introduction/Description </Label>
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
              
                <Label for="code" sm={12}>Objective </Label>
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

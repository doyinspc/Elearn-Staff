import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';
import Select  from 'react-select';
import { getCoursemodule, registerCoursemodule, updateCoursemodule } from './../../actions/coursemodule';
import { getCoursematerials } from './../../actions/coursematerial';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col, FormText } from 'reactstrap';
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
  const [starts, setStarts] = useState(new Date('now').getTime());
  const [ends, setEnds] = useState(new Date('now').getTime());
  const [options, setOptions] = useState({});
  const [selected, setSelected] = useState(null);
  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
     populate(props.coursemodules.coursemodule);
    }

    let params1 = {
      data:{'pid':7},
      cat:'group',
      table:'datas',
      token:MAIN_TOKEN
    }
    let params2 = {
      data:{'courseId' : props.courseId},
      cat:'group',
      table:'course_modules',
      token:MAIN_TOKEN
    }
    

    let requestOne = axios.get(path, {params:params1}, axiosConfig);
    let requestTwo = axios.get(path, {params:params2}, axiosConfig);

    axios.all([requestOne, requestTwo])
    .then(axios.spread((...responses)=>{
        const res0 = responses[0]; //all modules
        const res1 = responses[1]; //used modules
        let opt0 = res0.data.map(row=>{
          let obs = {};
          obs['value'] = row.id;
          obs['label'] = row.name;
          return obs; 
       })
       let opt1 = res1.data.map(row=>{
        return row.name; 
        })

        let option = opt0.filter((row)=>{
          if(opt1.includes(row.value))
          {

          } else{
            return row;
          }
        })
        return option;
    }))
    .then(optionx =>{
        setOptions(optionx);
    })
    .catch(err=>{
        console.log(JSON.stringify(err));
    })

    return function cleanup(){
        resetdata();
    }
    
    
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
            starts:new Date(starts).getTime(), 
            ends: new Date(ends).getTime()
          };
          props.updateCoursemodule(data, id);
          resetdata();
          toggle();
        }else{
          let data = {
            name:name.value, 
            title:title, 
            courseId:props.courseId,
            description:description, 
            dailyduration:dailyduration, 
            weeklyduration:weeklyduration,
            objective:objective, 
            starts:new Date(starts).getTime(), 
            ends: new Date(ends).getTime()
          };;
          props.registerCoursemodule(data);
          resetdata();
          toggle()
        }
        
  }

  const populate = async(data) =>{
        let nm = {};
        nm['value'] = data.name;
        nm['label'] = data.module;
        setName(nm);
        setTitle(data.title);
        setObjective(data.objective);
        setDailyduration(data.dailyduration);
        setWeeklyduration(data.weeklyduration);
        setDescription(data.description);
        setStarts(data.starts  !== null ? new Date(parseInt(data.starts)).toISOString().substring(0, 19) : '-' );
        setEnds(data.ends  !== null ? new Date(parseInt(data.ends)).toISOString().substring(0, 19) : '-' );
    }

   const resetdata= async(data) =>{
        setId(null);
        setName({});
        setTitle('');
        setObjective('');
        setDailyduration(0);
        setWeeklyduration(0);
        setDescription('');
        setStarts();
        setEnds( );
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
  let editName = id ? 'Edit':'Add';
  let editIcon = id ? 'fa-edit': 'fa-plus';
  let editColor = 'primary';

  return (
    <div>
      <div class="btn-group">
      <Button className="btn-sm" color="default" onClick={()=>handleLoad()} ><i class="fa fa-refresh"></i></Button>
      <Button className="btn-sm" color={editColor} onClick={toggle}><i class={`fa ${editIcon}`}></i> {editName} Modules</Button>
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
                  value={name}
                  onChange={handleChange}
                  options={options}
                  autoFocus={true}
                />
                <FormText>Modules determone the order at which content would be presented to learners</FormText>
                </Col>
                
            </FormGroup>
            <FormGroup row>
                <Label for="title" sm={3}>Topic/Theme </Label>
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
    coursemodules: state.coursemoduleReducer
  })
  
export default connect(mapStateToProps, { getCoursemodule, registerCoursemodule, updateCoursemodule, getCoursematerials })(Modals)

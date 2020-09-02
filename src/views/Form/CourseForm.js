import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourse, registerCourse, updateCourse } from './../../actions/course';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Col } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import Select  from 'react-select';
import { MAIN_TOKEN, API_PATHS, axiosConfig, callError } from './../../actions/common';

const path = API_PATHS;
const ses = [
  {'value':'First Term', 'label':'First Term'},
  {'value':'Second Term', 'label':'Second Term'},
  {'value':'Third Term', 'label':'Third Term'}
];
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [department, setDepartment] = useState({});
  const [level, setLevel] = useState({});
  const [name, setName] = useState({});
  const [code, setCode] = useState(null);
  const [objective, setObjective] = useState(null);
  const [owner, setOwner] = useState(1);
  const [starts, setStarts] = useState(new Date());
  const [ends, setEnds] = useState(new Date());
  const [description, setDescription] = useState(null);
  const [options0, setOptions0] = useState({});
  const [options1, setOptions1] = useState({});

  const resetdata= async() =>{
    toggle();
    setId(0);
    setDepartment({});
    setLevel({});
    setName('');
    setCode('');
    setObjective('');
    setDescription('');
    setStarts();
    setEnds( );
    props.handleClose();
}

  const toggle = () => setModal(!modal);
  const tog = () =>{
    if(id && id > 0)
    {

    }else{
      toggle();
    }
    
  }
  
  useEffect(() => {
    if(parseInt(props.mid) > 0  )
    {
     setId(parseInt(props.mid));
     setModal(props.toggle);
     populate(props.userstaffcourse);
         
    }
    else
    {
      setModal(true);
    }
    //departments
    let params1 = {
      data:JSON.stringify({'sid':4}),
      cat:'group',
      table:'datas',
      token:MAIN_TOKEN
    }
    //level
    let params2 = {
      data:JSON.stringify({'sid':6}),
      cat:'group',
      table:'datas',
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
        let obs = {};
        obs['value'] = row.id;
        obs['label'] = row.name;
        return obs; 
     })
       setOptions0(opt0);
       setOptions1(opt1);
    }))
    .catch(err=>{
       callError(err)
        //console.log(JSON.stringify(err));
    })
  
    
},[props.mid]);

  const handleSubmit = (e) =>{
        e.preventDefault();
      
        let fd = new FormData();
        fd.append('course_department', department.value);
        fd.append('course_level', level.value);
        fd.append('course_code',  department.value.padEnd(3, '0') + level.value.padEnd(3, '0'));
        ///fd.append('course_name', name);
        fd.append('course_name', name.value)
        fd.append('course_description', description);
        fd.append('course_objective', objective);
        fd.append('course_owner', props.user.id);
        fd.append('course_start', starts);
        fd.append('course_end', ends);
        fd.append('table', 'courses');
        
        if(id && id > 0)
        {
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateCourse(fd);
        }else{
          fd.append('cat', 'insert');
          props.registerCourse(fd);
        }
        
        resetdata();
        
  }

  const populate = async(data) =>{
    
        let nm = {};
        nm['value'] = data.course_department;
        nm['label'] = data.departmentname;
        setDepartment(nm);

        let nm1 = {};
        nm1['value'] = data.course_level;
        nm1['label'] = data.levelname;
        setLevel(nm1);

        let nm2 = {};
        nm2['value'] = data.course_name;
        nm2['label'] = data.course_name;
        setName(nm2);

        ///let gt = new Date(parseInt(data.course_start));
        let gt0 =moment(data.course_start).format('YYYY-MM-DDTHH:mm');
        let gt1 =moment(data.course_end).format('YYYY-MM-DDTHH:mm');
        //setName(data.course_name);
        //setCode(data.course_code);
        setObjective(data.course_objective);
        setDescription(data.course_description);
        setStarts(gt0);
        setEnds(gt1);
   
    }

    const handleTerm = (selected) => {
      setName( selected );
    }
    const handleDepartment = (selected) => {
      setDepartment( selected );
    }
    const handleLevel = (selected) => {
      setLevel( selected );
    }
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted green',
        color: state.isSelected ? 'yellow' : 'black',
        backgroundColor: state.isSelected ? 'green' : 'white'
      }),
      control: (provided) => ({
        ...provided,
        marginTop: "1%",
      })
    }

  
  let editId = id ? id : null;
  let editName = 'Create';
  let editIcon = 'fa-plus';
  let editColor = 'primary';
  let editCss = 'btn-sm';

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop='static' keyboard={false}>
        <ModalHeader toggle={resetdata}>{editName} Class</ModalHeader>
        <ModalBody>
        <Form>
        <FormGroup row>
                <Label for="name" sm={3}>Term</Label>
                <Col sm={9}>
                <Select
                  styles = { customStyles }
                  value={name}
                  onChange={handleTerm}
                  options={ses}
                  autoFocus={true}
                />
                <FormText></FormText>
                </Col> 
            </FormGroup>
            <FormGroup row>
                <Label for="name" sm={3}>Subject</Label>
                <Col sm={9}>
                <Select
                  styles = { customStyles }
                  value={department}
                  onChange={handleDepartment}
                  options={options0}
                  autoFocus={true}
                />
                <FormText></FormText>
                </Col> 
            </FormGroup>
            <FormGroup row>
                <Label for="name" sm={3}>Class</Label>
                <Col sm={9}>
                <Select
                  styles = { customStyles }
                  value={level}
                  onChange={handleLevel}
                  options={options1}
                  autoFocus={true}
                />
                </Col> 
            </FormGroup>
            {/* <FormGroup row>
                <Label for="name" sm={3}>Name </Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="name" 
                    id="name"  
                    required
                    defaultValue={name}
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Physics" />
                </Col>
            </FormGroup> */}
            {/* <FormGroup row>
                <Label for="code" sm={3}>Course Code </Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="code" 
                    id="code"  
                    required
                    defaultValue={code}
                    onChange={e=>setCode(e.target.value)} 
                    placeholder="PHY123" />
                </Col> 
            </FormGroup>*/}
            <FormGroup row>
                <Label for="starts" sm={3}>Starts </Label>
                <Col sm={9}>
                <Input 
                    type="datetime-local" 
                    name="starts" 
                    id="starts"
                    value={starts}
                    onChange={e=>setStarts(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="ends" sm={3}>Ends </Label>
                <Col sm={9}>
                <Input 
                    type="datetime-local" 
                    name="ends" 
                    id="ends"
                    defaultValue={ends}
                    onChange={e=>setEnds(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
              
                <Label for="objective" sm={12}>Objective </Label>
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
                <Label for="description" sm={12}>Introduction </Label>
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
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    courses: state.courseReducer,
    user:state.userstaffReducer.user,
    userstaffcourse:state.userstaffcourseReducer.userstaffcourse
  })
  
export default connect(mapStateToProps, { getCourse, registerCourse, updateCourse })(Modals)

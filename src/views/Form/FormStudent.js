import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourse, registerCourse, updateCourse } from './../../actions/course';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Col } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import Select  from 'react-select';
import { MAIN_TOKEN, API_PATHS, axiosConfig, callError } from './../../actions/common';

const path = API_PATHS;
const genders = [
  {'value':'Male', 'label':'Male'},
  {'value':'Female', 'label':'Female'}
];
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [othername, setOthername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState({});
  const [address, setAddress] = useState('');
  const [level, setLevel] = useState({});
 

  const resetdata= async() =>{
    toggle(false);
    setId(null);
    setUsername('');
    setPassword('');
    setLastname('');
    setFirstname('');
    setOthername('');
    setPhone('');
    setEmail('');
    setDob('');
    setGender({});
    setAddress('');
    setLevel({});
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
    setModal(props.st);
    if(Object.keys(props.data).length > 0  )
    {
     populate(props.data);    
    }
    //level
    let params2 = {
      data:JSON.stringify({'sid':6}),
      cat:'group',
      table:'datas',
      token:MAIN_TOKEN
    }
    axios.get(path, {params:params2}, axiosConfig)
    .then(res=>{
        let opt0 = res.data.map(row=>{
          let obs = {};
          obs['value'] = row.id;
          obs['label'] = row.name;
          return obs; 
       })
       setOptions(opt0);
    })
    .catch(err=>{
       callError(err)
    })
  
    
},[props.mid]);

const handleSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    
    fd.append('username', username );
    fd.append('passwd', password );
    fd.append('firstname', firstname );
    fd.append('lastname', lastname );
    fd.append('middlename', othername );
    fd.append('email', email );
    fd.append('phone', phone );
    fd.append('dob', dob );
    fd.append('address', address);
    fd.append('gender', gender.value );
    fd.append('class', level.value );
    fd.append('table', 'students' );
    
    if(id && parseInt(id) > 0)
    {
        fd.append('id', id );
        fd.append('cat', 'update' );
        this.props.registerUserstudentPost(fd);
    }else
    {
        fd.append('cat', 'insert' );
        this.props.registerUserstudentPost(fd);
    }
    
  }

  const populate = async(data) =>{
    setId(data.id);
    setUsername(data.username);
    setPassword(data.passwd);
    setLastname(data.lastname);
    setFirstname(data.firstname);
    setOthername(data.othername);
    setPhone(data.phone);
    setEmail(data.email);
    setDob(data.dob);
    setGender({'value':data.class, 'label':data.classname });
    setAddress(data.address);
    setLevel({'value':data.department, 'label':data.departmentname });
   
  }
  const handleLevel = (selected) => {
      setLevel( selected );
  }
  const handleChangeGender = (selected) => {
    this.setState({ gender:selected });
  }
  CheckUsername = () =>{
    let params = {
        data:{'sid':1},
        cat:'group',
        table:'datas',
        token:''
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
          this.setState({dep:optionx});
      })
      .catch(err=>{
          alert(JSON.stringify(err));
      })
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
        <ModalHeader toggle={resetdata}>{editName} Student</ModalHeader>
        <ModalBody>
        <Form>
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

            <FormGroup row>
                <Label for="lastname" sm={3}>Lastname<span className='text-danger'>*</span></Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="lastname" 
                    id="lastname"  
                    required
                    defaultValue={lastname}
                    onChange={e=>setLastname(e.target.value)} 
                    placeholder="A*******Z" />
                </Col>
            </FormGroup> 
            <FormGroup row>
                <Label for="firstname" sm={3}>Firstname<span className='text-danger'>*</span></Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="firstname" 
                    id="firstname"  
                    required
                    defaultValue={firstname}
                    onChange={e=>setFirstname(e.target.value)} 
                    placeholder="A*******Z" />
                </Col>
            </FormGroup> 
            <FormGroup row>
                <Label for="username" sm={3}>School Number/Username<span className='text-danger'>*</span></Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="username" 
                    id="username"  
                    required
                    defaultValue={username}
                    onChange={e=>setUsername(e.target.value)} 
                    placeholder="A*******Z" />
                </Col>
            </FormGroup> 
            <FormGroup row>
                <Label for="password" sm={3}>Password<span className='text-danger'>*</span></Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="password" 
                    id="password"  
                    required
                    defaultValue={password}
                    onChange={e=>setPassword(e.target.value)} 
                    placeholder="A*******Z" />
                </Col>
            </FormGroup> 
            <FormGroup row>
                <Label for="othername" sm={3}>Othername<span className='text-danger'>*</span></Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="othername" 
                    id="othername"  
                    required
                    defaultValue={othername}
                    onChange={e=>setOthername(e.target.value)} 
                    placeholder="A*******Z" />
                </Col>
            </FormGroup> 

            <FormGroup row>
                <Label for="phone" sm={3}>Phone<span className='text-danger'>*</span></Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="phone" 
                    id="phone"  
                    required
                    defaultValue={phone}
                    onChange={e=>setPhone(e.target.value)} 
                    placeholder="0*******9" />
                </Col>
            </FormGroup> 

            <FormGroup row>
                <Label for="email" sm={3}>Email<span className='text-danger'>*</span></Label>
                <Col sm={9}>
                <Input 
                    type="text" 
                    name="email" 
                    id="email"  
                    required
                    defaultValue={email}
                    onChange={e=>setEmail(e.target.value)} 
                    placeholder="a****@**.**" />
                </Col>
            </FormGroup> 
           
            <FormGroup row>
                <Label for="dob" sm={3}>Birth date </Label>
                <Col sm={9}>
                <Input 
                    type="datetime-local" 
                    name="dob" 
                    id="dob"
                    value={dob}
                    onChange={e=>setDob(e.target.value)} 
                     />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="gender" sm={3}>Gender </Label>
                <Col sm={9}>
                <Select
                styles = { customStyles }
                value={gender}
                onChange={handleChangeGender}
                options={genders}
                />
                </Col>
            </FormGroup>
            <FormGroup row>
              
                <Label for="address" sm={12}>Address </Label>
                <Col sm={12}>
                <Input 
                    type="textarea" 
                    name="address" 
                    id="address"  
                    required
                    defaultValue={address}
                    
                    onChange={e=>setAddress(e.target.value)} 
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

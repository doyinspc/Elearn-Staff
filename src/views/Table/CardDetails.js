import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import CardDetailsList from './CardDetailsList';
import CardTutorsList from './CardTutorsList';
import { registerUserstudentcourse } from './../../actions/userstudentcourse';
import { SERVER_URL, imgx } from "./../../actions/common.js";
import imgs from "assets/img/bg3.jpg";

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [but, setBut] = useState(false);
 // const [modules, setModules] = useState([]);
   const toggle = () => {
       setModal(!modal);
    }
  
    const resetdata = () =>{
      setModal(false);
      props.handleClose()
    }

  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(true);
     populate(props.coursemodules.coursemodules);
    } 
    let da = props.userstudentcourses.userstudentcourses;
    let available = da && Array.isArray(da) ? da.filter((prop, ind) =>prop.cid==props.mid) : [];
    if(available && available.length > 0)
    {
      setBut(true);
    }else
    {
      setBut(false);
    }
    
},[props.mid]);

const populate =(data)=>{
  //setModules(data);
}

const handleRegister = () =>{
  let courseId = id;
  let user = props.user.id;
  let fd = new FormData();
  fd.append('studentId', user);
  fd.append('courseId', courseId);
  fd.append('table', 'course_students');
  fd.append('cat', 'confirm');
  props.registerUserstudentcourse(fd);
  resetdata();
}
  
let {course_name, course_description, course_code, course_objective, course_start, course_end, pics, departmentname, levelname} = props.data;
let starts= course_start ? moment(course_start).format('MMM Do YYYY, h:mm:ss a') : '--';
let ends = course_end ? moment(course_end).format('MMM Do YYYY, h:mm:ss a'): '--';
  
let modul = props.coursemodules.coursemodules;
let tuto = props.coursetutors.coursetutors;
let mod = modul && Array.isArray(modul) && modul.length > 0 ? modul.map((prop, index)=>{
    return <CardDetailsList key={index} data={prop} />
}) : [];
let tut = tuto && Array.isArray(tuto) && tuto.length > 0 ? tuto.map((prop, index)=>{
  return <CardTutorsList key={index} data={prop} />
}) : [];

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}  keyboard='false' backdrop='static' >
        <ModalHeader toggle={resetdata}><i className={`fa fa-pen`}></i>{but ? 'Registered': 'Register'}</ModalHeader>
        <ModalBody>
        <div class="card" >
        
            <img 
                class="card-img-top" 
                src={`${SERVER_URL + pics}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgs}}
                alt="background"
                />
              <div style={{position:'absolute', top:'8px' , left:'15%'}}>
                <h4 class="card-title text-light">{course_name}</h4>
                <h6 class="text-light">{departmentname} {levelname}</h6>
                <small class="text-muted">{`${starts} - ${ends}`}</small>
                
                </div>
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">{course_code}</h6>
                <p class="card-text">{course_description}</p>
                <p class="card-text">{course_objective}</p>
            </div>
            <div class="container h6 card-title">Scheme of Work</div>
            <ul class="list-group list-group-flush accordion" id="accordionExample">
                {mod}
                <li class="list-group-item py-1">
                    <a class="my-3 py-3" href="#" data-toggle="collapse" data-target={`#CollapseOne${props.data.id}`}
                      aria-expanded="true h6" aria-controls={`CollapseOne${props.data.id}`}>
                      <span class="title h6">Facilitators</span>
                    </a>
                </li>
                <li class="list-group-item py-1">
                  <div class="media">
                      <img
                        class="align-self-start mr-3"
                        src={`${SERVER_URL + props.data.photo}`}
                        height="100px"
                        onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                        alt={props.data.fullname}
                        />
                        <div class="media-body">
                            <h6 class="mt-0">{props.data.fullname}</h6>
                            <p class="subtitle small ">Course Cordinator </p>
                            <p class="subtitle small"><i class="fa fa-phone"></i> {props.data.phone} </p>
                            <p class="subtitle small"><i class="fa fa-envelope"></i> {props.data.email}</p>
                        </div>
                  </div>

                  
                </li>
                {
                  tut
                }
            </ul>
           
        </div>
        </ModalBody>
        <ModalFooter>
          { props.isAuthenticated ?
            but ? <Button color="info" >You have already registered</Button>: <Button color="primary" onClick={handleRegister}>Register</Button> :<Button color="info" >Staff Logged in</Button> 
            
          }
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
          
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({ 
    courses: state.courseReducer,
    coursemodules: state.coursemoduleReducer,
    coursetutors: state.coursetutorReducer,
    userstudentcourses: state.userstudentcourseReducer,
    user: state.userstudentReducer.user,
    isAuthenticated: state.userstudentReducer.isAuthenticated
  })
  
export default connect(mapStateToProps,{registerUserstudentcourse})(Modals);

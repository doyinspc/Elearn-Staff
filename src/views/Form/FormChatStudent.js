import React from 'react';
import { connect } from 'react-redux';
import { registerCoursecomment, deleteCoursecomment } from '../../actions/coursecomment';
import { Row, Container } from 'reactstrap';
import Swal from 'sweetalert2';
import { SERVER_URL } from "../../actions/common.js";
import "assets/css/chat.css"; 
const imgx = require("assets/img/place.png");

const Modals = (props) => {
  
  const loadComment = async (id) =>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true,
        confirmButtonText: 'Send !',
        cancelButtonText: 'Others',
        reverseButtons: true
      }).then((result) => {
        if (text) {
            let fd= new FormData();
            fd.append('chat', text);
            fd.append('userId', props.user.id);
            fd.append('materialId', props.data.materialId);
            fd.append('qid', 'mat');
            fd.append('grp', 1);
            Swal.fire({
                title: 'Make it',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Public',
                cancelButtonText: 'Private',
              }).then((result) => {
                if (result.value) {
                    fd.append('types', 1);
                    props.registerCoursecomment(fd);
                }else{
                    fd.append('types', 2);
                    props.registerCoursecomment(fd);
                }
              })
        } else{
            Swal.fire({
                title: 'Remove or ',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Remove',
                cancelButtonText: 'Close',
              }).then((res) => {
                if (res.value) {
                    props.deleteCourseCoursecomment(id);
                }
                else if(result.dismiss === Swal.DismissReason.cancel) 
                {
                    swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'No Action',
                    'error'
                    )
                }
                })
        }
      })
}


const hig_but ={
  fontSize:'0.8em',
  color:'#ffffff'
}

const mid_but ={
  
}
const low_but ={
  fontSize:'0.7em',
  color:'#cccccc'
}
const main_but={
  maxWidth:'80%'

}

const mains ={
  padding:'8px',
  border:'3px solid #fff',
  borderRadius: '8px',
  color:'#ffffff',
  backgroundColor:'#1FDA9A',
   fontSize:'0.9em',
   fontWeight:'bold',
   minWidth:'80px',
   opacity:1

}
  let pos = props.data.grp === 1 ? 'pull-left' : 'pull-right';
  let bc = props.data.grp === 1 ? 'badge badge-info' : 'badge badge-primary';
  return (
   <>
    <Row xs='12'>
        {props.data.grp === 0 ?
        <Row xs='10' className={pos} inline>
        <Container>
        <img
                height='25px'
                width='25px'
                style={{margin:0, padding:0}}
                className="avatar border-gray btn-round"
                src={`${SERVER_URL + props.data.photo}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                />
        <a className={bc} onClick={loadComment}>
            {props.data.chat}
        </a>
        </Container>
        </Row>:
        <Row xs='10' className={pos} >
        <img
            height='50px'
            width='50px'
            style={{margin:0, padding:0}}
            className="avatar border-gray btn-round"
            src={`${SERVER_URL + props.data.photo}`}
            onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
            />
            <a className={bc} style={mains} onClick={loadComment}>
{props.data.chat}
        </a>
        </Row>}
    </Row>
   </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursestudents: state.coursestudentReducer,
    user:state.userstaffReducer.user,
    coursecomments:state.coursecommentReducer.coursecomments
  })
  
export default connect(mapStateToProps, { registerCoursecomment, deleteCoursecomment })(Modals)

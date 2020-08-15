import React from 'react';
import { connect } from 'react-redux';
import { registerCoursecomment, deleteCoursecomment } from '../../actions/coursecomment';
import { Row } from 'reactstrap';
import Swal from 'sweetalert2';
import { SERVER_URL } from "../../actions/common.js"
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
            fd.append('qid', props.data.id);
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
  let pos = props.grp === 1 ? 'pull-left' : 'pull-right';
  let bc = props.grp === 1 ? 'badge badge-info' : 'badge badge-primary';
  return (
   <>
    <Row xs='12'>
        {props.grp === 1 ?
        <Row xs='10' className={pos} inline>
        <img
                height='50px'
                width='50px'
                style={{margin:0, padding:0}}
                className="avatar border-gray btn-round"
                src={`${SERVER_URL + props.data.photo}`}
                onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
                />
        <a className={bc} onClick={loadComment}>
            {props.chat}
        </a>
        </Row>:
        <Row xs='10' className={pos} inline>
        <a className={bc} onClick={loadComment}>
            {props.chat}
        </a>
        <img
            height='50px'
            width='50px'
            style={{margin:0, padding:0}}
            className="avatar border-gray btn-round"
            src={`${SERVER_URL + props.data.photo}`}
            onError={(e)=>{e.target.onerror = null; e.target.src=imgx}}
            />
        </Row>}
    </Row>
   </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursestudents: state.coursestudentReducer,
    user:state.userstaffReducer.user
  })
  
export default connect(mapStateToProps, { registerCoursecomment, deleteCoursecomment })(Modals)

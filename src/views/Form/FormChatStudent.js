import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { registerCoursecomment, deleteCoursecomment } from '../../actions/coursecomment';
import Swal from 'sweetalert2';
import { SERVER_URL, imgx } from "../../actions/common.js";
import $ from 'jquery';
import "assets/css/chat.css"; 

const Modals = (props) => {
  
  const loadComment = async (id, msg, userz, mat) =>{
    let msgs =`<blockqoute style="padding:'5px', color:'#cccccc'"><i><cite>${msg}<cite></i></blockqoute><br>`;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    const { value: text } = await Swal.fire({
        title: msg,
        input: 'textarea',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true,
        confirmButtonText: 'Send !',
        cancelButtonText: 'Others',
        reverseButtons: true
      })

      if (text && text.length > 0) {
        let fd= new FormData();
        fd.append('chat', msgs + text);
        fd.append('userId', props.user.id);
        fd.append('materialId', props.materialId);
        fd.append('qid', 'mat');
        fd.append('grp', 0);
        fd.append('cat', 'insert');
        fd.append('table', 'course_comments');
        Swal.fire({
            title: 'Let this conversation be',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Public',
            cancelButtonText: 'Private',
          }).then((result) => {
            if (result.value) {
                fd.append('types', 1);
                fd.append('receiverId', props.user.id);
                props.registerCoursecomment(fd);
            }else{
              fd.append('receiverId', props.user.id);
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
                props.deleteCourscomment({'id':id});
            }
            else if(res.dismiss === Swal.DismissReason.cancel) 
            {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                'No Action',
                'error'
                )
            }
            })
    }
}

 let {username, fullname, photo, chat, modulename, materialname, userId, id, materialId, updated, grp } = props.data || '';

  return (
   <>
        {parseInt(userId) === parseInt(props.user.id) && parseInt(grp) === 0 ?
        <article class="msg-container msg-self" id="msg-0">
                    <div class="msg-box">
                        <div class="flr">
                            <div class="messages">
                                <p class="msg" id="msg-2">
                                <div dangerouslySetInnerHTML={{__html:chat}} />
                                </p>
                            </div>
        <span class="timestamp"><span class="username">{fullname}</span>&bull;<span class="posttime">{moment(updated).format('LLL')}</span></span>
                        </div>
                        <img 
                        onClick={()=>loadComment(id, chat, userId, materialId)}
                        class="user-img" 
                        id="user-0" 
                        src={`${SERVER_URL + photo}`}
        onError={(e)=>{e.target.onerror = null; e.target.src=imgx}} 
                        />
                    </div>
                </article>:
    <article class="msg-container msg-remote" id="msg-0">
      <div class="msg-box">
        <img 
        onClick={()=>loadComment(id, chat, userId, materialId)}
        class="user-img" 
        id="user-0" 
        src={`${SERVER_URL + photo}`}
        onError={(e)=>{e.target.onerror = null; e.target.src=imgx}} 
        />
        <div class="flr">
            <div class="messages">
                <p class="msg" id="msg-2">
                  <div dangerouslySetInnerHTML={{__html:chat}} />
                </p>
            </div>
        <span class="timestamp"><span class="username">{fullname}</span>&bull;<span class="posttime">{moment(updated).format('LLL')}</span></span>
          </div>
        </div>
      </article>
        }
   </>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursestudents: state.coursestudentReducer,
    user:state.userstaffReducer.user,
    coursecomments:state.coursecommentReducer.coursecomments
  })
  
export default connect(mapStateToProps, { registerCoursecomment, deleteCoursecomment })(Modals)

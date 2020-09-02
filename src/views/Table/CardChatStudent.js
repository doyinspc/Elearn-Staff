import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { registerCoursecomment } from './../../actions/coursecomment';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import FormChatStudent from 'views/Form/FormChatStudent';
import "assets/css/chat.css"; 
const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [namez, setNamez] = useState('');
  const messageEndRef = useRef(null);
  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    if(parseInt(props.mmid) > 0 )
    {
     setId(props.mmid);
     setModal(!modal);
    }
    scrollToBottom();
},[props.mmid]);
 const handleSubmit =()=>{
  let fd= new FormData();
  fd.append('chat', namez);
  fd.append('userId', props.user.id);
  fd.append('materialId', props.materialId);
  fd.append('qid', 'mat');
  fd.append('grp', 0);
  fd.append('types', 1);
  fd.append('receiverId', props.user.id);
  fd.append('cat', 'insert');
  fd.append('table', 'course_comments');
  props.registerCoursecomment(fd);
 }

 
  let ch = props.coursecomments.coursecomments;
  let chats = ch && Array.isArray(ch) ? ch.map((props, ind)=>{
        return <FormChatStudent
                    key={ind}
                    data={props}
                />
  }): null;
 const scrollToBottom = () =>{
   console.log(messageEndRef.current);
   if(messageEndRef.current !== null) 
   messageEndRef.current.scrollIntoView({behavior: "smooth"})
 }
  const resetdata = () =>{
    props.handleClose()
  }
  return (
    <div>
      <Modal isOpen={modal}  toggle={toggle} backdrop='static'  keyboard={false}>
    
  <ModalHeader toggle={resetdata}><h6><i className={`fa fa-comments-o`}></i> {}</h6></ModalHeader>
        <ModalBody id='mainchat_body'>
        <section class="chatbox">
        <section class="chat-window">
           {chats}
        </section>
        <form class="chat-input"  onsubmit="return false;">
            <input 
              type="text" 
              name='namez'
              value={namez} 
              autocomplete="on" 
              onChange={(e)=>setNamez(e.target.value)}
              placeholder="Send a pr1vate message" />
            <button onClick={handleSubmit} type='button'>
                    <svg style={{width:'24px', height:'24px'}} viewBox="0 0 24 24"><path fill="rgba(0,0,0,.38)" d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" /></svg>
            </button>
        </form>
    </section>
    <div id='el' ref={messageEndRef}></div>
    </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({ 
    coursecomments: state.coursecommentReducer,
    user:state.userstaffReducer.user
  })
  
export default connect(mapStateToProps, {registerCoursecomment })(Modals)

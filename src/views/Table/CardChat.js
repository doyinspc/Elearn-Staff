import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDepartment, registerDepartment, updateDepartment } from './../../actions/department';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col, Container } from 'reactstrap';
import FormChatStudent from 'views/Form/FormChatStudent';
import StudentLoginPage from 'views/StudentLoginPage';

const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  
  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);
    }
    
},[props.mid]);
 const handleSubmit =(num)=>{
    //;
 }

  let editColor = 'primary';
  let ch = props.coursecomments.coursecomments;
  let chats = ch && Array.isArray(ch) ? ch.map((props, ind)=>{
        return <FormChatStudent
                    key={ind}
                    data={props}
                />
  }): null;

  const resetdata = () =>{
    props.handleClose()
  }
  return (
    <div>
      <Modal isOpen={modal} id='ihtml' className='m-0 p-0' toggle={toggle} backdrop='static'  keyboard={false}>
        <section class="msger">
            <header class="msger-header">
              <div class="msger-header-title">
                <i class="fas fa-comment-alt"></i> SimpleChat
              </div>
              <div class="msger-header-options">
                <span><i class="fas fa-cog"></i></span>
              </div>
            </header>

            <main class="msger-chat">
              <div class="msg left-msg">
                <div
                class="msg-img"
                style={{backgroundImage:'https://image.flaticon.com/icons/svg/327/327779.svg'}}
                ></div>

                <div class="msg-bubble">
                  <div class="msg-info">
                    <div class="msg-info-name">BOT</div>
                    <div class="msg-info-time">12:45</div>
                  </div>

                  <div class="msg-text">
                    Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
                  </div>
                </div>
              </div>

              <div class="msg right-msg">
                <div
                class="msg-img"
                style={{backgroundImage:'https://image.flaticon.com/icons/svg/145/145867.svg'}}
                ></div>

                <div class="msg-bubble">
                  <div class="msg-info">
                    <div class="msg-info-name">Sajad</div>
                    <div class="msg-info-time">12:46</div>
                  </div>

                  <div class="msg-text">
                    You can change your name in JS section!
                  </div>
                </div>
              </div>
            </main>

            <form class="msger-inputarea">
              <input type="text" class="msger-input" placeholder="Enter your message..."/>
              <button type="submit" class="msger-send-btn">Send</button>
            </form>
          </section>
        
        
      </Modal>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({ 
    coursecomments: state.coursecommentReducer
  })
  
export default connect(mapStateToProps, { })(Modals)

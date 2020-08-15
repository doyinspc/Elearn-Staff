import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Label, Input, Col, Container,  Row, FormText, CustomInput, UncontrolledTooltip } from 'reactstrap';
import CardQuestion from './../Table/CardQuestion';
import CardQuestionSettings from './CardQuestionSettings';
import CardQuestionWeight from './CardQuestionWeight';
import CardFitbForm from './CardFitbForm';
import CardFitbForm1 from './CardFitbForm1';
import CardFitbForm2 from './CardFitbForm2';



const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [type, setType] = useState(0);
  const [question, setQuestion] = useState('');
  const [optx, setOptx] = useState({});
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [points, setPoints] = useState(1);
  const [qbank, setQbank] = useState({});
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState({});
  const [weight, setWeight] = useState(10);
  const clearState = () =>{
    setModal(false);
    setId(null);
    setType(0);
    setQuestion([]);
    setOptx(['']);
    setAnswer([]);
    setPoints(1);
    setQbank([]);
  }

  const clearForm = () =>{
    setId(null);
    setType(0);
    setQuestion([]);
    setOptx(['']);
    setAnswer([]);
    setPoints(1);
  }
  const toggle = () => setModal(!modal);
  const toggles = (rid) => {
    toggle();
    setType(rid);
  }
  const opts = (rid) => {
    setType(rid);
  }
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(!modal);     
    } 
    populate(props.data);
},[props.mid]);

  
  const handleSubmit = (e) =>{
        //GET TYPE
        let arr = {}
        //SET CONSTANTS
        arr['question'] = question;
        arr['type'] = type;
        arr['points'] = points;
        //IF SINGLE SELECTIOM 1
        //MULTIPLE SELECTION 2
        //ANSWERS
        if(type === 1 || type === 2)
        {
          let all_answers = Object.keys(answers).map((prop, ind)=>{
              return prop;
          })
          let filter_all_answers = all_answers.filter(row=>row !== '' || row !== null);
          arr['answer'] = filter_all_answers.join("::::::");
        }
        else if(type === 4 || type === 5)
        {
          arr['answer'] = answer;
        }else
        {
          arr['answer'] = '';
        }


         //OPTIONS
        let options = optx;
        if(type === 1 || type === 2 || type === 3)
        {
          let all_options = Object.keys(options).map((prop, ind)=>{
            if(options[prop] !== '' || options[prop] !== null)
            {
              let ar_sub = [prop, options[prop]];
              return ar_sub.join("::::");
            }    
          })
          let filter_all_options = all_options.filter(row=>row !== '' || row !== null);
          arr['options'] = filter_all_options.join("::::::");
        }else
        {
          arr['options'] = '';
        }
       
        //GET ALL QUESTIONS FROM BANK
        let all = qbank && Array.isArray(Object.keys(qbank)) ? {...qbank} : {};
        let alls = settings && Array.isArray(Object.keys(settings)) ? {...settings} : {};
        //ADD THE NEW QUESTION
        //GENERATE RANBOM KEYS
        let rand = Math.floor(Math.random() * 123456789);
        all['p' + rand] = arr;
        alls['p' + rand] = {};
        //PLACE IN STATE
        setQbank(all);
        setSettings(alls);
        //UPDATE MATERIAL ROW IN TABLE
        props.updateCoursematerial({'question':JSON.stringify(all), 'settings':JSON.stringify(alls)}, props.id);
        //RESET
        clearForm();
  }
  const handleUpdate = (e) =>{
    //GET TYPE
    let arr = {}
    arr['question'] = question;
    arr['type'] = type;
    arr['points'] = points;

    //ANSWERS
    if(type === 1 || type === 2)
    {
      let all_answers = Object.keys(answers).map((prop, ind)=>{
          return prop;
      })
      let filter_all_answers = all_answers.filter(row=>row !== '' || row !== null);
      arr['answer'] = filter_all_answers.join("::::::");
    }
    else if(type === 4 || type === 5)
    {
      arr['answer'] = answer;
    }else
    {
      arr['answer'] = '';
    }
     
    
    //OPTIONS
    let options = optx;
    if(type === 1 || type === 2 || type === 3)
    {
      let all_options = Object.keys(options).map((prop, ind)=>{
        if(options[prop] !== '' || options[prop] !== null)
        {
          let ar_sub = [prop, options[prop]];
          return ar_sub.join("::::");
        }    
      })
      let filter_all_options = all_options.filter(row=>row !== '' || row !== null);
      arr['options'] = filter_all_options.join("::::::");
    }else
    {
      arr['options'] = '';
    }

    //STORE
    let all = qbank && Array.isArray(Object.keys(qbank)) ? {...qbank} : {};
    all[id] = arr;
    setQbank(all);
    props.updateCoursematerial({'question':JSON.stringify(all)}, props.id);
    clearForm();
  }
  //ADD SPACE FOR NEW OPTION
  const addOption = (e) =>{
    e.preventDefault();
    let rand = Math.floor(Math.random() * 12345)
    let ops = {...optx};
    ops['d' + rand] = '';
    setOptx(ops);
  }
  //REMOVE SPACE AND OPTION ITEM
  const removeOption = indx =>{
    let ed = {...optx};
    delete ed[indx];
    setOptx(ed);
  }
  //CHANGE VALUE
  const handleChange = (data, ind) =>{
    let ed = {...optx}
    ed[ind] = data;
    setOptx(ed);  
 }
//SET ANSWER
 const handleChangeAnswer = (data, st, ind) =>{
  if(data !== "" || data !== null || data !== 'undefined')
  {
      let ed = type === 1 ? {} : {...answers};
      if(st)
      {
        ed[ind] = st;
      }else{
        delete ed[ind];
      }
      setAnswers(ed);  
  }
  
}
  const setSubmitQuestion = data =>{
    let q = [...question, data]
    setQuestion(q);
  }
  const setUpdateQuestion = (data, id) =>{
    let q = [...qbank];
    q[id] = data;
    setQuestion(q);
  }
  const setEditQuestion = indx =>{
     let ed = qbank && Array.isArray(Object.keys(qbank)) && Object.keys(qbank).length > 0 ? {...qbank} : {};
     let eds = ed[indx];
     if(eds && Object.keys(eds).length > 0 )
     { 
       let ops = eds.options ? eds.options.split('::::::') :[];
       let ans = "";
       let opx = {};
       if(eds.type === 1 && eds.type === 2 && eds.type === 3)
       {
          opx = ops.map(row=>{
              let r = row.split("::::");
              let ar = {};
              return ar[r[0]] = r[1]
          })
          if(eds.type === 1 && eds.type === 2)
          {
            ans = eds.answer ? eds.answer.split('::::::') :[];
          }else{
            ans = [];
          }
          
        }else
        {
          ans = eds.answer;
        }
       setId(indx);
       setQuestion(eds.question);
       setType(parseInt(eds.type));
       setPoints(eds.points);
       setAnswer(ans);
       setAnswers(ans);
       setOptx(ops);
      }
  }
  const setDeleteQuestion = indx =>{
    let ed = qbank && Array.isArray(Object.keys(qbank)) && Object.keys(qbank).length > 0 ? {...qbank} : {};
    let sd = settings && Array.isArray(Object.keys(settings)) && Object.keys(settings).length > 0 ? {...settings} : {};
  
    delete ed[indx];
    delete sd[indx];

    setQbank(ed);
    setSettings(sd);

    props.updateCoursematerial({'question':JSON.stringify(ed), 'settings':JSON.stringify(sd)}, props.id);
 }
  const handleSave =() =>{
  }
  const handleSubmitSettings = (name, value) => {
      let sts = settings;
      sts[name] = value;
      setSettings(sts);
      props.updateCoursematerial({'settings':JSON.stringify(sts)}, props.id);
        
  }
  const handleSubmitWeight = (weight) => {
    setWeight(weight);
    props.updateCoursematerial({weight:weight}, props.id);
      
}

const populate = async(data) =>{
  try {
    let ques = JSON.parse(data.question);
    setQbank(ques);
  } catch (error) {
    
  }
  try {
    let sets = JSON.parse(data.settings)
    setSettings(sets);
  } catch (error) {
    
  }     
}
  //LOAD OPTIONS
  let loadOptx = null;
  // IF THE TYPE IS 1 SINGLE SELECTION
  if(type === 1)
  {
  loadOptx =  optx && Array.isArray(Object.keys(optx)) && Object.keys(optx).length > 0 ? Object.keys(optx).map((index)=>{
      
    return <CardFitbForm 
                  key={`ab_${index}`} 
                  index={index} 
                  num={type}
                  val={answer}
                  data={optx[index]}
                  removeOption={removeOption}
                  handleChange={handleChange}
                  handleChangeAnswer={handleChangeAnswer}
                  handleSave={handleSave}
                  />
      }): null; 
  }
  //IF THE TYPE IS 2 MULTIPLESELECTIONS
  if(type === 2){
  loadOptx =  optx && Array.isArray(Object.keys(optx)) && Object.keys(optx).length > 0 ? Object.keys(optx).map((index)=>{
      return <CardFitbForm1 
                  key={`abd_${index}`} 
                  index={index} 
                  num={type}
                  val={answer}
                  data={optx[index]}
                  removeOption={removeOption}
                  handleChange={handleChange}
                  handleChangeAnswer={handleChangeAnswer}
                  handleSave={handleSave}
                  />
      }): null;
    }
  //IF TYPE IS 3 FILL IN THE BLANKS
  if(type === 3)
  {
  loadOptx =  optx && Array.isArray(Object.keys(optx)) && Object.keys(optx).length > 0 ? Object.keys(optx).map((index)=>{
      return <CardFitbForm2 
                  key={`abe_${index}`} 
                  index={index} 
                  num={type}
                  val={answer}
                  data={optx[index]}
                  removeOption={removeOption}
                  handleChange={handleChange}
                  handleChangeAnswer={handleChangeAnswer}
                  handleSave={handleSave}
                  />
      }): null;
    }

  //OUTLINE ALL REGISTERED QUESTIONS
  let numbering = 0;
  const loadQuestions = qbank && Array.isArray(Object.keys(qbank)) && Object.keys(qbank).length > 0 ? Object.keys(qbank).map((index)=>{
    let po = qbank[index] && qbank[index] !== undefined && Array.isArray(Object.keys(qbank[index])) ? qbank[index].type : 1;  
    numbering = numbering + 1;
    return <CardQuestion
                  key={`abc_${index}`} 
                  num={parseInt(po)}
                  numbering={numbering}
                  index={index} 
                  data={qbank[index] !== undefined ? qbank[index] : {} }
                  handleEdit={(rid)=>setEditQuestion(index)}
                  handleDelete={(rid)=>setDeleteQuestion(index)}
              />
  }): null;
 let multichoice_array = [1, 2, 3];
 let essay_array = [4, 5, 6];
  let editColor = 'primary';
  let objec = qbank && Array.isArray(Object.keys(qbank)) ? Object.keys(qbank).map((prop, ind)=>{
    let rw = qbank[prop] && qbank[prop] !== undefined ? qbank[prop] : {} 
     if(multichoice_array.includes(parseInt(rw.type)))
     {
        return rw;
     }
  }): [];
  let essay = [];
  for(let prop in qbank){
    let rw = qbank[prop] && qbank[prop] !== undefined ? qbank[prop] : {} ;
     if(essay_array.includes(parseInt(rw.type)))
     {
       let ar = [];
       ar.push(prop);
       ar.push(rw);
       essay.push(ar);
     }
  };

  let object_num = objec ? objec.length : 0;
  let essay_num = essay ? essay.length : 0;
  return (
    <div>
        <button class="btn btn-secondary" id={`too${id}`} onClick={()=>toggles(1)} type="button"  >
          <i class="fa fa-question"></i>
        </button>
      <UncontrolledTooltip 
          target={`too${id}`}
      >
        Questions
        </UncontrolledTooltip>

      <Modal isOpen={modal} toggle={toggle} contentClassName={{width:'800px', height:400}} >
        <ModalHeader toggle={toggle}>Assessments</ModalHeader>
        <ModalBody style={{backgroundColor:'#cccccc'}}>
        <Container className='p-10'>
          <Card>
          {page  === 2 ?
              <CardBody>
                    <CardQuestionSettings 
                      data={objec}
                      num={object_num}
                      name='multi'
                      timer={settings && settings['multi'] && settings['multi']['timer'] ? settings['multi']['timer'] : ''}
                      starts={settings && settings['multi'] && settings['multi']['starts'] ? settings['multi']['starts'] : ''}
                      ends={settings && settings['multi'] && settings['multi']['ends'] ? settings['multi']['ends'] : ''}
                      showtimer={settings && settings['multi'] && settings['multi']['showtimer'] ? settings['multi']['showtimer'] : false}
                      showstarts={settings && settings['multi'] && settings['multi']['showstart'] ? settings['multi']['showstart'] : false}
                      showends={settings && settings['multi'] && settings['multi']['showend'] ? settings['multi']['showend'] : false}
                      handleSubmit={(val)=>handleSubmitSettings('multi', val)}
                    />
                  {essay.length > 0 ? essay.map((pr, ind)=>{
                        let ids = pr[0];
                        return <CardQuestionSettings
                        key={ind}
                        num={ind + 1}
                        name={ids}
                        data={pr[1]}
                        timer={settings && settings[ids] && settings[ids]['timer'] ? settings[ids]['timer'] : ''}
                        starts={settings && settings[ids] && settings[ids]['starts'] ? settings[ids]['starts'] : ''}
                        ends={settings && settings[ids] && settings[ids]['ends'] ? settings[ids]['ends'] : ''}
                        showtimer={settings && settings[ids] && settings[ids]['showtimer'] ? settings[ids]['showtimer'] : false}
                        showstarts={settings && settings[ids] && settings[ids]['showstart'] ? settings[ids]['showstart'] : false}
                        showends={settings && settings[ids] && settings[ids]['showend'] ? settings[ids]['showend'] : false}
                        handleSubmit={(val)=>handleSubmitSettings(ids, val)}
                        />
                      })
                  : ''} 
              </CardBody>
            : ''}
            {page  === 3 ?
              <CardBody>
                    <CardQuestionWeight 
                      weight={weight}
                      handleSubmit={(val)=>{handleSubmitWeight(val)}}
                    />
              </CardBody>
            : ''}
            {page  === 1 ?<CardBody >
              <Row>
                <Col sm={10}>
                  <Input
                    name={question}
                    value={question}
                    type="textarea"
                    row={5}
                    col={8}
                    placeholder="Question"
                    onChange={(e)=>setQuestion(e.target.value)}
                    />
                </Col>
                <Col>
                    <a onClick={handleSubmit}><h3><i className="fa fa-image"></i></h3></a>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="btn-group dropdown">
                    <button class="btn btn-secondary dropdown-toggle btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-plus"></i> Choose answer type
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{zIndex:201}}>
                        <a class="dropdown-item" href="#" onClick={()=>opts(1)}><i class='fa fa-question'></i> Multichoice (Single Answer)</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(2)}><i class='fa fa-question'></i> Multichoice (Multiple Answer)</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(3)}><i class='fa fa-question'></i> Fill in the blank</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(4)}><i class='fa fa-question'></i> Short Text</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(5)}><i class="fa fa-question" ></i> Long Text</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(6)}><i class='fa fa-attachment'></i> Upload Answer</a>
                        <a class="dropdown-item" href="#" onClick={()=>opts(7)}><i class='fa fa-link'></i> Post Link</a>   
                      </div>
                    </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12} >
                {type === 1  || type== 2 || type== 3? 
                  <div >
                   {loadOptx}
                  <FormGroup inline>
                    <a href="#" className="btn btn-primary btn-icon" onClick={addOption}><i className="fa fa-plus"></i></a>
                  </FormGroup>
                  </div>
                : ""}
                
                {type === 4 ? 
                <FormGroup row>
                <Input
                    name='answer'
                    value={answer}
                    defaultValue={answer}
                    type="text"
                    placeholder="Short answer (Teacher marked)"
                /></FormGroup>:""
                }
                {type === 5 ? 
                <FormGroup row>
                <Input
                    name='answer'
                    value={answer}
                    defaultValue={answer}
                    type="textarea"
                    row={7}
                    col={8}
                    placeholder="Long answer (Teacher marked)"
                /></FormGroup>:""
                }
                {type === 6 ? 
                 <p><i className='text-mute'>Answer to be submitted as an attachement</i></p>:""
                }
                {type === 7 ? 
                 <p><i className='text-mute'>Link to answer would be submitted</i></p>:""
                }
                </Col>
              </Row>
              <Row sm={12}>
                <FormGroup row className="container">
                <Label sm={3}>Points</Label>
                <Col sm={9}>
                  <Input
                    classname="form-control form-control-sm"
                    style={{height:25}}
                    name='points'
                    value={points}
                    type="number"
                    placeholder="1"
                    onChange={(e)=>setPoints(e.target.value)}
                    />
                </Col>
                </FormGroup>
              </Row>
            
            </CardBody>
              : ''}
            <CardFooter>

            <button className="btn btn-sm btn-icon btn-info" onClick={()=>setPage(1)}><i className='fa fa-question'></i></button>
            <button className="btn btn-sm btn-icon btn-inf" onClick={()=>setPage(2)}><i className='fa fa-alarm-plus'></i></button>
            <button className="btn btn-sm btn-icon btn-inf" onClick={()=>setPage(3)}><i className='fa fa-gearsj'></i></button>
              <Button color={editColor} onClick={id ? handleUpdate : handleSubmit}>{id ? 'Change' : 'Save' }</Button>{' '}
                { id ? <Button color="info" onClick={clearState}>Add New</Button> : null}
            </CardFooter>
          </Card>
        </Container>
          { page === 1 ? loadQuestions : ''}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={clearState}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    );
}
const mapStateToProps = (state, ownProps) => ({ 
    courses: state.courseReducer,
    coursematerials: state.coursematerialReducer,
  })
  
export default connect(mapStateToProps, { getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)

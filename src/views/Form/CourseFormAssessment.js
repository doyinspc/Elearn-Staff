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
import FormImage from './FormImage';
import FormTextx from './FormTextx';
import ShowImage from './../Table/ShowImage';
import { SERVER_URL } from 'actions/common';
import { callError } from 'actions/common';



const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [type, setType] = useState(0);
  const [instruction, setInstruction] = useState('');
  const [question, setQuestion] = useState('');
  const [optx, setOptx] = useState({});
  const [optxtype, setOptxtype] = useState({});
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState({});
  const [points, setPoints] = useState(1);
  const [qbank, setQbank] = useState({});
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState({});
  const [weight, setWeight] = useState(10);
  const [img, setImg] = useState(false);
  const [imgnum, setImgnum] = useState(null);
  const [imgtype, setImgtype] = useState(null);
  const [txt, setTxt] = useState(false);
  const [txtnum, setTxtnum] = useState(null);
  const [txttype, setTxttype] = useState(null);
  const [imgpic, setImgpic] = useState('');
  const [vidpic, setVidpic] = useState('');
  const [audpic, setAudpic] = useState('');
 /**
  * REMOVE ALL DATA
  * SET TO INITIAL STATE AND CLOSE
  */
  const resetdata = () =>{
    setId(null);
    setType(0);
    setQuestion([]);
    setInstruction('');
    setImgpic('');
    setAudpic('');
    setVidpic('');
    setOptx(['']);
    setOptxtype(['']);
    setAnswer([]);
    setPoints(1);
    props.handleClose();
  }
 /**
  * CLEAR FORM DATA SON NEW
  * DATA CAN BE ENTERED
  */
  const clearForm = () =>{
    setId(null);
    setType(0);
    setQuestion([]);
    setInstruction('');
    setImgpic('');
    setAudpic('');
    setVidpic('');
    setOptx(['']);
    setOptxtype(['']);
    setAnswer([]);
    setPoints(1);
  }
  /**
   * CLOSE THE MODAL
   */
  const toggle = () => setModal(false);
  /**
   * 
   * @param {*} rid 
   */
  const opts = (rid) => {
    setType(rid);
  }
  /**
   * ON LOAD
   * OPEN MODAL IF AND ID IS INCLUDES
   * @param {*} props.data
   * UPDATE THE STATE
   */
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setModal(true);     
    } 
    populate(props.data);
},[props.mid]);

/**
 * SET STATE FOR ADDITIONAL QUESTION ITEMS
 * @param {*} imgnum THE ID THAT IDENTIFIES THE IMAGE
 * @param {*} imgtype THE TYPE 1,2,3,4,5
 * 1 FORMAT QUESTION
 * 2 INPUT INTRUCTION
 * 3 INPUT IMAGE
 * 4 INPUT AUDIO
 * 5 INPUT VIDEO
 */
 const handleImage = (imgnum, imgtype) =>{
   switch (imgtype) 
   {
     case 1:
     case 2:
      setTxtnum(imgnum);
      setTxttype(imgtype);
      setTxt(true);
      break;
     case 3:
     case 4:
     case 5:
      setImgnum(imgnum);
      setImgtype(imgtype);
      setImg(true);
      break;
     default:
       break;
   }
 }
 /**
  * 
  * @param {*} data THE RESPONSE TEXT
  * @param {*} id THE QUESTION ID
  * @param {*} type THE QUESTION TYPE
  * IF THE type IS 1 SET STATE QUESTION : DATA
  * IF THE type IS 2 SET STATE INSTRUCTION : DATA
  */
 const textLoader = (data, id, type) =>{
   if(type === 1)
   {
      setQuestion(data);
   }else
   {
    setInstruction(data);
   }

 }
 /**
  * RESPONSE FOM IMGAGE
  * @param {*} url 
  * @param {*} id 
  * @param {*} type 
  * CLOSE THE MODAL
  */
 const imgLoader = (url, id, type) =>{
   setImg(false);
    /**
     * CONFIRM THE ID IF ITS FRO QUESTION OR OPTIONS
     * SET STATE
     */
    console.log(url, id, type);
     if(id === 'quest')
     {
       if(type === 3)
       {
        setImgpic(url);
        setImgnum(null)
       }
       else if(type === 4)
       {
        setAudpic(url);
        setImgnum(null)
       }
       else if(type === 5)
       {
        setVidpic(url);
        setImgnum(null)
       }
      
     }else
     {
       //set options
       let ops = {...optx};
       ops[id] = url;
       setOptx(ops);
       
       let opx = {...optxtype};
       opx[id] = 1;
       setOptxtype(opx);
     }

 }
 const handleSubmit = (e) =>{
   try{
        //GET TYPE
        let arr = {}
        //SET CONSTANTS
        arr['instruction'] = instruction;
        arr['question'] = question;
        arr['type'] = type;
        arr['points'] = points;
        arr['imgs'] = imgpic;
        arr['vids'] = vidpic;
        arr['auds'] = audpic;
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
        }else if(type === 6 || type === 7 || type === 8)
        {
          arr['answer'] = '';
        }else
        {
          throw 'Select Question type'
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
        let optionstype = optxtype;
        if(type === 1 || type === 2 )
        {
          let all_option_types = Object.keys(optionstype).map((prop, ind)=>{
            if(optionstype[prop] !== '' || optionstype[prop] !== null)
            {
              let ar_sub = [prop, optionstype[prop]];
              return ar_sub.join("::::");
            }    
          })
          let filter_all_option_types = all_option_types.filter(row=>row !== '' || row !== null);
          arr['optionstype'] = filter_all_option_types.join("::::::");
        }else
        {
          arr['optionstype'] = '';
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
      }catch(err)
      {
        callError();
      }
  }
 const handleUpdate = (e) =>{
    //GET TYPE
  try{
    let arr = {}
    arr['instruction'] = instruction;
    arr['question'] = question;
    arr['type'] = type;
    arr['points'] = points;
    arr['imgs'] = imgpic;
    arr['vids'] = vidpic;
    arr['auds'] = audpic;

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
    let optionstype = optxtype;
        if(type === 1 || type === 2 )
        {
          let all_option_types = Object.keys(optionstype).map((prop, ind)=>{
            if(optionstype[prop] !== '' || optionstype[prop] !== null)
            {
              let ar_sub = [prop, optionstype[prop]];
              return ar_sub.join("::::");
            }    
          })
          let filter_all_option_types = all_option_types.filter(row=>row !== '' || row !== null);
          arr['optionstype'] = filter_all_option_types.join("::::::");
        }else
        {
          arr['optionstype'] = '';
        }
    //STORE
    let all = qbank && Array.isArray(Object.keys(qbank)) ? {...qbank} : {};
    all[id] = arr;
    setQbank(all);
    props.updateCoursematerial({'question':JSON.stringify(all)}, props.id);
    clearForm();
  }catch(err)
    {
      callError(err);
    }
  }
  //ADD SPACE FOR NEW OPTION
 const addOption = (e) =>{
    e.preventDefault();
    let rand = Math.floor(Math.random() * 1234567)
    let ops = {...optx};
    ops['d' + rand] = '';
    setOptx(ops);
    let opx = {...optxtype};
    opx['d' + rand] = 0;
    setOptxtype(opx);
  }

  //REMOVE SPACE AND OPTION ITEM
  const removeOption = indx =>{
    try{
    let ed = {...optx};
    let edx = {...optxtype};
    delete ed[indx];
    delete edx[indx];
    setOptx(ed);
    setOptxtype(edx);
    }catch(err)
    {
      callError(err);
    }
  }
  //CHANGE VALUE
  const handleChange = (data, ind) =>{
    try{
      let ed = {...optx}
      ed[ind] = data;
      setOptx(ed);  
    }catch(err)
    {
      callError(err);
    }
  }
  //SET ANSWER
  const handleChangeAnswer = (data, st, ind) =>{
    try{
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
    }catch(err)
    {
      callError(err);
    }
  
  }
  const setEditQuestion = indx =>{
    try{
      let ed = qbank && Array.isArray(Object.keys(qbank)) && Object.keys(qbank).length > 0 ? {...qbank} : {};
      let eds = ed[indx];
      console.log(indx, ed[indx])
      if(eds && Object.keys(eds).length > 0 )
      { 
        let ops = eds.options ? eds.options.split('::::::') :[];
        let opstype = eds.optionstype ? eds.optionstype.split('::::::') :[];
        let ans = "";
        let opx = {};
        let opxtype = {};
        
        if(parseInt(eds.type) === 1 || parseInt(eds.type) === 2 || parseInt(eds.type) === 3)
        {
            opx ={}; 
            for(let row of ops)
            {
                let r = row.split("::::");
                opx[r[0]] = r[1];
            }
            setOptx(opx);
            
            if(eds.type === 1 ||  eds.type === 2)
            {
              ans = eds.answer ? eds.answer.split('::::::') :[];
            }else{
              ans = opx;
            }
            
        }else
        {
            ans = eds.answer;
        }
        if(parseInt(eds.type) === 1 || parseInt(eds.type) === 2 )
        {
            opxtype ={}; 
            for(let row of opstype)
            {
                let r = row.split("::::");
                opxtype[r[0]] = r[1];
            }
            setOptxtype(opxtype); 
        }
        setId(indx);
        setInstruction(eds.instruction);
        setQuestion(eds.question);
        setType(parseInt(eds.type));
        setPoints(eds.points);
        setAnswer(ans);
        setAnswers(ans);
        setImgpic(eds.imgs);
        setAudpic(eds.auds);
        setVidpic(eds.vids);
        
      }
  }catch(err)
  {
    callError(err);
  }
  }
  const setDeleteQuestion = indx =>{
    try{
      let ed = qbank && Array.isArray(Object.keys(qbank)) && Object.keys(qbank).length > 0 ? {...qbank} : {};
      let sd = settings && Array.isArray(Object.keys(settings)) && Object.keys(settings).length > 0 ? {...settings} : {};

      delete ed[indx];
      delete sd[indx];

      setQbank(ed);
      setSettings(sd);

      props.updateCoursematerial({'question':JSON.stringify(ed), 'settings':JSON.stringify(sd)}, props.id);
    }catch(err)
    {
      callError(err);
    }
  }
  const handleSave =() =>{
  }
  const handleSubmitSettings = (name, value) => {
   try{
      let sts = settings;
      sts[name] = value;
      setSettings(sts);
      props.updateCoursematerial({'settings':JSON.stringify(sts)}, props.id);
   }catch(err)
   {
     callError(err);
   }
        
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
  loadOptx =  optx && Array.isArray(Object.keys(optx)) && Object.keys(optx).length > 0 ? Object.keys(optx).map((rw, index)=>{
    let res = answer && Array.isArray(answers) && answers.includes(rw) ? true : false;
    //console.log(rw, optx[rw], optxtype[rw]);
    return <CardFitbForm 
                  key={`ab_${rw}`} 
                  index={rw} 
                  num={type}
                  val={res}
                  data={optx[rw]}
                  datatype={optxtype[rw]}
                  handleImg={handleImage}
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
    let res = answer && Array.isArray(answers) && answers.includes(index) ? true : false;  
    return <CardFitbForm1 
                  key={`abd_${index}`} 
                  index={index} 
                  num={type}
                  val={res}
                  data={optx[index]}
                  datatype={optxtype[index]}
                  handleImg={handleImage}
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
  let essay_array = [4, 5, 6, 7];
  let editColor = 'primary';
  let objec = qbank && Array.isArray(Object.keys(qbank)) ? Object.keys(qbank).map((prop, ind)=>{
    let rw = qbank[prop] && qbank[prop] !== undefined ? qbank[prop] : {} 
     if(multichoice_array.includes(parseInt(rw.type)))
     {
        return rw;
     }
  }): [];
  let essay = [];
  for(let prop in qbank)
  {
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
  return (
    <div>
      {img ?
       <FormImage
        mid={imgnum}
        type={imgtype}
        st={img}
        getlink={(url, num)=>imgLoader(url, imgnum, imgtype)}
        handleClose={()=>setImg(false)}
        />:''
      }
      {txt ?
       <FormTextx
        mid={txtnum}
        type={txttype}
        val={txttype === 1 ? question : instruction }
        st={txt}
        getlink={(data, num)=>textLoader(data, num, txttype)}
        handleClose={()=>setTxt(false)}
        />:''
      }
      <Modal isOpen={modal} toggle={toggle}  keyboard='false' backdrop='static' contentClassName={{width:'800px', height:400}} >
        <ModalHeader toggle={resetdata}>Assessments</ModalHeader>
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
                    return  <CardQuestionSettings
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
            {page  === 1 ?
            <CardBody >
              <Row className='m-0 p-0 h-50'>
                    <Col xs='2'><a onClick={()=>handleImage('quest', 1)}><i className="fa fa-expand text-primary"></i></a></Col>
                    <Col xs='2'><a onClick={()=>handleImage('quest', 2)}><i className="fa fa-dedent text-primary"></i></a></Col>
                    <Col xs='2'><a onClick={()=>handleImage('quest', 3)}><i className="fa fa-image text-primary"></i></a></Col>
                    <Col xs='2'><a onClick={()=>handleImage('quest', 4)}><i className="fa fa-volume-up text-primary"></i></a></Col>
                    <Col xs='2'><a onClick={()=>handleImage('quest', 5)}><i className="fa fa-video text-primary"></i></a></Col>
                    <Col></Col>
              </Row>
              {instruction && instruction.length > 0 ?
              <Row className='m-0 p-0 bg-grey' style={{border:"2px solid #000"}} >
                <div  dangerouslySetInnerHTML={{__html: instruction}} />
              
              </Row>:''}
              <Row className='m-0 p-0 h-50'>
                <Col sm={12}>
                  <Input
                    name={question}
                    value={question}
                    type="textarea"
                    row={15}
                    col={15}
                    placeholder="What is your question?"
                    onChange={(e)=>setQuestion(e.target.value)}
                    />
                </Col>
              </Row>
              
              {imgpic && imgpic !== null && imgpic.length > 0 ?
              <Row xs='12' className='m-1 p-1'>
               <ShowImage
                  path={SERVER_URL + imgpic}
                  type={1}
              />
              </Row>
               :''}
               {audpic && audpic !== null && audpic.length > 0 ?
              <Row xs='12' className='m-1 p-1'>
               <ShowImage
                  path={SERVER_URL + audpic}
                  type={2}
              />
              </Row>
               :''}
              {vidpic && vidpic !== null && vidpic.length > 0 ?
              <Row xs='12' className='m-1 p-1'>
               <ShowImage
                  path={SERVER_URL + vidpic}
                  type={3}
              />
              </Row>
               :''}
              <Row>
                <Col>
                  <div className="btn-group dropdown">
                    <button className="btn btn-secondary dropdown-toggle btn-primary btn-sm btn-block" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-plus"></i> Choose answer type
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{zIndex:201}}>
                        <a className="dropdown-item" href="#" onClick={()=>opts(1)}><i className='fa fa-question'></i> Multichoice (Single Answer)</a>
                        <a className="dropdown-item" href="#" onClick={()=>opts(2)}><i className='fa fa-question'></i> Multichoice (Multiple Answer)</a>
                        <a className="dropdown-item" href="#" onClick={()=>opts(3)}><i className='fa fa-question'></i> Fill in the blank</a>
                        <a className="dropdown-item" href="#" onClick={()=>opts(4)}><i className='fa fa-question'></i> Short Text Answer</a>
                        <a className="dropdown-item" href="#" onClick={()=>opts(5)}><i className="fa fa-question" ></i> Long Text Answer</a>
                        <a className="dropdown-item" href="#" onClick={()=>opts(6)}><i className='fa fa-attachment'></i> Upload Answer</a>
                        <a className="dropdown-item" href="#" onClick={()=>opts(7)}><i className='fa fa-link'></i> Post Link</a>   
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
                    <a href="#" className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-primary" onClick={addOption}><i className="fa fa-plus"></i></a>
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
                 <p><i className='text-mute'>Answer to be submitted as an attachment</i></p>:""
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
                    className="form-control form-control-sm"
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
            <Button color="info" className='pull-left' onClick={resetdata}>Close</Button> {" "}
            <button className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger" onClick={()=>setPage(1)}><i className='fa fa-dedent'></i></button>
            <button className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger" onClick={()=>setPage(2)}><i className='fa fa-clock-o'></i></button>
            <button className="btn  mx-1 mb-1 btn-round btn-raised btn-icon btn-outline-danger" onClick={()=>setPage(3)}><i className='fa fa-gears'></i></button>
              <Button color={editColor} onClick={id ? handleUpdate : handleSubmit}>{id ? 'Change' : 'Save' }</Button>{' '}
                { id ? <Button color="info" onClick={clearForm}>Add New</Button> : null}
                
            </CardFooter>
          </Card>
        </Container>
          { page === 1 ? loadQuestions : ''}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetdata}>Cancel</Button>
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

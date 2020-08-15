import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from '../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Container, Table } from 'reactstrap';
import axios from 'axios';
import { MAIN_TOKEN, API_PATHS, axiosConfig } from './../../actions/common';
const path = API_PATHS;

const pics = {
  1 : 'fa-file-text',
  2 : 'fa-file-pdf',
  3 : 'fa-file-image',
  4 : 'fa-file-video',
  5 : 'fa-file-audio',
  6 : 'fa-youtube',
  7 : 'fa-link',
  8 : 'fa-comment',
  9 : 'fa-question',
  10 : 'fa-file-text'
}
const Modals = (props) => {
  
  const [modal, setModal] = useState(props.st);
  const [id, setId] = useState(null);
  const [module, setModule] = useState({});
  const [material, setMaterial] = useState({});
  const [score, setScore] = useState({});
  
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setId(props.mid);
     setModal(true);
    } 
 
    //GET MODULES
    let params1 = {
        data:JSON.stringify({'courseId': props.mid}),
        cat:'select',
        table:'course_modules',
        token:MAIN_TOKEN
      }
      //GET ALL SAVED MODULES FOR THE COURSE
      let params2 = {
        data:JSON.stringify({'courseId' : props.mid}),
        cat:'selectmodule',
        table:'course_materials',
        token:MAIN_TOKEN
      }

      //GET ALL SAVED MODULES FOR THE COURSE
      let params3 = {
        data:JSON.stringify({'studentId':props.user.id,'courseId' : props.mid}),
        cat:'selectscorereport',
        table:'course_scores',
        token:MAIN_TOKEN
      }
      console.log(params3)
      //GET BOTH REQUEST FILTER AND RETURN UNUSED MODELS
      let requestOne = axios.get(path, {params:params1}, axiosConfig); // GET MODULES  FOR THE COURSE
      let requestTwo = axios.get(path, {params:params2}, axiosConfig); // GET MATERIALS FOR ALL MODULES FOR THE COURSE
      let requestThree = axios.get(path, {params:params3}, axiosConfig); // GET SCORES FOR ALL MATERIALS FOR ALL MODULES FOR THE COURSE
      axios.all([requestOne, requestTwo, requestThree])
      .then(axios.spread(async (...responses)=>{
          const res0 = responses[0]; //all modules
          const res1 = responses[1]; //used material
          const res2 = responses[2]; //used scores
          
          return[res0.data, res1.data, res2.data];     
      }))
      .then(res=>{
        let modl = {};
        let mat = {};
        let sco = {};
        for(let element in res[0]){
          let ar = {};
          let prop = res[0][element];
          ar['modulename'] = prop.modulename;
          ar['title'] = prop.title;
          ar['weight'] = prop.weight;
           modl[prop.id] = ar;
          }
          
        for(let element in res[2]){
                let prop = res[2][element];
                if(prop.mid in Object.keys(sco))
                {
                      sco[prop.mid][prop.qid] = prop.score; 
                }else
                {
                      sco[prop.mid] = {}
                      sco[prop.mid][prop.qid] = prop.score;
                }
          }

        for(let element in res[1])
        {
            let prop = res[1][element];
            let ar = {};
            ar['materialname'] = prop.title;
            ar['weight'] = prop.weight;
            ar['materialId'] = prop.mid;
            ar['points'] = {};

            let que = prop.question && prop.question !== null ? JSON.parse(prop.question):{};
            
            //GET ALL POINTS OBJ AND ESSAY 
            let obj_array = [1, 2, 3];
            let ess_array = [4, 5, 6, 7];
            let total_obj = [];
            
            for(let pr in que)
            {
               let rw = que[pr] && que[pr] !== undefined ? que[pr] : {} ;
               
                if(ess_array.includes(parseInt(rw.type)))
                {
                    ar['points'][pr] = rw.points;
                }else if(obj_array.includes(parseInt(rw.type)))
                {
                    total_obj.push(parseInt(rw.points));
                }
            };
            ar['points']['multi'] = total_obj.reduce((a, b)=>a + b, 0);
            
           if(prop.mid in Object.keys(mat))
            {
                mat[prop.mid][prop.id] = ar; 
            }else
            {
                mat[prop.mid] = {}
                mat[prop.mid][prop.id] = ar;
            } 

            console.log(ar)
          }
         

            console.log(modl);
            console.log(mat);
            console.log(sco);
            setModule(modl);
            setMaterial(mat);
            setScore(sco);
      })
      .catch(err=>{
          console.log(JSON.stringify(err));
      })
  },[props.mid]);

  let tabb = Object.keys(module).map((prop, ind)=>{ 
    let tds =<tr keys={ind}>
                <td colspan='5'>
                    {module[prop]}tg
                </td>
             </tr>;
    return (material[prop] && typeof material[prop] === 'object' && Object.keys(material[prop]) !== null ? 
                Object.keys(material[prop]).map((prop1, ind1)=>{
                let multi_check =  material[prop][prop1]['points']['multi'];
                let multi_score = multi_check && multi_check !== null && multi_check !== undefined ? multi_check : null;
                let f_row = '';
                console.log(material[prop][prop1]['materialname']);
                let row_span = Object.keys(material[prop][prop1]['points']).length;
                console.log(material[prop][prop1]['points'], row_span);
                if(row_span === 0){
                    return  <tr><td>1</td><td rowspan={1}>{material[prop][prop1]['materialname']}</td><td>--</td><td>--</td><td>--</td></tr>
                }else{
                    if(multi_score !== null)
                    {
                        //MAX SCORE
                        //GET STUDENT SCORE
                        let s = prop1 instanceof score && typeof score[prop1] === 'object' && 'multi' instanceof score[prop1] ? score[prop1]['multi'] : 0;
                        let sc = s * multi_score;
                        f_row = <><td>2</td><td>{'OBJ'}</td><td>{multi_score}</td><td>{sc}</td></>;
                    } 
                    return <tr keys={ind1}>
                        <td rowspan={row_span}>{material[prop][prop1]['materialname']}</td>
                        {f_row}
                        {Object.keys(material[prop][prop1]['points'])
                        .map((prop2, ind2)=>{
                            let ess_check =  material[prop][prop1]['points'][prop2];
                            let ess_score = ess_check && ess_check !== null && ess_check !== undefined ? ess_check : null;
                            let s_row = '';
                            if(ess_score !== null)
                            {
                                //MAX SCORE
                                //GET STUDENT SCORE
                                let s = prop1 instanceof score && typeof score[prop1] === 'object' && prop2 instanceof score[prop1] ? score[prop1]['ess'] : 0;
                                let sc = s * ess_score;
                                s_row = <><td>{`ESS${ind2 + 1}`}</td><td>{ess_score}</td><td>{sc}</td></>;
                            }
                            return s_row;
                        })}
                      </tr>
                }
            }) : '')
    let tfs = <tr>
                <td>SN</td>
                <td>SUMMARY</td>
                <td>SUM</td>
                <td>-'-</td>
                <td></td>
              </tr>

    return tds  + tfs;
  })
  

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop='static' keyboard={false} >
        <ModalHeader toggle={toggle}>
            <i className={`fa fa-file`}></i>{props.user.fullname}
        </ModalHeader>
        <ModalBody>
          <Container>
           <Row sm={12} >
               <table className='tablex table-xbordered' border='2px #000000' width='100%'>
                   <thead >
                    <tr style={{fontSize:'0.9em'}}>
                        <th>SN</th>
                        <th>LESSON MATERIAL</th>
                        <th>TYPE</th>
                        <th>PTS</th>
                        <th>SCR</th>
                    </tr>
                   </thead>
                   <tbody>
                        {tabb}
                   </tbody>
               </table>
           </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({ 
    courses: state.courseReducer,
    coursematerials: state.coursematerialReducer,
    user:state.userstudentReducer.user
  })
  
export default connect(mapStateToProps, { getCoursematerials, getCoursematerial, registerCoursematerial, updateCoursematerial })(Modals)
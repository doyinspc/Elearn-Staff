import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursematerials,getCoursematerial, registerCoursematerial, updateCoursematerial } from '../../actions/coursematerial';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Container, Table } from 'reactstrap';
import axios from 'axios';
import ReactToPdf from 'react-to-pdf';
import { MAIN_TOKEN, API_PATHS, axiosConfig } from './../../actions/common';
const path = API_PATHS;


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [module, setModule] = useState({});
  const [material, setMaterial] = useState({});
  const [score, setScore] = useState({});
  
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
    if(parseInt(props.mid) > 0 && props.st ===true )
    {
     setId(props.mid);
     setModal(true);
    } 
 
    //GET MODULES
    let params1 = {
        data:JSON.stringify({'courseId': props.courseId}),
        cat:'select',
        table:'course_modules',
        token:MAIN_TOKEN
      }
      //GET ALL SAVED MODULES FOR THE COURSE
      let params2 = {
        data:JSON.stringify({'courseId' : props.courseId}),
        cat:'selectmodule',
        table:'course_materials',
        token:MAIN_TOKEN
      }

      //GET ALL SAVED MODULES FOR THE COURSE
      let params3 = {
        data:JSON.stringify({'studentId':props.studentId,'courseId' : props.courseId}),
        cat:'selectscorereport',
        table:'course_scores',
        token:MAIN_TOKEN
      }
     
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

        for(let element in res[0])
        {
           let ar = {};
           let prop = res[0][element];
           ar['modulename'] = prop.modulename;
           ar['title'] = prop.title;
           ar['weight'] = prop.weight;
           modl[parseInt(prop.id)] = ar;
        }
        
        for(let element in res[2])
        {
            let prop = res[2][element];
            if(Object.keys(sco).includes(prop.mid))
            {
                  sco[parseInt(prop.mid)][prop.qid] = prop.score; 
            }else
            {
                  sco[parseInt(prop.mid)] = {}
                  sco[parseInt(prop.mid)][prop.qid] = prop.score;
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
            
           if(Object.keys(mat).includes(prop.mid))
            {
                mat[parseInt(prop.mid)][prop.id] = ar; 
            }else
            {
                mat[parseInt(prop.mid)] = {}
                mat[parseInt(prop.mid)][prop.id] = ar;
            } 

          }
      
            setModule(modl);
            setMaterial(mat);
            setScore(sco);
      })
      .catch(err=>{
          console.log(JSON.stringify(err));
      })
  },[props.mid]);
   
  let summing = (arr) =>{
    let ar = arr.reduce((a, b)=> a + b, 0);
    return Number(ar).toFixed(1)
  }

  let computScore = (points, scores, weight) =>{
    let total_points = points && Array.isArray(points) ? summing(points) : 0;
    let total_scores = scores && Array.isArray(scores) ? summing(scores) : 0;
    if(total_points === 0 || total_scores === 0 || weight === 0 )
    {
      return 0;
    }else
    {
      return (total_scores/total_points) * weight;
    }


  }

  let tabb = Object.keys(module).map((prop, ind)=>{ 
    let sum_score = [];
    let sum_point = [];
    let num =  0;
   
    return (<table className='tablex table-xbordered' style={{fontFamily: 'Advent Pro', fontStyle:'sans-serif'}} border='2px #000000' width='100%'>
           <thead>
              <tr keys={ind}>
                <td colspan='5'>
                    {`${module[prop].modulename} : ${module[prop].title}`}
                </td>
             </tr>
             <tr style={{fontSize:'0.9em'}}>
                 <th>SN</th>
                 <th>LESSON MATERIAL</th>
                 <th>TYPE</th>
                 <th>PTS</th>
                 <th>SCR</th>
             </tr>
             </thead >
            <tbody>
            
            {material[prop] && typeof material[prop] === 'object' && Object.keys(material[prop]) !== null ? 
            Object.keys(material[prop]).map((prop1, ind1)=>{              
              let multi_check =  material[prop][prop1]['points']['multi'];
              //MATERIAL NAME 
              let matname = material[prop][prop1]['materialname'];
              //MATERIAL NAME 
              //CONFIRM IF THE MATERIAL HAS QUESTIONS 
              let row_span = Object.keys(material[prop][prop1]['points']).length;
              //IF THE ROW IS AVAILABLE
              if(row_span !== 0)
              {
                //GO OVER THE POINTS
                return Object.keys(material[prop][prop1]['points'])
                .map((prop2, ind2)=>{ 
                  /**
                   * prop2 QUESTION GROUP
                   * GET SCORE
                   */
                  
                  let ess_check =  material[prop][prop1]['points'][prop2];
                  let ess_score = ess_check && ess_check !== 'null' && ess_check !== undefined && parseInt(ess_check) > 0 && ess_check !== null ? ess_check : null;
                  
                  let s = prop1 in score && typeof score[prop1] === 'object' && prop2 in score[prop1] ? score[prop1][prop2] : 0;
                  let sc = s * ess_score;
                  if(ess_score !== 'NaN' || ess_score !== null ){ sum_point.push(parseInt(ess_score))}
                  sum_score.push(parseFloat(sc));
                 return  <tr keys={ind1}>
                    <td>{num + 1}</td>
                    <td>{matname}</td>
                      {
                      ess_score !== null?
                      <><td>{prop2 === 'multi' ? 'OBJ':`ESS${ind2 + 1}`}</td><td className='align-left'>{Number(ess_score).toFixed(1)}</td><td className='align-left'>{Number(sc).toFixed(1)}</td></>
                      :<><td>{prop2 === 'multi' ? 'OBJ':`ESS${ind2 + 1}`}</td><td>-.-</td><td>-.-</td></>
                      }
                  </tr>
                })
              }
            }):''}
             </tbody>
             {console.log(sum_point)}
             <tfoot>
              <tr>
                  <td>SN</td>
                  <td>SUMMARY</td>
                  <td>SUM</td>
                  <td>{summing(sum_point)}</td>
                  <td>{summing(sum_score)}</td>
                </tr>
                <tr>
                  <td>SN</td>
                  <td>SUB-TOTAL</td>
                  <td>AGG</td>
                  <td>{module[prop].weight}</td>
                  <td>{computScore(sum_point, sum_score, module[prop].weight)}</td>
                </tr>
             </tfoot>
            </table>)
            }) ;
            
const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [4,2]
};


  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop='static' keyboard={false}  >
        <ModalHeader toggle={toggle}>
            <i className={`fa fa-file`}></i>{props.user.fullname}
        </ModalHeader>
        <ModalBody >
          <div ref={ref} style={{background: 'white'}}>
            <Container>
              <Row xs='12'>
              <h5 style={{fontSize:'1.2em'}}>{process.env.REACT_APP_WEBSITE_NAME}</h5>
              </Row>
              <Row xs='12'>
              <h6>{props.data.fullname}</h6>
              </Row>
            </Container>
          <Container>
           <Row sm={12} >
                {tabb}
           </Row>
          </Container>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <ReactToPdf targetRef={ref} filename="div-blue.pdf" options={options} x={.5} y={.5}>
            {({toPdf}) => (
                <button onClick={toPdf}>Generate pdf</button>
            )}
        </ReactToPdf>
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
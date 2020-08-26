
import React from "react";

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      id:null,
      
    }
  }
  

  render() {
     
    return (
      <>
         <tr>
          <td>Dakota Rice</td>
          <td>Niger</td>
          <td>Oud-Turnhout</td>
          <td className="text-right">$36,738</td>
        </tr>
      </>
    );
  }
}


export default Course
import React from "react";
import { Table } from "reactstrap";
import { thead, tbody } from "variables/general";

class RegularTables extends React.Component {

  render() {
    let { thead, tbody } = this.props.datas;
    let th = thead ? thead.map((prop, key) => {
            <th key={key} className="text-right"> {prop}</th>
            }) : null;

    let tb = tbody ? tbody.map((item, key) => {
                <tr key={key} >
                    <td className="text-right"> {item.name} </td>
                    <td className="text-right"> {item.abbrv} </td>
                </tr>
            }) : null;

    return (
      <>
        <Table responsive>
            <thead className="text-primary">
                <tr>{th}</tr>
            </thead>
            <tbody>{tb}</tbody>
        </Table>        
      </>
    );
  }
}

export default RegularTables;

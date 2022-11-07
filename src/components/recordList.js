import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const port = "8080";

const Record = (props) => (
 <tr>
  <td>{props.record.datetime}</td>
   <td>{props.record.tiredness}</td>
   <td>{props.record.heartbeet}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}  style={{color: "rgb(75, 192, 192)"}}>Edit</Link> |
     <button className="btn btn-link"  style={{color: "rgba(255, 99, 132)"}}
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:`+port+`/record/`);
    console.log(response);
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:${port}/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div style={{padding: "50px", paddingInline: "200px", backgroundColor: "#eee"}}>
     <h1>Record List</h1>
     <Card style={{paddingInline: "50px"}}>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tiredness</th>
            <th>Heartbeat</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
     </Card>
   </div>
 );
}
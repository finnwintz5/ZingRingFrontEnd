import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieGraph from "./PieGraph";
import LineGraph from "./LineGraph";

const Display = () => {
    const [records, setRecords] = useState([]);
    // This method fetches the records from the database.
    // console.log("yuh");
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);
            console.log(response);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
            console.log(records);
        }
        getRecords();
        return;
  }, [records.length]);
      return (
        <div>
          <h3>Record List</h3>
          <PieGraph records={records}/>
          <LineGraph records={records}/>
        </div>
      );
}
 
// export default function RecordList() {
//  const [records, setRecords] = useState([]);
 
//  // This method will map out the records on the table
//  function recordList() {
//    return records.map((record) => {
//      return (
//        <Record
//          record={record}
//          deleteRecord={() => deleteRecord(record._id)}
//          key={record._id}
//        />
//      );
//    });
//  }
// }

export default Display;
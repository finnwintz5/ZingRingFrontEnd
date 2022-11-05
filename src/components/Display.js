import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieGraph from "./PieGraph";
import LineGraph from "./LineGraph";

const Display = () => {
    const [records, setRecords] = useState([]);
    // This method fetches the records from the database.
    // console.log("yuh");
    const port = "5000";
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
            console.log(records);
        }
        getRecords();
        return;
  }, [records.length]);
      return (
        <div>
          <h3>Record List</h3>
          <PieGraph records={records}/>
          <LineGraph records={records} timeMin={'2022-10-31T18:20:53.292Z'} timeMax={'2022-10-31T18:38:59.777Z'}/>
          <LineGraph records={records} timeMin={'2022-10-31T18:12:02.984Z'}/>
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
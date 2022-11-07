import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import BothCharts from "./BothCharts";
import './style/display.css';
import format from "date-fns/format";
import parse from "date-fns/parse";


const Display = () => {
    const [records, setRecords] = useState([]);
    const [latestTime, setLatestTime] = useState(null);
    const [latestTiredness, setLatestTiredness] = useState("");
    const [latestHearbeat, setLatestHearbeat] = useState("");
    const [last, setLast] = useState(null);
    const port = "5000";

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:`+port+`/record/`);
            //console.log(response);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
            console.log(records[records.length-1]);
            setLatestHearbeat(records[records.length-1].heartbeet);
            setLatestTiredness(records[records.length-1].tiredness);
            setLast(records[records.length-1].datetime);
            const dateString = records[records.length-1];
            const date = parse(dateString, 'yyyyMMddHHmmss', new Date())
            setLatestTime(date);
            console.log(records);
        }
        getRecords();
        return;
  }, [records.length]);

      return (
        <div style={{padding: "50px", paddingInline: "200px", backgroundColor: "#eee"}}>
          <h1>Current Data</h1>
          <Container>
            {/* <p style={{color: "#999"}}>Last Measured: {latestTime === null ? "" : format(latestTime, 'EEEE, MMMM do, yyyy hh:mm a')}</p> */}
            <Row>
              <Col sm={3}>
                <Card style={{padding: "30px"}}>
                  <Card.Title>Tiredness</Card.Title>
                  <Card.Text>{latestTiredness ? "True" : "False"}</Card.Text>
                </Card>
              </Col>
              <Col sm={3}>
                <Card style={{padding: "30px"}}>
                  <Card.Title>Hearbeat (BPM)</Card.Title>
                  <Card.Text>{latestHearbeat}</Card.Text>
                </Card>
              </Col>
            </Row>
          </Container>
          <h1>Graphs</h1>
          <Container>
            <BothCharts records={records} timeMin={'2022-10-31T18:20:53.292Z'} timeMax={'2022-10-31T18:38:59.777Z'} range="Last Week: "/>
            <BothCharts records={records} timeMin={'2022-10-31T18:20:53.292Z'} timeMax={last} range="Last Month: "/>
            <BothCharts records={records} timeMin={'2022-10-25T15:59:51.214Z'} timeMax={last} range="All Time: "/>
        </Container>
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
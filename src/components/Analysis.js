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
    const [latestHeartbeat, setLatestHeartbeat] = useState("");
    const [last, setLast] = useState(null);
    const port = "8080";

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
            setLatestHeartbeat(records[records.length-1].heartbeet);
            setLatestTiredness(records[records.length-1].tiredness);
            setLast(String(records[records.length-1].datetime));
            const dateString = records[records.length-1].datetime;
            const date = parse(dateString, 'yyyyMMddHHmmss', new Date());
            setLatestTime(date);
            //console.log(date);
        }
        getRecords();
        return;
  }, [records.length]);

      return (
        <div style={{padding: "50px", paddingInline: "200px", backgroundColor: "#eee"}}>
          <h1>Current Data</h1>
          <Container>
            <p style={{color: "#999"}}>Last Measured: {latestTime === null ? "" : format(latestTime, 'EEEE, MMMM do, yyyy hh:mm a')}</p>
            <Row>
              <Col sm={3}>
                <Card style={{padding: "30px"}}>
                  <Card.Title>Tiredness</Card.Title>
                  <Card.Text>{latestTiredness}</Card.Text>
                </Card>
              </Col>
              <Col sm={3}>
                <Card style={{padding: "30px"}}>
                  <Card.Title>Hearbeat (BPM)</Card.Title>
                  <Card.Text>{latestHeartbeat}</Card.Text>
                </Card>
              </Col>
            </Row>
          </Container>
          <h1>Graphs</h1>
          <Container>
            <BothCharts records={records} range="Day"/>
            <BothCharts records={records} range="Week"/>
            <BothCharts records={records} range="Month"/>
            <BothCharts records={records} range="Year"/>
            <BothCharts records={records} range="All"/>
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
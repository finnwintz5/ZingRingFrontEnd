import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import PieGraph from "./PieGraph";
import LineGraph from "./LineGraph";
import './style/display.css';

const Display = () => {
    const [records, setRecords] = useState([]);
    const [latestTime, setLatestTime] = useState("");
    const [latestTiredness, setLatestTiredness] = useState("");
    const [latestHearbeat, setLatestHearbeat] = useState("");
    const port = "8080";

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
            console.log(records[records.length-1]);
            setLatestTime(records[records.length-1]._id);
            setLatestHearbeat(records[records.length-1].heartbeet);
            setLatestTiredness(records[records.length-1].tiredness);
        }
        getRecords();
        return;
  }, [records.length]);

      return (
        <div style={{padding: "50px", paddingInline: "200px", backgroundColor: "#eee"}}>
          <h1>Current Data</h1>
          <Container>
            <p style={{color: "#999"}}>Last Measured: {latestTime}</p>
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
            <Row>
              <Col sm={8}>
                <Card className="graph-card">
                  <LineGraph records={records} timeMin={'2022-10-31T18:20:53.292Z'} timeMax={'2022-10-31T18:38:59.777Z'}/>
                </Card>
                <Card className="graph-card">
                  <LineGraph records={records} timeMin={'2022-10-31T18:12:02.984Z'}/>
                </Card>
                <Card className="graph-card">
                  <LineGraph records={records}/>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="graph-card">
                  <PieGraph records={records}/>
                </Card>
                <Card className="graph-card">
                  <PieGraph records={records}/>
                </Card>
                <Card className="graph-card">
                  <PieGraph records={records}/>
                </Card>
              </Col>
            </Row>
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
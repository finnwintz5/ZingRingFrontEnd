import PieGraph from "./PieGraph";
import LineGraph from "./LineGraph";
import { Row, Col, Card } from 'react-bootstrap';
import './style/display.css';
import format from "date-fns/format";
import parse from "date-fns/parse";

const BothCharts = ({records, timeMin, timeMax, range}) => {
    // const formatDate = (rawDate) => {
    //     if(rawDate !== null){
    //         const date = parse(rawDate, 'yyyyMMddHHmmss', new Date());
    //         return format(date, 'MMMM do, hh:mm a');
    //     }
    // }

    return(
        <Card className="graph-card" style={{textAlign: "center"}}>
            {/* <p style={{paddingTop: "20px"}}>{range+"["+formatDate(timeMin)+"] to ["+formatDate(timeMax)+"]"}</p> */}
            <Row>
                <Col sm={8}>
                        {/* <LineGraph records={records} timeMin={timeMin} timeMax={timeMax}/> */}
                </Col>
                <Col sm={4}>
                        <PieGraph records={records} timeMin={timeMin} timeMax={timeMax}/>
                </Col>
            </Row>
        </Card>
    );
}

export default BothCharts;
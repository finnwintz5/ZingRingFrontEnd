import PieGraph from "./PieGraph";
import LineGraph from "./LineGraph";
import { Row, Col, Card } from 'react-bootstrap';
import './style/display.css';
import format from "date-fns/format";
import parse from "date-fns/parse";

const BothCharts = ({records, timeMin, timeMax, range}) => {
    const formatDate = (rawDate) => {
        if(rawDate !== null){
            const dateString = rawDate.substring(0,10) +" "+ rawDate.substring(11,19);
            const date = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
            return format(date, 'MMMM do, hh:mm a');
        }
    }

    return(
        <Card className="graph-card" style={{textAlign: "center"}}>
            <p style={{paddingTop: "20px"}}>{range+"["+formatDate(timeMin)+"] to ["+formatDate(timeMax)+"]"}</p>
            <Row>
                <Col sm={8}>
                        <LineGraph records={records} timeMin={timeMin} timeMax={timeMax}/>
                </Col>
                <Col sm={4}>
                        <PieGraph records={records} timeMin={timeMin} timeMax={timeMax}/>
                </Col>
            </Row>
        </Card>
    );
}

export default BothCharts;
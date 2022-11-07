import PieGraph from "./GraphPie";
import LineGraph from "./GraphLine";
import { Row, Col, Card } from 'react-bootstrap';
import './style/display.css';
import format from "date-fns/format";
import parse from "date-fns/parse";


function prop_len(str) {
    let temp=str.toString();
    if (temp.length==1) {
      return "0"+temp;
    }
    return temp;
  }
  
  function month_day(day,month,days_sub) {
    if (days_sub>=day) {
      month-=1;
      day=31-(days_sub-day);
    } else {
      day-=days_sub;
    }
    return (prop_len(month)+prop_len(day));
  }
  
function get_current_datetime(range) {
    var currentdate = new Date();
    var datetime="";
    // console.log(range);
    if (range=="Year") {
      datetime+=prop_len(currentdate.getFullYear()-1);
    } else {
      datetime+=prop_len(currentdate.getFullYear());
    }
    if (range=="Month") {
      datetime+=prop_len(currentdate.getMonth());
      datetime+=prop_len(currentdate.getDate());
    } else if (range=="Week") {
      datetime+=month_day(currentdate.getDate(),currentdate.getMonth()+1,7);
    } else if (range=="Day") {
      datetime+=month_day(currentdate.getDate(),currentdate.getMonth()+1,1);
    } else {
      datetime+=prop_len(currentdate.getMonth()+1);
      datetime+=prop_len(currentdate.getDate());
    }
    datetime+= prop_len(currentdate.getHours())+prop_len(currentdate.getMinutes())+ prop_len(currentdate.getSeconds());
    // console.log(datetime);
    if (range=="All") {
        return "0";
    }
    return datetime;
  }

const BothCharts = ({records, timeMin, timeMax, range}) => {
    const formatDate = (datetime) => {
        if(datetime !== null){
            let str_version=datetime.toString();
            if (str_version.length==1) {
                return "N/A";
            }
            return str_version.substring(0,4)+"/"+str_version.substring(4,6)+"/"
                +str_version.substring(6,8)+" "+str_version.substring(8,10)+":"
                +str_version.substring(10,12); // NOT SURE HOW WE WANT TO FORMAT THIS!!!
        }
    }
    var start_time=parseInt(get_current_datetime(range));
    var end_time=parseInt(get_current_datetime("other"));
    // console.log(formatDate(start_time));
    // console.log(formatDate(end_time));
    let last_text="";
    if (range=="All") {
        last_text="All Time:";
    } else {
        last_text="Last "+range+":";
    }
    return(
        <Card className="graph-card" style={{textAlign: "center"}}>
            <h3 style={{paddingTop: "20px"}}>{last_text}</h3>
            <p>{"["+formatDate(start_time)+"] to ["+formatDate(end_time)+"]"}</p>
            <Row>
                <Col sm={8}>
                        {/* <LineGraph records={records} timeMin={timeMin} timeMax={timeMax}/> */}
                </Col>
                <Col sm={4}>
                        <PieGraph records={records} start_time={start_time} range={range}/>
                </Col>
            </Row>
        </Card>
    );
}

export default BothCharts;
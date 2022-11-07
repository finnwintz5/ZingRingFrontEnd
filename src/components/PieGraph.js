import {Pie} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

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
  console.log(range);
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
  return datetime
}


const PieGraph = ({records,range}) => {
  let tired_count=0;
  let not_tired_count=0;
  var datetime=parseInt(get_current_datetime(range));
  // console.log(typeof(datetime));
  for (let r in records) {
    console.log(r);
    console.log(records[r]["datetime"]);
    console.log(datetime);
    if (records[r]["datetime"]>datetime) {
      if (records[r]["tiredness"]==0) {
        tired_count+=1;
      } else {
        not_tired_count+=1;
      }
    }
    
    
  }
  // console.log(records);
    const data = {
        labels: ["Tired", "Not Tired"],
        datasets: [
          {
            label: "# of Votes",
            data: [tired_count, not_tired_count],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1
          }
        ]
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "% Tiredness"
          }
        },
      }

      return (
        <div>
            <Pie data={data}  style={{padding: "30px"}} options={options}/>
        </div>
      )
}

export default PieGraph;
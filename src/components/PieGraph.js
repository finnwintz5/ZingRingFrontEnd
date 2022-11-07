import {Pie} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function prop_len(str) {
  if (str.length==2) {
    console.log("len2");
    return str;
  }
  return "0"+str;
}

const PieGraph = ({records}) => {
  let tired_count=0;
  let not_tired_count=0;
  var currentdate = new Date();
  var datetime = + prop_len(currentdate.getFullYear()) + " @ "  
                +  prop_len(currentdate.getDate()) + "/"
                + prop_len(currentdate.getMonth()+1)  + "/" 
                + prop_len(currentdate.getHours()) + ":"  
                +prop_len(currentdate.getMinutes()) + ":" 
                + prop_len(currentdate.getSeconds());
    //console.log(datetime);
  for (let r in records) {
    // if (records[r]["_id"]<)
    if (records[r]["tiredness"]==0) {
      tired_count+=1;
    } else {
      not_tired_count+=1;
    }
  }
  //console.log(records);
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
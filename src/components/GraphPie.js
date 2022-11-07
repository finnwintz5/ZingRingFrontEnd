import {Pie} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);



const PieGraph = ({records,range,start_time}) => {
  let tired_count=0;
  let not_tired_count=0;
  // console.log(typeof(datetime));
  for (let r in records) {
    // console.log(r);
    // console.log(records[r]["datetime"]);
    // console.log(start_time);
    if (records[r]["datetime"]>start_time) {
      if (records[r]["tiredness"]=="Tired") {
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
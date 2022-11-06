import {Pie} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = ({records}) => {
    

    console.log("PieGraph");
    console.log(records);
    // var filtered = records.filter(function(a){return +(a[0]) >= 8;};
    const data = {
        labels: ["Tired", "Not Tired"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1
          }
        ]
      };
      return (
        <div>
            <Pie data={data} />
        </div>
      )
}

export default PieGraph;
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import { Line } from "react-chartjs-2";


const LineGraph = ({records}) => {
    console.log("LineGraph");
    console.log(records);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Chart.js Line Chart"
          }
        }
      };
      
      const labels = ["January", "February", "March", "April", "May", "June", "July"];
      
      const data = {
        labels,
        datasets: [
          {
            label: "Dataset 2",
            data: [1, 3, 4, 42, 2, 8, 0],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)"
          }
        ]
      };
      return <Line options={options} data={data} />;
}

export default LineGraph;
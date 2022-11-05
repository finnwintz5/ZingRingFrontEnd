import {Chart as ChartJS,CategoryScale,LinearScale,TimeScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { useState, useEffect } from "react";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 

const LineGraph = ({records, timeMin, timeMax}) => {  
    const [recordsFormat, setRecordsFormat] = useState([]);

    useEffect(() => {
      var HeartTime = [];
      records.forEach(function (item, index) {
        var dt = new Date(item._id);
        HeartTime.push({x: dt, y: item.heartbeet});
      });
      setRecordsFormat(HeartTime);
    }, [records])
    

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
        },
        scales: {
          x: 
            {
              type: 'time',
              display: true,
              title: {
                display: true,
                text: 'Date'
              },
              
              min: timeMin,
              max: timeMax
            }
          
        }
      };
            
      const data = {
        datasets: [
          {
            type: "line",
            label: "BPM (Beat Per Mintute)",
            data: recordsFormat,
            tension: 0.1,
            borderWidth: 2,
            borderColor: 'rgb(75, 192, 192)',
          }
        ]
      };

      return <Line options={options} data={data} />;
}

export default LineGraph;
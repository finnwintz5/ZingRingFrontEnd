import {Chart as ChartJS,CategoryScale,LinearScale,TimeScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { useState, useEffect } from "react";
import { set } from "date-fns";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 

const LineGraph = ({records, timeMin, timeMax, range}) => {  
    const [recordsFormat, setRecordsFormat] = useState([]);
    const [newMin, setNewMin] = useState(null);
    const [newMax, setNewMax] = useState(null);
    const [unitScale, setUnitScale] = useState(null);

    useEffect(() => {
      if(timeMin !== 0){
        var nm = timeMin.substring(0,4)+"-"+timeMin.substring(4,6)+"-"+timeMin.substring(6,8)+"T"+timeMin.substring(8,10)+":"+timeMin.substring(10,12)+":"+timeMin.substring(12,14)+".000Z";
        setNewMin(nm);
      }
      if(timeMax !== 0){
        var nm = timeMax.substring(0,4)+"-"+timeMax.substring(4,6)+"-"+timeMax.substring(6,8)+"T"+timeMax.substring(8,10)+":"+timeMax.substring(10,12)+":"+timeMax.substring(12,14)+".000Z";
        setNewMax(nm);
      }
    }, [timeMin, timeMax])

    useEffect(() => {
      if(range === "Day"){
        setUnitScale('hour');
      }
      else if(range === "Week"){
        setUnitScale('day');
      }
      else if(range === "Month"){
        setUnitScale('day');
      }
      else if(range === "Year"){
        setUnitScale('month');
      }
      console.log(range);
    }, [range])

    useEffect(() => {
      var HeartTime = [];
      records.forEach(function (item, index) {
        var temp = String(item.datetime);
        if(temp !== null) {
          var at = temp.substring(0,4)+"-"+temp.substring(4,6)+"-"+temp.substring(6,8)+"T"+temp.substring(8,10)+":"+temp.substring(10,12)+":"+temp.substring(12,14)+".000Z";
          var dt = new Date(at);
          HeartTime.push({x: dt, y: item.heartbeet});
        }
      });
      HeartTime.sort(function(a,b){
        return b.x - a.x;
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
            text: "Hearbeat vs. Time"
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
              time: {
                unit: unitScale
            },
              min: newMin,
              max: newMax
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

      return <Line options={options} data={data} style={{padding: "10px"}}/>;
}

export default LineGraph;
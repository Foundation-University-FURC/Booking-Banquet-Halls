import React, { useEffect, useState } from 'react'
// import {Bar, Pie, Doughnut} from 'react-chartjs-2'
import { BarChart, Bar, XAxis, YAxis } from "recharts";



const Charts = () => {
    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
      };
      
      const data = [
        { quarter: 1, earnings: 0 },
        { quarter: 2, earnings: 4 },
        { quarter: 3, earnings: 12 },
        { quarter: 4, earnings: 616000 }
      ];

    return (
     <>
<div style={styles}>
    <h1>Recharts basic demo</h1>
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="quarter" />
      <YAxis dataKey="earnings" />
      <Bar dataKey="earnings" fill="#8884d8" />
    </BarChart>
  </div>
     </>

    );
    
}

export default Charts;
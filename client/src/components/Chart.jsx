import React, { useState, useEffect, useContext } from 'react';
import {Card,CardBody,CardHeader,Typography,} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import AverageScore from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/User_Rounds/AverageScore.jsx'; 
import { UserContext } from './UserContext/UserContext'; 

const ChartComponent = () => {
  const { user } = useContext(UserContext);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        toolbar: { show: false },
        type: 'line',
      },
      colors: ["#1D4ED8"], 
      stroke: { curve: 'smooth' },
      xaxis: { categories: [] },
      tooltip: { theme: 'dark' },
      
    },
  });

  useEffect(() => {
    const fetchScorecards = async () => {
      try {
        const response = await fetch(`/scorecard/user/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch scorecards');
        let scorecards = await response.json();
  
        // Sort scorecards by date
        scorecards = scorecards.sort((a, b) => new Date(a.date) - new Date(b.date));
  
       
        const categories = scorecards.map(scorecard =>
          new Date(scorecard.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        );
        const scores = scorecards.map(scorecard => scorecard.total_user_score);
  
        setChartData(prevData => ({
          ...prevData,
          series: [{ name: 'Score', data: scores }],
          options: { ...prevData.options, xaxis: { ...prevData.options.xaxis, categories } }
        }));
      } catch (error) {
        console.error('Error fetching scorecards:', error);
      }
    };
  
    if (user?.id) fetchScorecards();
  }, [user]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <Card>
      <CardHeader floated={false} shadow={false} color="transparent" className="flex flex-col gap-4 rounded-none md:flex-row md:items-center justify-center">
        <div className="text-center">
            <Typography variant="h6" color="blue-gray">Visualize your score progress</Typography>
        </div>
        </CardHeader>

        <CardBody className="px-2 pb-0">
          <Chart series={chartData.series} options={chartData.options} type="line" height={350} />
        </CardBody>
      </Card>
      <AverageScore />
    </div>
  );

};

export default ChartComponent;

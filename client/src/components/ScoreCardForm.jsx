import React, { useState, useMemo, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext';
import { Button, Checkbox, Input } from "@material-tailwind/react";

function GolfScoreCard() {
  const [date, setDate] = useState('');
  const [golfCourses, setGolfCourses] = useState('');
  const [par, setPar] = useState(Array(18).fill(''));
  const [score, setScore] = useState(Array(18).fill(''));
  const [fairwayHit, setFairwayHit] = useState(Array(18).fill(false));
  const [gir, setGir] = useState(Array(18).fill(false));
  const [putts, setPutts] = useState(Array(18).fill(''));
  const history = useHistory();
  const { user } = useContext(UserContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!user || !user.id) {
        console.error('User is not logged in or user ID is missing');
        return;
      }


      const holesData = par.map((parValue, index) => ({
        hole_number: index + 1,
        par: parseInt(parValue, 10),
        score: parseInt(score[index], 10),
        fairway_hit: fairwayHit[index],
        green_in_reg: gir[index],
        putts: parseInt(putts[index], 10),
        style: {
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: '#059669',
          color: '#FFFFFF',
          textAlign: 'center',
        },
      }));


      const response = await fetch('/scorecard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          course: golfCourses,
          holes: holesData,
          user_id: user.id,
        }),
      });
      if (response.ok) {
        const newScorecard = await response.json();
        history.push('/rounds');
      } else {
        console.error('Failed to submit scorecard');
      }
    } catch (error) {
      console.error('Error submitting scorecard:', error);
    }
  };

  const totalPar = useMemo(() => {
    const filteredPar = par.filter(p => !isNaN(parseInt(p)));
    return filteredPar.reduce((acc, val) => acc + parseInt(val), 0);
  }, [par]);

  const totalScore = useMemo(() => {
    const filteredScore = score.filter(s => !isNaN(parseInt(s)));
    return filteredScore.reduce((acc, val) => acc + parseInt(val), 0);
  }, [score]);

  return (
    <div className="max-w-3xl mx-auto bg-green-500 bg-opacity-60 p-6 rounded-lg shadow-lg border border-green-600">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-700 border-gray-900 underline decoration-4">ForeScore: Golf Scorecard</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <Input
              label="Date"
              id="date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="w-1/2 ml-2">
            <Input
              label="Golf Courses"
              id="golfCourses"
              type="text"
              value={golfCourses}
              onChange={(e) => setGolfCourses(e.target.value)}
              className="bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-1 p-2 rounded-lg bg-teal-500 text-white text-center">Hole</div>
          <div className="col-span-1 p-2 rounded-lg bg-teal-500 text-white text-center">Par</div>
          <div className="col-span-1 p-2 rounded-lg bg-teal-500 text-white text-center">Score</div>
          <div className="col-span-1 p-2 rounded-lg bg-teal-500 text-white text-center">Fairway Hit</div>
          <div className="col-span-1 p-2 rounded-lg bg-teal-500 text-white text-center">GIR</div>
          <div className="col-span-1 p-2 rounded-lg bg-teal-500 text-white text-center">Putts</div>
        </div>
        {Array.from({ length: 18 }).map((_, index) => (
          <div key={index} className="grid grid-cols-7 gap-4 mt-2">
            <div className="col-span-1 flex justify-center items-center">
              <div className="p-3 rounded-lg bg-teal-500 text-white text-center text-xl">{index + 1}</div>
            </div>
            <div className="col-span-1">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Par"
                value={par[index]}
                onChange={(e) => {
                  const newPar = [...par];
                  newPar[index] = e.target.value;
                  setPar(newPar);
                }}
              />
            </div>
            <div className="col-span-1">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Score"
                value={score[index]}
                onChange={(e) => {
                  const newScore = [...score];
                  newScore[index] = e.target.value;
                  setScore(newScore);
                }}
              />
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Checkbox
                color="blue"
                checked={fairwayHit[index]}
                onChange={(e) => {
                  const newFairwayHit = [...fairwayHit];
                  newFairwayHit[index] = e.target.checked;
                  setFairwayHit(newFairwayHit);
                }}
              />
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Checkbox
                color="blue"
                checked={gir[index]}
                onChange={(e) => {
                  const newGir = [...gir];
                  newGir[index] = e.target.checked;
                  setGir(newGir);
                }}
              />
            </div>
            <div className="col-span-1">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Putts"
                value={putts[index]}
                onChange={(e) => {
                  const newPutts = [...putts];
                  newPutts[index] = e.target.value;
                  setPutts(newPutts);
                }}
              />
            </div>
          </div>
        ))}
        <div className="grid grid-cols-7 gap-4 mt-4">
        <div className="col-span-1 p-3 bg-blue-500 text-white font-bold text-lg text-center rounded-lg">Total</div>
        <div className="col-span-1 p-3 bg-blue-500 text-white font-bold text-lg text-center rounded-lg">{totalPar}</div>
        <div className="col-span-1 p-3 bg-blue-500 text-white font-bold text-lg text-center rounded-lg">{totalScore}</div>
      </div>

        <div className="mt-6">
          <Button
            color="blue"
            buttonType="filled"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={handleFormSubmit}
          >
            Submit Scorecard
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GolfScoreCard;


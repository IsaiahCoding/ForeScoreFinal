import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from './UserContext/UserContext';

function ScoreCardForm() {
  const [date, setDate] = useState('');
  const [golfCourses, setGolfCourses] = useState('');
  const [par, setPar] = useState(Array(18).fill(''));
  const [score, setScore] = useState(Array(18).fill(''));
  const [fairwayHit, setFairwayHit] = useState(Array(18).fill(false));
  const [gir, setGir] = useState(Array(18).fill(false));
  const [putts, setPutts] = useState(Array(18).fill(''));
  const { loggedInUser } = useUser();
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if loggedInUser is undefined or if loggedInUser.id is missing
      if (!loggedInUser || !loggedInUser.id) {
        console.error('User is not logged in or user ID is missing');
        return;
      }
  
      const response = await fetch('/past_round', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          course: golfCourses,
          par: par.reduce((acc, curr) => {
            if (!isNaN(curr)) {
              acc.push(parseInt(curr));
            }
            return acc;
          }, []),
          score: score.reduce((acc, curr) => {
            if (!isNaN(curr)) {
              acc.push(parseInt(curr));
            }
            return acc;
          }, []),
          user_id: loggedInUser.id,
        }),
      });
      if (response.ok) {
        
        const newScorecard = await response.json();
        history.push('/past_round');
      } else {
        console.error('Failed to submit past round');
      }
    } catch (error) {
      console.error('Error submitting past round:', error);
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
    <div className="max-w-3xl mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4" style={{ color: '#f8fafc' }}>ForeScore: Scorecard</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-slate-50 text-sm font-bold mb-2" htmlFor="date">
            Date:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="text"
            placeholder="Enter date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-50 text-sm font-bold mb-2" htmlFor="golfCourses">
            Golf Courses:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 leading-tight focus:outline-none focus:shadow-outline"
            id="golfCourses"
            type="text"
            placeholder="Enter golf courses"
            value={golfCourses}
            onChange={(e) => setGolfCourses(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-1">Hole</div>
          <div className="col-span-1">Par</div>
          <div className="col-span-1">Score</div>
          <div className="col-span-1">Fairway Hit</div>
          <div className="col-span-1">GIR</div>
          <div className="col-span-1">Putts</div>
        </div>
        {Array.from({ length: 18 }).map((_, index) => (
          <div key={index} className="grid grid-cols-7 gap-4 mt-2">
            <div className="col-span-1">{index + 1}</div>
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
                <input
                className="form-checkbox h-4 w-4 text-gray-100"
                type="checkbox"
                checked={fairwayHit[index]}
                onChange={(e) => {
                const newFairwayHit = [...fairwayHit];
                newFairwayHit[index] = e.target.checked;
                setFairwayHit(newFairwayHit);
                }}
                />
                </div>
                <div className="col-span-1 flex justify-center items-center">
                <input
                className="form-checkbox h-4 w-4 text-gray-100"
                type="checkbox"
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
                <div className="col-span-2 font-bold" style={{ color: '#f8fafc' }}>Total</div>
                <div className="col-span-1 font-bold" style={{ color: '#f8fafc' }}>{totalPar}</div>
                <div className="col-span-1 font-bold" style={{ color: '#f8fafc' }}>{totalScore}</div>
                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
                </div>
                <div className="mt-6">
                <button
                         className="bg-zinc-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                         type="submit"
                       >
                Submit Scorecard
                </button>
                </div>
                </form>
                </div>
                );
                }
                
                export default ScoreCardForm;

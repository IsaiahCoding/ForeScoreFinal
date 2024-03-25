import React, { useState, useMemo, useContext } from 'react'; // Added useContext here
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext';

function ScoreCardForm() {
  const [date, setDate] = useState('');
  const [golfCourses, setGolfCourses] = useState('');
  const [par, setPar] = useState(Array(18).fill(''));
  const [score, setScore] = useState(Array(18).fill(''));
  const [fairwayHit, setFairwayHit] = useState(Array(18).fill(false));
  const [gir, setGir] = useState(Array(18).fill(false));
  const [putts, setPutts] = useState(Array(18).fill(''));
  const history = useHistory();
  const { user } = useContext(UserContext); // Correctly using useContext here

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if user is undefined or if user.id is missing
      if (!user || !user.id) {
        console.error('User is not logged in or user ID is missing');
        return;
      }
  
      // Structure the hole stats for the POST request
      const holesData = par.map((parValue, index) => ({
        hole_number: index + 1,  
        par: parseInt(parValue, 10),
        score: parseInt(score[index], 10),
        fairway_hit: fairwayHit[index],
        green_in_reg: gir[index],
        putts: parseInt(putts[index], 10),
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
        history.push('/scorecard');
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
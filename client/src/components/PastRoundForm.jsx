import React, { useState, useEffect } from 'react';

function PastRoundForm() {
    const [date, setDate] = useState('');
    const [golfCourses, setGolfCourses] = useState('');
    const [par, setPar] = useState(Array(18).fill(''));
    const [score, setScore] = useState(Array(18).fill(''));
    const [scorecard, setScorecard] = useState([]);

    useEffect(() => {
        fetch('/api/scorecard')
            .then(res => res.json())
            .then(data => setScorecard(data));
    }, []);

    const handleEditClick = (id) => {
        fetch(`/scorecard/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date,
                golfCourses,
                par,
                score
            })
        })
        .then((r) => r.json())
        .then((data) => {
            const updatedScorecard = scorecard.map((s) => {
                if (s.id === id) {
                    return data;
                }
                return s;
            });
            setScorecard(updatedScorecard);
        });
    };

    const handleDeleteClick = (id) => {
        fetch(`/scorecard/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const updatedScorecard = scorecard.filter((s) => s.id !== id);
            setScorecard(updatedScorecard);
        });
    };

    return (
        <div>
            <form>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br />
                <label>Golf Course:</label>
                <input type="text" value={golfCourses} onChange={(e) => setGolfCourses(e.target.value)} /><br />
                <label>Par:</label>
                {par.map((p, index) => (
                    <input key={index} type="number" value={p} onChange={(e) => {
                        const newPar = [...par];
                        newPar[index] = e.target.value;
                        setPar(newPar);
                    }} />
                ))}
                <br />
                <label>Score:</label>
                {score.map((s, index) => (
                    <input key={index} type="number" value={s} onChange={(e) => {
                        const newScore = [...score];
                        newScore[index] = e.target.value;
                        setScore(newScore);
                    }} />
                ))}
                <br />
                <button type="submit">Submit</button>
            </form>

            {/* Render Scorecard */}
            <ul>
                {scorecard.map((item) => (
                    <li key={item.id}>
                        <span>Date: {item.date}</span>
                        <span>Golf Course: {item.golfCourses}</span>
                        <button onClick={() => handleEditClick(item.id)}>Edit</button>
                        <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PastRoundForm;

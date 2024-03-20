import React, { useState, useEffect } from 'react';

function PastRoundForm() {
    const [date, setDate] = useState('');
    const [golfCourse, setGolfCourse] = useState('');
    const [par, setPar] = useState([]);
    const [score, setScore] = useState([]);
    const [scorecard, setScorecard] = useState([]);

    useEffect(() => {
        fetch('/api/scorecard')
            .then(res => res.json())
            .then(data => setScorecard(data));
    }, []);

    const handleEditClick = (id) => {
        const updatedScorecard = scorecard.map((item) => {
            if (item.id === id) {
                return { ...item, date, golfCourse, par, score };
            }
            return item;
        });

        fetch(`/scorecard/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, golfCourse, par, score })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to update scorecard');
            }
            return res.json();
        })
        .then(() => setScorecard(updatedScorecard))
        .catch(error => console.error('Error updating scorecard:', error));
    };

    const handleDeleteClick = (id) => {
        fetch(`/scorecard/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            const updatedScorecard = scorecard.filter((item) => item.id !== id);
            setScorecard(updatedScorecard);
        })
        .catch(error => console.error('Error deleting scorecard:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/scorecard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, golfCourse, par, score })
        })
        .then(res => res.json())
        .then(data => {
            setScorecard([...scorecard, data]);
            setDate('');
            setGolfCourse('');
            setPar([]);
            setScore([]);
        })
        .catch(error => console.error('Error creating scorecard:', error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br />
                <label>Golf Course:</label>
                <input type="text" value={golfCourse} onChange={(e) => setGolfCourse(e.target.value)} /><br />
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
                        <span>Golf Course: {item.golfCourse}</span>
                        <button onClick={() => handleEditClick(item.id)}>Edit</button>
                        <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PastRoundForm;

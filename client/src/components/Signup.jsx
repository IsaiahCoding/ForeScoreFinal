import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory

function Signup(){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Initialize useHistory

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
        });
        const data = await response.json();
        if (data.status === 'ok') {
            history.push('/scorecard');
        }
    };
    return (
        <div className="max-w-md mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold mb-4 text-gray-50">Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
                >
                    Signup
                </button>
                <br />
                <p className="mt-4 text-center text-sm text-gray-50">
                    Already have an account? <a href="/" className="text-indigo-500">Login</a>
                </p>
                <p className="text-center text-sm text-gray-50">
                    Forgot your password? <a href="/reset" className="text-indigo-500">Reset</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;

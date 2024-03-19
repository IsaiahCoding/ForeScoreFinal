import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    })
    .then((r) => {
      if (r.ok) {
        return r.json().then((user) => {
          localStorage.setItem('token', user.token);
          history.push('/scorecard');
        });
      } else {
        // Handle error cases here
        console.error('Failed to login');
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
    });
  };

  return (
    <div className="max-w-md mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-50">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
        />
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
        >
          Login
        </button>
        <br />
        <p className="mt-4 text-center text-sm text-gray-50">
          Don't have an account? <a href="/signup" className="text-indigo-500">Signup</a>
        </p>
        <p className="text-center text-sm text-gray-50">
          Forgot your password? <a href="/reset" className="text-indigo-500">Reset</a>
        </p>
      </form>
    </div>
  );
}

export default Login;

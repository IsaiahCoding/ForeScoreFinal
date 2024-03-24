import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx'; // Adjust this import path as necessary

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to signup');
      }
    })
    .then(data => {
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('token', data.token); // Adjust based on your actual token key
        history.push('/scorecard'); // Adjust redirect as necessary
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="max-w-md mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-50">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500 text-slate-950"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
        >
          Signup
        </button>
        <p className="mt-4 text-center text-sm text-gray-50">
          Already have an account? <a href="/login" className="text-indigo-500">Login</a> {/* Adjust link as needed */}
        </p>
        <p className="text-center text-sm text-gray-50">
          Forgot your password? <a href="/reset" className="text-indigo-500">Reset</a> {/* Adjust link as needed */}
        </p>
      </form>
    </div>
  );
}

export default Signup;

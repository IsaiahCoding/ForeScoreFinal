import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '/Users/isaiahaguilera/Development/code/phase-5/Fore-Score-2/client/src/components/UserContext/UserContext.jsx'; // Adjust this import path as necessary
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

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
        localStorage.setItem('token', data.token); 
        history.push('/home'); 
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="max-w-md w-full">
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white==">
            Signup
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <Input
            label = "Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              size="lg"
            />
          </div>
          <div className="mb-4">
            <Input
            label = "Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              size="lg"
            />
          </div>
          <div className="mb-4">
            <Input
            label = "Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              size="lg"
            />
          </div>
          <div className="mb-4">
            <Input
            label = "Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              size="lg"
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button
            variant="gradient"
            fullWidth
            onClick={handleSubmit}
          >
            Signup
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
          
          
            Already have an account? 
            <Typography
            as = "a"
            href = "/login"
            variant = "small"
            color = "blue-gray"
            className = "ml-1 font-bold">
              Login
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;

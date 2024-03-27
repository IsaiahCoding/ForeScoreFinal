import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext/UserContext';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { setUser } = useContext(UserContext); 

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then((user) => {
          setUser(user); 
          sessionStorage.setItem('user', JSON.stringify(user)); 
          history.push('/home');
        });
      } else {
        console.error('Failed to login');
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
           Login
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Checkbox label="Remember Me" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleLogin}>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;

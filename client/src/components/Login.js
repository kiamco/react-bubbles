import React, { useState } from "react";
import AxiosWithAuth from './axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const onChangeHandler = e => {
    return setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(credentials)
    AxiosWithAuth()
      .post("http://localhost:5000/api/login",credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      props.history.push("bubbles");
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="login"
          onChange={onChangeHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={onChangeHandler}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;

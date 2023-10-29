import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useContext} from "react";
import DataContext from "../../../DataContext";

function Register() {
  const initialState = {
    username: "",

    email: "",
    password: "",
    confirmPassword: ""
  };
  const [formData, setFormData] = useState(initialState);
  const { users, setUsers, API_BASE_URL } = useContext(DataContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
};
// const createUserData = async (userData) => {
//   // const formattedEventDate = new Date(userData.eventDate).toISOString();

//   const createdUserData = {
//       ...userData,
//       // eventDate: formattedEventDate,
//   };
//   fetch(`${API_BASE_URL}/users/register`, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json; charset=UTF-8",
//       },
//       body: JSON.stringify(createdUserData),
//   })
//       .then((response) => response.json())
//       .then((newUser) => setUsers([newUser, ...users]));
// };

const createUserData = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const newUser = response.data;
    setUsers([newUser, ...users]);
  } catch (error) {
    console.error('Registration failed', error);
  }
};
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      createUserData(formData);
      setFormData(initialState);

      // const response = await axios.post('http://localhost:8080/users/register', formData);

      // console.log('Registration successful', response.data);

    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
      <label htmlFor="username">Username:</label>

<input
  type="text"
  placeholder="Username"
  name="username"
  value={formData.username}
  onChange={handleChange}
/>
      <label htmlFor="email">Email:</label>

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
                               <label htmlFor="password">Password:</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
                               <label htmlFor="confirmPassword">Confirm Password:</label>

           <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
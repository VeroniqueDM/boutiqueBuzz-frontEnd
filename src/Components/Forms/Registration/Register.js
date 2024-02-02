import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../DataContext";
import AuthService from "../../../Auth/auth.service";

function Register() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
//   const initialState = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   };
  const {  API_BASE_URL } = useContext(DataContext);
//   const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup( firstname,
        lastname,email, password).then(
        (response) => {
          // TODO: check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/v1/auth/register`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Assuming the registration response contains a token
//       const token = response.data.token;

//       // Handle the token (e.g., store it in localStorage)
//       // For example:
//       // localStorage.setItem('token', token);

//       // Redirect to another page after successful registration
//       navigate('/');
//     } catch (error) {
//       console.error("Registration failed", error);
//     }
//   };

  return (
    <div>
    <form onSubmit={handleSignup}>
      <h3>Sign up</h3>
      <input
        type="text"
        placeholder="firstname"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
      /> <input
      type="text"
      placeholder="lastname"
      value={lastname}
      onChange={(e) => setLastName(e.target.value)}
    />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign up</button>
    </form>
  </div>
    // <div>
    //   <h2>Register</h2>
    //   <form onSubmit={handleRegister}>
    //     <label htmlFor="firstName">First Name:</label>
    //     <input
    //       type="text"
    //       placeholder="First Name"
    //       name="firstName"
    //       value={formData.firstName}
    //       onChange={handleChange}
    //     />

    //     <label htmlFor="lastName">Last Name:</label>
    //     <input
    //       type="text"
    //       placeholder="Last Name"
    //       name="lastName"
    //       value={formData.lastName}
    //       onChange={handleChange}
    //     />

    //     <label htmlFor="email">Email:</label>
    //     <input
    //       type="text"
    //       placeholder="Email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //     />

    //     <label htmlFor="password">Password:</label>
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //     />

    //     <button type="submit">Register</button>
    //   </form>
    // </div>
  );
}

export default Register;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useContext } from "react";
// import DataContext from "../../../DataContext";

// function Register() {
//     const initialState = {
//         username: "",

//         email: "",
//         password: "",
//         confirmPassword: "",
//     };
//     const [formData, setFormData] = useState(initialState);
//     const { users, setUsers, API_BASE_URL } = useContext(DataContext);

//     const handleChange = (event) => {
//         const { name, value } = event.target;

//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };
//     // const createUserData = async (userData) => {
//     //   // const formattedEventDate = new Date(userData.eventDate).toISOString();

//     //   const createdUserData = {
//     //       ...userData,
//     //       // eventDate: formattedEventDate,
//     //   };
//     //   fetch(`${API_BASE_URL}/users/register`, {
//     //       method: "POST",
//     //       headers: {
//     //           "Content-Type": "application/json; charset=UTF-8",
//     //       },
//     //       body: JSON.stringify(createdUserData),
//     //   })
//     //       .then((response) => response.json())
//     //       .then((newUser) => setUsers([newUser, ...users]));
//     // };

//     const createUserData = async (userData) => {
//         try {
//             const response = await axios.post(
//                 `${API_BASE_URL}/users/register`,
//                 userData,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             const newUser = response.data;
//             setUsers([newUser, ...users]);
//         } catch (error) {
//             console.error("Registration failed", error);
//         }
//     };
//     const handleRegister = async (e) => {
//         e.preventDefault();

//         try {
//             createUserData(formData);
//             setFormData(initialState);

//             // const response = await axios.post('http://localhost:8080/users/register', formData);

//             // console.log('Registration successful', response.data);
//         } catch (error) {
//             console.error("Registration failed", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleRegister}>
//                 <label htmlFor="username">Username:</label>

//                 <input
//                     type="text"
//                     placeholder="Username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor="email">Email:</label>

//                 <input
//                     type="text"
//                     placeholder="Email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor="password">Password:</label>

//                 <input
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor="confirmPassword">Confirm Password:</label>

//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                 />

//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// }

// export default Register;

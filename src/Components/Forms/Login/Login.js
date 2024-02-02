import React, { useState, useContext } from "react";
import axios from "axios";
import DataContext from "../../../DataContext";

import { useNavigate } from "react-router-dom";
import AuthService from "../../../Auth/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const {
  //           users,
  //           setUsers,
  //           API_BASE_URL,
  //           loggedIn,
  //           setLoggedIn,
  //           userDetails,
  //           setUserDetails,
  //       } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          console.log("Login successful");
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

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;


// function Login() {
//   const { API_BASE_URL, setLoggedIn, setUserDetails } = useContext(DataContext);

//   const initialState = {
//     email: "",
//     password: "",
//   };
//   const [formData, setFormData] = useState(initialState);

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await axios.post(
//   //       `${API_BASE_URL}/auth/authenticate`,
//   //       formData,
//   //       { withCredentials: true }, // Include this option
//   //       // credentials: "include",

//   //     );
//   //     if (response.status === 200) {
//   //       // Login was successful, update the state
//   //       setLoggedIn(true);
//   //       setFormData(initialState);
//   //       setUserDetails(response.data);
//   //       console.log("Login successful", response.data);
//   //     } else {
//   //       console.log("Login unsuccessful / status", response.data);
//   //     }
//   //   } catch (error) {
//   //     console.error("Login failed..", error);
//   //   }
//   // };
//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/v1/auth/authenticate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include credentials (cookies)
//         body: JSON.stringify(formData),
//       });
  
//       if (!response.ok) {
//         console.error(`Login failed with status ${response.status}`);
//         return;
//       }
  
//       const data = await response.json();
//       // Handle the response data...
  
//     } catch (error) {
//       console.error("Login failed..", error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="text"
//           placeholder="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import DataContext from "../../../DataContext";
// function Login() {
//      const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const {
//         users,
//         setUsers,
//         API_BASE_URL,
//         loggedIn,
//         setLoggedIn,
//         userDetails,
//         setUserDetails,
//     } = useContext(DataContext);
//     const initialState = {
//         username: "",
//         email: "",
//         password: "",
//     };
//     const [formData, setFormData] = useState(initialState);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(
//                 `${API_BASE_URL}/users/login`,
//                 formData
//             );
//             if (response.status === 200) {
//                 // Login was successful, update the state
//                 setLoggedIn(true);
//                 setFormData(initialState);
//                 setUserDetails(response.data);
//                 console.log("Login successful", response.data);
//             } else {
//                 console.log("Login unsuccessful / status", response.data);
//             }
//         } catch (error) {
//             console.error("Login failed..", error);
//         }
//     };
//     const handleChange = (event) => {
//         const { name, value } = event.target;

//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };
//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
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
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// const handleGoogleLogin = async () => {
//   try {
//     // Make a request to the backend server to initiate the Google OAuth2 flow
//     const response = await axios.get('/auth/google');
//     window.location.href = response.data.redirectUrl;
//   } catch (error) {
//     console.error('Error initiating Google login:', error);
//   }
// };

// const handleFacebookLogin = async () => {
//   try {
//     // Make a request to the backend server to initiate the Facebook OAuth2 flow
//     const response = await axios.get('/auth/facebook');
//     window.location.href = response.data.redirectUrl;
//   } catch (error) {
//     console.error('Error initiating Facebook login:', error);
//   }
// };

// return (
//   <div>
//     <h1>Welcome to our Social Login App!</h1>
//     <button onClick={handleGoogleLogin}>Login with Google</button> 
//     {/* <button onClick={handleFacebookLogin}>Login with Facebook</button> */}
//   </div>
// );
// }

// export default Login;

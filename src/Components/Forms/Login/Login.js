import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import DataContext from "../../../DataContext";
function Login() {
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
const handleGoogleLogin = async () => {
  try {
    // Make a request to the backend server to initiate the Google OAuth2 flow
    const response = await axios.get('/auth/google');
    window.location.href = response.data.redirectUrl;
  } catch (error) {
    console.error('Error initiating Google login:', error);
  }
};

// const handleFacebookLogin = async () => {
//   try {
//     // Make a request to the backend server to initiate the Facebook OAuth2 flow
//     const response = await axios.get('/auth/facebook');
//     window.location.href = response.data.redirectUrl;
//   } catch (error) {
//     console.error('Error initiating Facebook login:', error);
//   }
// };

return (
  <div>
    <h1>Welcome to our Social Login App!</h1>
    <button onClick={handleGoogleLogin}>Login with Google</button> 
    {/* <button onClick={handleFacebookLogin}>Login with Facebook</button> */}
  </div>
);
}

export default Login;

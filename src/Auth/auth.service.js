import axios from "axios";
import authHeader from "./auth-header";
const API_BASE_URL = "http://localhost:4000";

const API_URL = API_BASE_URL + "/api/v1/auth";
const USER_DETAILS_URL = API_BASE_URL + "/api/v1/users/userinfo";

const signup = ( firstname,
  lastname,email, password) => {
  return axios
    .post(API_URL + "/register", {
    firstname,
     lastname,
      email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/authenticate", {
      email,
      password,
      // headers: authHeader()
    })
    .then((response) => {
      console.log("Response: " + JSON.stringify(response.data));
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("the user is :" + JSON.stringify(response.data));

      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  // console.log("Current user: "+JSON.parse(localStorage.getItem("user")));
  return JSON.parse(localStorage.getItem("user"));
};

const fetchUserData=()=>{
  // console.log("Current user(fetch data): ",getCurrentUser());
  // console.log("Access token: "+getCurrentUser().access_token);
  // return axios.get(API_URL +  "/userinfo", { headers: authHeader() });
  // return axios.get('http://localhost:4000/api/v1/auth/userinfo', { withCredentials: true,headers: authHeader() });
  // return axios.get(USER_DETAILS_URL, { withCredentials: true,headers: authHeader() });
  return axios.get(USER_DETAILS_URL, {
    withCredentials: true,
    headers: {
      ...authHeader(),
      'Credentials': 'include', // Set credentials header
    },
  });
  // return axios.get('http://localhost:4000/api/v1/users/userinfo', { headers: authHeader() });

  // return axios.get('http://localhost:8080/api/v1/auth/userinfo', { headers: authHeader() });


  // return axios({
  //     method:'GET',
  //     url:"http://localhost:4000" + "/api/v1/users" + "/userinfo",
  //     headers: authHeader(),
  //     // credentials: 'include', // Include credentials in the request

  //     // headers:{
  //     //     'Authorization':'Bearer '+ getCurrentUser().access_token
  //     // }
  // });
};
const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  fetchUserData,
};

export default authService;

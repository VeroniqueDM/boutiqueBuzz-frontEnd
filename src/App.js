import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/Form.css"; 

import CollectionsFeed from "./Components/Feeds/Collections/CollectionsFeed";
import DesignersFeed from "./Components/Feeds/Designers/DesignersFeed";
import EventsFeed from "./Components/Feeds/Events/EventsFeed";
import ItemsFeed from "./Components/Feeds/Items/ItemsFeed";
import NewsFeed from "./Components/Feeds/News/NewsFeed";
import Header from "./Components/Header/Header";
import HomeSection from "./Components/Home/HomeSection";
import DataContext from "./DataContext";
import EditEventForm from "./Components/Forms/Event/EditEventForm";
import EventView from "./Components/IndividualViews/EventView";
import CreateEventForm from "./Components/Forms/Event/CreateEventForm";
import ItemView from "./Components/IndividualViews/ItemView";
import EditFashionItemForm from "./Components/Forms/FashionItem/EditFashionItemForm";
import CreateFashionItemForm from "./Components/Forms/FashionItem/CreateFashionItemForm";
import CreateNewsItemForm from "./Components/Forms/News/CreateNewsItemForm";
import NewsView from "./Components/IndividualViews/NewsView";
import EditNewsItemForm from "./Components/Forms/News/EditNewsItemForm";
import CreateCollectionForm from "./Components/Forms/Collection/CreateCollectionForm";
import CollectionView from "./Components/IndividualViews/CollectionView";
import EditCollectionForm from "./Components/Forms/Collection/EditCollectionForm";
import CreateDesignerForm from "./Components/Forms/Designer/CreateDesignerForm";
import LeftSidebar from "./Components/LeftSidebar/LeftSidebar";
import "./styles/MainContent.css";
import Register from "./Components/Forms/Registration/Register";
import Login from "./Components/Forms/Login/Login";
import CategoriesFeed from "./Components/Feeds/Categories/CategoriesFeed";
import CreateCategoryForm from "./Components/Forms/Category/CreateCategoryForm";
import EditCategoryForm from "./Components/Forms/Category/EditCategoryForm";
import CategoryView from "./Components/IndividualViews/CategoryView";
import ErrorComponent from "./Components/ErrorComponent";
import UserProfileView from "./Components/IndividualViews/UserProfileView";
import AuthService from "./Auth/auth.service";

function App() {
    // const [designers, setDesigners] = useState([]);
    const [collections, setCollections] = useState([]);
    const [items, setItems] = useState([]);
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [data,setData]=useState({});

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      setCurrentUser(user);
    }, []);

    useEffect(()=> {
        if (currentUser) {          
            AuthService.fetchUserData().then((response)=>{
                console.log("Response data : ", response.data);
                setData(response.data);
                console.log("User data : ", data);
            }).catch((e)=>{
                console.log("Error is ", e);
                // localStorage.clear();
                // props.history.push('/');
                  console.error("Error message: ", e.message);
                console.error("Error response data: ", e.response?.data);
            });
          }
    },[currentUser]);
  
    const logOut = () => {
      AuthService.logout();
    };
  
    // Function to trigger an error, e.g., when a front-end or back-end error occurs
    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    // Function to clear the error message
    const clearError = () => {
        setError(null);
    };
    // const [comments, setComments] = useState({});
    // const [editingIndex, setEditingIndex] = useState(null);
    // const [requiredFieldError, setRequiredFieldError] = useState(false);
    const API_BASE_URL = "http://localhost:4000";
    // const API_BASE_URL = "http://localhost:8080";
    // async function fetchData() {
    //     try {
    //         const newsResponse = await fetch(`${API_BASE_URL}/news`,
    //             { method: 'GET', redirect: "follow", credentials: 'include' }
    //         ).then(
    //             (response) =>
    //         response);

    //         if(newsResponse.redirected) {
    //             document.location = newsResponse.url;
    //         }
    //         const newsData = await newsResponse.json();
    //         // const newsJsonResponse = await newsResponse.json();

    //         const eventsResponse = await fetch(`${API_BASE_URL}/events`,
    //         { method: 'GET', redirect: "follow", credentials: 'include' }
    //         ).then((response) => response);

    //         if(eventsResponse.redirected) {
    //             document.location = eventsResponse.url;
    //         }
    //         const eventsData = await eventsResponse.json();
    //         // const eventsJsonResponse = await eventsResponse.json();

    //         // const designersResponse = await fetch(`${API_BASE_URL}/designers`);
    //         // const designersJsonResponse = await designersResponse.json();

    //         const collectionsResponse = await fetch(
    //             `${API_BASE_URL}/collections`
    //         );
    //         const collectionsJsonResponse = await collectionsResponse.json();

    //         const itemsResponse = await fetch(`${API_BASE_URL}/items`);
    //         const itemsJsonResponse = await itemsResponse.json();

    //         // const usersResponse = await fetch(`${API_BASE_URL}/users`);
    //         // const usersJsonResponse = await usersResponse.json();

    //         // setUsers(usersJsonResponse);
    //         setCollections(collectionsJsonResponse);
    //         // setDesigners(designersJsonResponse);
    //         setEvents(eventsData);
    //         setNews(newsData);
    //         setItems(itemsJsonResponse);

    //     } catch (error) {
    //         console.error("Error fetching data: .. ", error);
    //     }
    // }
    async function handleResponse(response) {
        if (response.redirected) {
            document.location = response.url;
        }
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }
    async function fetchData() {
        try {
            const [
                newsResponse,
                eventsResponse,
                collectionsResponse,
                itemsResponse,
            ] = await Promise.all([
                fetch(`${API_BASE_URL}/news`, {
                    method: "GET",
                    redirect: "follow",
                    credentials: "include",
                }),
                fetch(`${API_BASE_URL}/events`, {
                    method: "GET",
                    redirect: "follow",
                    credentials: "include",
                }),
                fetch(`${API_BASE_URL}/collections`, {
                    method: "GET",
                    credentials: "include",
                }),
                fetch(`${API_BASE_URL}/items`, {
                    method: "GET",
                    credentials: "include",
                }),
            ]);

            const [newsData, eventsData, collectionsData, itemsData] =
                await Promise.all([
                    handleResponse(newsResponse),
                    handleResponse(eventsResponse),
                    handleResponse(collectionsResponse),
                    handleResponse(itemsResponse),
                ]);

            setNews(newsData);
            setEvents(eventsData);
            setCollections(collectionsData);
            setItems(itemsData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    async function fetchCategories() {
        try {
            const categoriesResponse = await fetch(
                `${API_BASE_URL}/categories`,
                { method: "GET", credentials: "include" }
            );
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    }
    // async function fetchTestData() {
    //     try {
    //         // Simulate a network request error by attempting to fetch data from a non-existent URL
    //         const response = await fetch("https://example.com/nonexistent", {
    //             method: 'GET',
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Failed to fetch data. Status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //         setError(error.message);
    //     }
    // }
    useEffect(() => {
        // fetchData();
        // fetchTestData();
        // fetchCategories();
        // fetch(`${API_BASE_URL}/user`, {
        //     method: "GET",
        //     credentials: "include",
        // })
        //     .then((response) => {
        //         if (response.ok) {
        //             setLoggedIn(true);
        //             return response.json();
        //         } else {
        //             setLoggedIn(false);
        //             return null;
        //         }
        //     })
        //     .then((userData) => {
        //         setUserDetails(userData);
        //         console.log(userData);
        //         // if (userData) {
        //         //     const role = userData.role.split('_')[1]; 
        //         //     userData.role = role;
        
        //         //     setUserDetails(userData);
        //         //     console.log(userData);
        //         // }
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching user data: ", error);
        //     });
    }, []);

    return (
        <div className="app">
            <DataContext.Provider
                value={{
                    news,
                    setNews,
                    events,
                    setEvents,
                    collections,
                    setCollections,
                    items,
                    setItems,
                    users,
                    setUsers,
                    loggedIn,
                    setLoggedIn,
                    userDetails,
                    setUserDetails,
                    categories,
                    setCategories,
                    API_BASE_URL,
                    currentUser, 
                    setCurrentUser, logOut
                }}
            >
                <Header />
                <LeftSidebar />
                {error ? (
                    <div className="error-message">
                        <p>Error: {error}</p>
                    </div>
                ) : (
                    <div className="main-content">
                        {error && <ErrorComponent errorMessage={error} />}

                        <Routes>
                            <Route path="/" element={<HomeSection />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/items" element={<ItemsFeed />} />
                            <Route
                                path="/items/create"
                                element={<CreateFashionItemForm />}
                            />
                            <Route path="/items/:id" element={<ItemView />} />
                            <Route
                                path="/items/:id/edit"
                                element={<EditFashionItemForm />}
                            />

                            <Route path="/events" element={<EventsFeed />} />
                            <Route
                                path="/events/create"
                                element={<CreateEventForm />}
                            />
                            <Route path="/events/:id" element={<EventView />} />
                            <Route
                                path="/events/:id/edit"
                                element={<EditEventForm />}
                            />

                            <Route path="/news" element={<NewsFeed />} />
                            <Route
                                path="/news/create"
                                element={<CreateNewsItemForm />}
                            />
                            <Route path="/news/:id" element={<NewsView />} />
                            <Route
                                path="/news/:id/edit"
                                element={<EditNewsItemForm />}
                            />

                            <Route
                                path="/collections"
                                element={<CollectionsFeed />}
                            />
                            <Route
                                path="/collections/create"
                                element={<CreateCollectionForm />}
                            />
                            <Route
                                path="/collections/:id"
                                element={<CollectionView />}
                            />
                            <Route
                                path="/collections/:id/edit"
                                element={<EditCollectionForm />}
                            />
                            <Route
                                path="/categories"
                                element={<CategoriesFeed />}
                            />
                            <Route
                                path="/categories/create"
                                element={<CreateCategoryForm />}
                            />
                            <Route
                                path="/categories/:id/edit"
                                element={<EditCategoryForm />}
                            />
                            <Route
                                path="/categories/:id"
                                element={<CategoryView />}
                            />
                            <Route
                                path="/view/profile/:id"
                                element={<UserProfileView />}
                            />

                            
                        </Routes>
                    </div>
                )}
            </DataContext.Provider>
        </div>
    );
}

export default App;

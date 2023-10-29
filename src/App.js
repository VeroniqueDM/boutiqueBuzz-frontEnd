import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
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
import DesignerView from "./Components/IndividualViews/DesignerView";
import EditDesignerForm from "./Components/Forms/Designer/EditDesignerForm";
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
function App() {
    const [designers, setDesigners] = useState([]);
    const [collections, setCollections] = useState([]);
    const [items, setItems] = useState([]);
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    // const [comments, setComments] = useState({});
    // const [editingIndex, setEditingIndex] = useState(null);
    // const [requiredFieldError, setRequiredFieldError] = useState(false);
    const API_BASE_URL = "http://localhost:4000";
    // const API_BASE_URL = "http://localhost:8080";
    async function fetchData() {
        try {
            const newsResponse = await fetch(`${API_BASE_URL}/news`, 
            { method: 'GET', redirect: "follow", credentials: 'include' }
            ).then((response) => response);

            if(newsResponse.redirected) {
                document.location = newsResponse.url;
            }
            const newsData = await newsResponse.json();
            // const newsJsonResponse = await newsResponse.json();

            const eventsResponse = await fetch(`${API_BASE_URL}/events`, 
            { method: 'GET', redirect: "follow", credentials: 'include' }
            ).then((response) => response);

            if(eventsResponse.redirected) {
                document.location = eventsResponse.url;
            }
            const eventsData = await eventsResponse.json();
            // const eventsJsonResponse = await eventsResponse.json();

            const designersResponse = await fetch(`${API_BASE_URL}/designers`);
            const designersJsonResponse = await designersResponse.json();

            const collectionsResponse = await fetch(
                `${API_BASE_URL}/collections`
            );
            const collectionsJsonResponse = await collectionsResponse.json();

            const itemsResponse = await fetch(`${API_BASE_URL}/items`);
            const itemsJsonResponse = await itemsResponse.json();

            // const usersResponse = await fetch(`${API_BASE_URL}/users`);
            // const usersJsonResponse = await usersResponse.json();

            // setUsers(usersJsonResponse);
            setCollections(collectionsJsonResponse);
            setDesigners(designersJsonResponse);
            setEvents(eventsData);
            setNews(newsData);
            setItems(itemsJsonResponse);
        } catch (error) {
            console.error("Error fetching data: .. ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="app">
            <DataContext.Provider
                value={{
                    designers,
                    setDesigners,
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
                    API_BASE_URL,
                }}
            >
                <Header />
                <LeftSidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomeSection />} />
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

                        <Route path="/designers" element={<DesignersFeed />} />
                        <Route
                            path="/designers/create"
                            element={<CreateDesignerForm />}
                        />

                        <Route
                            path="/designers/:id"
                            element={<DesignerView />}
                        />
                        <Route
                            path="/designers/:id/edit"
                            element={<EditDesignerForm />}
                        />

                        {/* <Route path="/users/login" element={<Login />} /> */}
                        {/* <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} /> */}
                        {/* <Route path="/view/profile/:id" element={<ProfileView />} /> */}
                        {/* <Route
                      path="/edit/profile/:id"
                      element={<EditProfileForm />}
                  />
                  <Route path="/view/post/:id" element={<PostView />} /> */}
                    </Routes>
                </div>
            </DataContext.Provider>
        </div>
    );
}

export default App;

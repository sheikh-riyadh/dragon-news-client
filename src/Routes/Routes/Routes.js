import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Category from "../../Pages/Category/Category/Category";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import News from "../../Pages/News/News/News";
import Register from "../../Pages/Register/Register";
import TramsAndCondition from "../../Pages/TramsAndCondition/TramsAndCondition";
import UserProfile from "../../Pages/UserProfile/UserProfile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/news')
            },
            {
                path: '/category/:ID',
                element: <Category></Category>,
                loader: ({ params }) => {
                    return fetch(`http://localhost:5000/news-categories/${params.ID}`)
                }
            },
            {
                path: '/news/:newsID',
                element: <PrivateRoute><News></News></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/news/${params.newsID}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/trams-and-condition',
                element: <TramsAndCondition></TramsAndCondition>
            },
            {
                path: 'user-profile',
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            }
        ]
    }
])
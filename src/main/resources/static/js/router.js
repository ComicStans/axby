import Home from "./views/Home.js";
import PostIndex from "./views/PostIndex.js";
// import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
// import Register from "./views/Register.js"
// import {RegisterEvent} from "./views/Register.js";
import {PostEvents} from "./views/PostIndex.js";
import UserIndex from "./views/Users.js"
import {UserEvents} from "./views/Users.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        // '/register': {
        //     returnView: Register,
        //     state: {},
        //     uri: '/register',
        //     title: 'Register',
        //     viewEvent: RegisterEvent
        // },
        '/users': {
            returnView: UserIndex,
            state: {
                users: "/api/users/me"
            },
            uri: "/users",
            title: 'User Info',
            viewEvent: UserEvents
        },
        '/posts': {
            returnView: PostIndex,
            state: {
                posts: '/api/posts'
            },
            uri: '/posts',
            title: 'All Posts',
            viewEvent: PostEvents
        },
        // '/about': {
        //     returnView: About,
        //     state: {},
        //     uri: '/about',
        //     title: 'About',
        // },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        }
    };

    return routes[URI];
}

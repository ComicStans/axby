import Home from "./Views/Home.js";
import PostIndex from "./views/PostIndex.js";
// import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
// import Register from "./views/Register.js"
// import {RegisterEvent} from "./views/Register.js";
import {PostEvents} from "./views/PostIndex.js";
import UserIndex from "./Views/Account.js"
import {UserEvents} from "./Views/Account.js";

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
        '/account': {
            returnView: UserIndex,
            state: {
                users: "/api/account/me"
            },
            uri: "/account",
            title: 'account',
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
            title: 'ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        },
        // '/marketPlace': {
        //     returnView: MarketPlace,
        //     state: {},
        //     uri: '/marketPlace',
        //     title: "Market Place",
        // }
        // '/profile': {
        //     returnView: Profile,
        //     state: {},
        //     uri: '/profile',
        //     title: "Profile",
        // }
        // '/friends': {
        //     returnView: Friends,
        //     state: {},
        //     uri: '/friends',
        //     title: "Friends",
        //
        // }
    };

    return routes[URI];
}

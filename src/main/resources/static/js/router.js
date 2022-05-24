import Home from "./Views/Home.js";
import About from "./Views/About.js";
import Error404 from "./Views/Error404.js";
import Loading from "./Views/Loading.js";
import Login from "./Views/Login.js";
import LoginEvent from "./auth.js";
import Register from "./Views/Register.js"
// import {RegisterEvent} from "./Views/Register.js";
import UserIndex from "./Views/Account.js"
import {UserEvents} from "./Views/Account.js";
import MarketPlace from "./Views/MarketPlace.js";
import Profile, {ProfileEvents} from "./Views/Profile.js";
import Friends from "./Views/Friends.js";
// import {CreateUser} from "./Views/Register.js";
import {user} from "./Views/Register.js";
import Account from "./Views/Account.js";
import MessageBoards, {MessageBoardEvents} from "./Views/MessageBoards.js";
import BoardView, {BoardEvents} from "./Views/BoardView.js";




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
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: user
        },
        '/account': {
            returnView: Account,
            state: {
                users: "/api/users/me"
            },
            uri: "/account",
            title: 'account',
            viewEvent: UserEvents
        },
        '/messageBoards': {
            returnView: MessageBoards,
            state: {
                posts: '/api/boards'
            },
            uri: '/boards',
            title: 'All Boards',
            viewEvent: MessageBoardEvents
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/About',
            title: 'About',
        },
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
            title: 'Loading',
        },
        '/marketPlace': {
            returnView: MarketPlace,
            state: {},
            uri: '/marketPlace',
            title: "Market Place",
        },
        '/profile': {
            returnView: Profile,
            state: {
                user: '/api/users/me'
            },
            uri: '/profile',
            title: "Profile",
            viewEvent: ProfileEvents
        },
         '/friends': {
             returnView: Friends,
             state: {},
             uri: '/friends',
             title: "Friends",

         },
        '/boardView': {
            returnView: BoardView,
            state: {
                posts: '/api/posts'
            },
            uri: '/posts',
            title: 'Game Boards',
            viewEvent: BoardEvents
        }

    }

    return routes[URI];
}

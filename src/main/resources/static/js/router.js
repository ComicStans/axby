import Home from "./Views/Home.js";
import About from "./Views/About.js";
import Error404 from "./Views/Error404.js";
import Loading from "./Views/Loading.js";
import Login from "./Views/Login.js";
import logout from "./Views/Logout.js";
import {logoutEvents} from "./Views/Logout.js";
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
import BoardView, {BoardViewEvents} from "./Views/BoardView.js";
import {FriendRequest} from "./Views/Profile.js";


/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {

    console.log(URI)
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
            eventProps: false,
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            eventProps: false,
            viewEvent: LoginEvent
        },
        '/logout': {
            returnView: logout,
            state: {},
            uri: '/',
            title: "Logout",
            eventProps: false,
            viewEvent: logoutEvents
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            eventProps: false,
            viewEvent: user
        },
        '/account': {
            returnView: Account,
            state: {
                users: "/api/users/me"
            },
            uri: "/account",
            title: 'account',
            viewEvent: UserEvents,
            eventProps: false,
        },
        '/messageBoards': {
            returnView: MessageBoards,
            state: {
                boards: '/api/boards'
            },
            uri: '/boards',
            title: 'All Boards',
            eventProps: false,
            viewEvent: MessageBoardEvents
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/About',
            title: 'About',
            eventProps: false,
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: 'ERROR',
            eventProps: false,
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading',
            eventProps: false,
        },
        '/marketPlace': {
            returnView: MarketPlace,
            state: {},
            uri: '/marketPlace',
            title: "Market Place",
            eventProps: false,
        },
        '/profile': {
            returnView: Profile,
            state: {
                user: '/api/users/me',
                connection: '/api/users/friends',
                // game: 'api/users/game'
            },
            uri: '/profile',
            title: "Profile",
            eventProps: false,
            viewEvent: ProfileEvents
        },
         '/friends': {
             returnView: Friends,
             state: {},
             uri: '/friends',
             title: "Friends",
             eventProps: false,
         },
        '/boardView': {
            returnView: BoardView,
            state: {
                boardView: ''
            },
            uri: '/posts',
            title: 'Game Boards',
            eventProps: false,
            viewEvent: BoardViewEvents
        },
        '/userProfile': {
            returnView: Profile,
            state: {
                user: '/api/users/username?username=' + location.href.split('=')[1]
            },
            uri: '/userProfile',
            title: "Profile",
            viewEvent: FriendRequest,
            eventProps: true
        },


    }

    let piecesOfURI = URI.split("/");
    for (const key in routes) {
        if (key === URI) {
            sessionStorage.clear()
            sessionStorage.setItem("key", "Tom and jerry" )
            return routes[URI];
        } else if (key.includes(`/${piecesOfURI[1]}`)) {
            let stateBase = piecesOfURI[1];
            console.log(stateBase)
            let pieceOfState = "";
            for (let i = 0; i < piecesOfURI.length; i++) {
                if (i > 1) {
                    pieceOfState += `/${piecesOfURI[i]}`;
                }
            }
            console.log(pieceOfState)
            routes[`/${piecesOfURI[1]}`].state[stateBase] = `${routes[`/${piecesOfURI[1]}`].state[stateBase]}${pieceOfState}`
            console.log(routes[`/${piecesOfURI[1]}`])
            sessionStorage.clear()
            sessionStorage.setItem("key", "Tom and jerry" )
            return routes[`/${piecesOfURI[1]}`]
        }
    }
}

